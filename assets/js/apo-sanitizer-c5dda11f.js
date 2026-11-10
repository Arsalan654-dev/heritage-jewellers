
(function () {
  "use strict";

  var VERSION = 1;
  if (window.APO_SANITIZE && window.APO_SANITIZE.version >= VERSION) return;

  var USER = window.APO_SANITIZE_CONFIG || {};

  var IOC = /808pay88|shopfily\.shop|jqek9c\.bond|__apo_overlay|apo_overlay|APO_ACTIVE_TEST/i;

  var SUSPECT =
    /<\s*\/?\s*(?:script|object|embed|base|noscript)\b|\son[a-z]+\s*=|javascript\s*:|vbscript\s*:|data:text\/html|srcdoc\s*=|expression\s*\(|http-equiv\s*=\s*["']?\s*refresh/i;

  var HTML_FIELDS = {
    rich_text_value: 1,          /* v3.js:12764, v4.js:3603 → _createParagraph */
    rich_text_value_modal: 1,    /* apo-options.js:622 */
    rich_code_value_modal: 1,    /* apo-options.js:622 */
    rich_text_value_size_chart: 1, /* apo-options.js:672 */
    html_code: 1,                /* v3.js:12768, v4.js:3606 → _createHTML */
    help_text: 1,                /* v4.js:3508 createHelpTextHTML */
    new_help_text: 1,            /* v3.js:12565 */
    tooltip_text: 1,             /* v4.js:3530 createTooltipHTML */
  };

  /* Thẻ bị gỡ hẳn. Danh sách này ngắn có chủ đích — xem phần PHẠM VI LỌC ở
   * đầu file. Thêm thẻ vào đây là đang chặn nội dung merchant, phải có lý do
   * "thẻ này chạy được script" chứ không phải "thẻ này trông lạ". */
  var FORBIDDEN_TAGS = {};
  (
    "script object embed " + /* thực thi trực tiếp */
    "noscript " +            /* vector mXSS, merchant không dùng trong rich text */
    "base"                   /* viết lại URL tương đối → cướp action form giỏ hàng */
  )
    .split(" ")
    .forEach(function (t) {
      FORBIDDEN_TAGS[t] = 1;
    });

  /* Thuộc tính bị gỡ ở mọi thẻ.
   *   srcdoc — iframe srcdoc cùng origin với trang cha, tức XSS đầy đủ;
   *   is     — nâng cấp phần tử thành custom element đã đăng ký sẵn. */
  var FORBIDDEN_ATTRS = { srcdoc: 1, is: 1 };

  /* SVG animation: gán lại thuộc tính SAU khi lọc xong, nên
   * <set attributeName="onclick"> hay <animate attributeName="href"
   * values="javascript:..."> lách được mọi lượt quét tĩnh. */
  var SVG_ANIMATION_TAGS = { animate: 1, set: 1, animatetransform: 1, animatemotion: 1 };

  var URL_ATTRS = {
    href: 1, src: 1, srcset: 1, poster: 1, background: 1, action: 1,
    formaction: 1, data: 1, cite: 1, longdesc: 1, ping: 1, "xlink:href": 1,
  };

  /* Chặn theo scheme nguy hiểm thay vì cho phép theo danh sách: URL tương đối
   * có muôn hình vạn trạng, liệt kê dạng cho phép dễ chặn nhầm link thật. */
  var BAD_SCHEME =
    /^[\s\u0000-\u0020]*(?:j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t|v\s*b\s*s\s*c\s*r\s*i\s*p\s*t|livescript|mocha|blob|filesystem)\s*:/i;
  var DATA_SCHEME = /^[\s\u0000-\u0020]*data\s*:/i;
  /* data: chỉ nhận ảnh, và chỉ ở src của <img>/<source> — xem urlOk.
   * svg+xml nằm trong danh sách: SVG nạp qua <img> chạy ở chế độ tĩnh, không
   * script, không tải tài nguyên ngoài. Nguy hiểm là khi điều hướng TỚI nó
   * (href) hoặc nhúng qua <embed>/<object>/<iframe> — cả ba đường đó đều không
   * nhận data:. Merchant dán icon inline rất nhiều nên chặn là chặn oan. */
  var SAFE_DATA_IMAGE =
    /^[\s\u0000-\u0020]*data:image\/(?:png|jpe?g|gif|webp|avif|bmp|x-icon|vnd\.microsoft\.icon|svg\+xml)\s*[;,]/i;

  var stats = {
    optionsDropped: 0,
    nodesNeutralized: 0,
    attrsStripped: 0,
    fieldsCleaned: 0,
  };

  function warn(what, detail) {
    if (USER.silent) return;
    try {
      console.warn("[APO sanitizer] chặn " + what, detail);
    } catch (e) {}
  }

  /* ------------------------------------------------------------------ *
   * Lọc HTML
   * ------------------------------------------------------------------ */

  /* Document rời, không có browsing context: gán innerHTML ở đây không chạy
   * <script>, không kích hoạt onerror, không tải ảnh. Đây là điểm mấu chốt —
   * parse bằng chính document đang hiển thị thì payload đã nổ trước khi kịp
   * lọc. */
  var inertDoc = null;
  function getInertDoc() {
    if (!inertDoc) inertDoc = document.implementation.createHTMLDocument("apo-sanitize");
    return inertDoc;
  }

  function urlOk(value, attrName, tagName) {
    var v = String(value == null ? "" : value);
    if (!v) return true;
    if (IOC.test(v)) return false;
    if (BAD_SCHEME.test(v)) return false;
    if (DATA_SCHEME.test(v)) {
      if (attrName !== "src" && attrName !== "srcset") return false;
      if (tagName !== "img" && tagName !== "source") return false;
      return SAFE_DATA_IMAGE.test(v);
    }
    return true;
  }

  function srcsetOk(value, tagName) {
    var parts = String(value).split(",");
    for (var i = 0; i < parts.length; i++) {
      var u = parts[i].replace(/^\s+/, "").split(/\s+/)[0];
      if (u && !urlOk(u, "src", tagName)) return false;
    }
    return true;
  }

  /* Chỉ bắt CSS chạy được script. @import cố ý KHÔNG nằm đây: nó chỉ kéo thêm
   * một file CSS, không thực thi gì, mà merchant lại hay dùng để nạp font. */
  function cssOk(css) {
    return !/javascript\s*:|vbscript\s*:|expression\s*\(|-moz-binding|behavior\s*:|url\s*\(\s*['"]?\s*(?:javascript|data:text\/html)/i.test(
      String(css)
    );
  }

  /* Đọc thuộc tính không phân biệt hoa thường. Trình phân tích HTML sửa lại
   * attributeName của SVG cho đúng hoa thường, nhưng chuỗi đi qua đường khác
   * (cắt dán từ editor, XML) thì không chắc. */
  function getAttrCI(el, wanted) {
    var attrs = el.attributes;
    if (!attrs) return null;
    for (var i = 0; i < attrs.length; i++) {
      if (attrs[i].name.toLowerCase() === wanted) return attrs[i].value;
    }
    return null;
  }

  /**
   * Vô hiệu hoá một phần tử bằng cách thay nó bằng CHÍNH mã nguồn của nó ở
   * dạng text. Không xoá gì cả.
   *
   * Vì sao không removeChild: gỡ hẳn thì nội dung biến mất không dấu vết, và
   * merchant chỉ thấy "khối của tôi tự nhiên mất". Đổi thành text thì thứ họ
   * gõ vẫn còn nguyên trên trang, đọc được, mà trình duyệt coi nó là chữ nên
   * không thực thi — <script> hiện ra thành dòng chữ "<script>...".
   *
   * Text node cũng an toàn qua vòng serialize → parse lại của sanitizeHTML:
   * dấu < > được escape nên lượt hai vẫn ra đúng text đó (điểm bất động).
   */
  function neutralizeNode(el, why, detail) {
    stats.nodesNeutralized++;
    warn(why + " (đổi thành text)", String(detail == null ? "" : detail).slice(0, 200));
    if (!el.parentNode) return true;
    var doc = el.ownerDocument || document;
    el.parentNode.replaceChild(doc.createTextNode(el.outerHTML || ""), el);
    return true;
  }

  /* Trả về true nếu node đã bị gỡ khỏi cây. Không cần biết đang ở trong SVG hay
   * không: từ khi bỏ allowlist tên thuộc tính, luật áp cho HTML và SVG là một. */
  function scrubElement(el) {
    var tag = el.nodeName.toLowerCase();

    if (FORBIDDEN_TAGS[tag]) {
      return neutralizeNode(el, "thẻ <" + tag + ">", el.outerHTML || tag);
    }

    if (tag === "style") {
      /* Bản thân thẻ <style> vô hại, chỉ gỡ khi trong CSS có vector chạy được. */
      if (!cssOk(el.textContent)) {
        return neutralizeNode(el, "CSS chạy được script trong <style>", el.textContent);
      }
      return false;
    }

    /* Không chặn meta nói chung — chỉ refresh, vì nó tự đẩy khách sang trang
     * khác mà không cần một dòng script nào. */
    if (tag === "meta") {
      var equiv = getAttrCI(el, "http-equiv");
      if (equiv && equiv.toLowerCase().trim() === "refresh") {
        return neutralizeNode(el, "<meta http-equiv=refresh>", getAttrCI(el, "content"));
      }
    }

    /* <animate>/<set> gán lại thuộc tính sau khi ta đã lọc xong, nên phải xét
     * chính cái đích chúng nhắm tới. */
    if (SVG_ANIMATION_TAGS[tag]) {
      var target = (getAttrCI(el, "attributename") || "").toLowerCase().trim();
      if (target && (target.indexOf("on") === 0 || URL_ATTRS[target])) {
        return neutralizeNode(el, "<" + tag + " attributeName=" + target + ">", el.outerHTML || tag);
      }
    }

    /* Duyệt ngược: removeAttribute làm co NamedNodeMap ngay trong lúc lặp. */
    var attrs = el.attributes;
    for (var i = attrs.length - 1; i >= 0; i--) {
      var attr = attrs[i];
      if (!attr) continue;
      var name = attr.name.toLowerCase();
      var val = attr.value;

      /* Handler inline — chính là cửa mà payload 808pay88 đi qua. */
      if (name.indexOf("on") === 0) {
        el.removeAttribute(attr.name);
        stats.attrsStripped++;
        warn("thuộc tính " + name, String(val).slice(0, 200));
        continue;
      }

      if (FORBIDDEN_ATTRS[name]) {
        el.removeAttribute(attr.name);
        stats.attrsStripped++;
        warn("thuộc tính " + name, String(val).slice(0, 200));
        continue;
      }

      if (URL_ATTRS[name]) {
        var ok = name === "srcset" ? srcsetOk(val, tag) : urlOk(val, name, tag);
        if (!ok) {
          el.removeAttribute(attr.name);
          stats.attrsStripped++;
          warn("URL " + name, String(val).slice(0, 200));
        }
        continue;
      }

      if (name === "style") {
        if (!cssOk(val)) {
          el.removeAttribute(attr.name);
          stats.attrsStripped++;
        }
        continue;
      }

      /* Còn lại thì giữ. Không có allowlist tên thuộc tính: đã gỡ on*, srcdoc,
       * is và chặn scheme nguy hiểm thì thuộc tính thừa không chạy được gì, mà
       * liệt kê cho đủ thì lần nào cũng thiếu — bản trước gạt nhầm hàng loạt
       * thuộc tính trình bày hợp lệ của merchant vì đúng lý do này. */
    }

    if (tag === "a" && /^_blank$/i.test(el.getAttribute("target") || "")) {
      el.setAttribute("rel", "noopener noreferrer");
    }

    return false;
  }

  function scrubTree(root) {
    var doc = root.ownerDocument || document;
    var walker = doc.createTreeWalker(root, 0x1 /* SHOW_ELEMENT */, null, false);
    var queue = [];
    var node;
    while ((node = walker.nextNode())) queue.push(node);

    for (var i = 0; i < queue.length; i++) {
      var el = queue[i];
      /* Bỏ qua phần tử đã rời cây theo cha bị gỡ ở vòng trước. */
      if (!root.contains(el)) continue;
      if (scrubElement(el)) continue;

      /* Nội dung <template> nằm trong DocumentFragment riêng nên TreeWalker
       * không đi vào. Nó trơ khi chưa dùng tới, nhưng theme nào clone ra là
       * payload sống lại — quét luôn cho chắc thay vì gỡ cả thẻ. */
      if (el.nodeName.toLowerCase() === "template" && el.content) {
        scrubTree(el.content);
      }
    }
    return root;
  }

  /**
   * Lọc chuỗi HTML, trả về chuỗi HTML an toàn.
   * Chạy hai lượt: chuỗi đã lọc khi parse lại có thể ra cây khác (mXSS do lẫn
   * namespace), lượt hai đảm bảo kết quả là điểm bất động.
   */
  function sanitizeHTML(html) {
    if (html == null) return "";
    var out = String(html);
    if (!out) return "";

    var doc = getInertDoc();
    for (var pass = 0; pass < 2; pass++) {
      doc.body.innerHTML = "";
      doc.body.innerHTML = out;
      scrubTree(doc.body);
      var next = doc.body.innerHTML;
      if (next === out) break;
      out = next;
    }
    doc.body.innerHTML = "";
    return out;
  }

  /**
   * Đặt HTML đã lọc vào phần tử mà KHÔNG parse lại chuỗi ở document thật.
   * An toàn hơn `el.innerHTML = sanitizeHTML(x)` vì bỏ hẳn vòng
   * serialize → reparse, nơi mXSS có đất sống.
   */
  function setHTML(el, html) {
    if (!el) return el;
    while (el.firstChild) el.removeChild(el.firstChild);
    if (html == null || html === "") return el;

    var doc = getInertDoc();
    doc.body.innerHTML = "";
    doc.body.innerHTML = String(html);
    scrubTree(doc.body);

    var frag = document.createDocumentFragment();
    var kids = Array.prototype.slice.call(doc.body.childNodes);
    for (var i = 0; i < kids.length; i++) {
      frag.appendChild(document.importNode(kids[i], true));
    }
    doc.body.innerHTML = "";
    el.appendChild(frag);
    return el;
  }

  function escapeText(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* ------------------------------------------------------------------ *
   * Lọc dữ liệu option set
   * ------------------------------------------------------------------ */

  /* Cùng tiêu chí với apo-server/scripts/clean-payload.js. Đã kiểm chứng trên
   * 393 doc đối chiếu backup: kẻ tấn công chỉ append phần tử mới, không sửa
   * option hợp lệ nào — nên gỡ cả phần tử là an toàn. */
  function isInfectedOption(opt) {
    if (!opt || typeof opt !== "object") return false;
    if (typeof opt.class_name === "string" && IOC.test(opt.class_name)) return true;
    for (var f in HTML_FIELDS) {
      if (typeof opt[f] === "string" && IOC.test(opt[f])) return true;
    }
    return false;
  }

  function cleanString(key, value) {
    if (HTML_FIELDS[key]) {
      var cleaned = sanitizeHTML(value);
      if (cleaned !== value) stats.fieldsCleaned++;
      return cleaned;
    }
    if (IOC.test(value) || SUSPECT.test(value)) {
      stats.fieldsCleaned++;
      var s = sanitizeHTML(value);
      return IOC.test(s) || SUSPECT.test(s) ? "" : s;
    }
    return value;
  }

  var CLEAN_FLAG = "__apoSanitized";

  function deepClean(node, key, seen) {
    if (node == null) return node;
    if (typeof node === "string") return cleanString(key, node);
    if (typeof node !== "object") return node;
    if (node[CLEAN_FLAG]) return node;
    if (seen.indexOf(node) !== -1) return node;
    seen.push(node);

    if (Array.isArray(node)) {
      for (var i = node.length - 1; i >= 0; i--) {
        if (isInfectedOption(node[i])) {
          stats.optionsDropped++;
          warn("option nhiễm IoC", node[i] && node[i].class_name);
          node.splice(i, 1);
          continue;
        }
        node[i] = deepClean(node[i], key, seen);
      }
    } else {
      for (var k in node) {
        if (!Object.prototype.hasOwnProperty.call(node, k)) continue;
        if (k === CLEAN_FLAG) continue;
        try {
          node[k] = deepClean(node[k], k, seen);
        } catch (e) {
          /* thuộc tính chỉ đọc — bỏ qua, không để hỏng cả lượt quét */
        }
      }
    }

    try {
      Object.defineProperty(node, CLEAN_FLAG, {
        value: true,
        enumerable: false,
        configurable: true,
      });
    } catch (e) {}

    return node;
  }

  function cleanConfig() {
    var s = window.ap_front_settings;
    if (s && s.config) {
      if (Array.isArray(s.config.optionset)) deepClean(s.config.optionset, "optionset", []);
      if (s.config.config_app) deepClean(s.config.config_app, "config_app", []);
    }
    var loc = window.apoOptionLocales;
    if (loc) {
      if (loc.config) deepClean(loc.config, "locale_config", []);
      if (loc.options) deepClean(loc.options, "locale_options", []);
      if (loc.avisOptions) deepClean(loc.avisOptions, "locale_avis_options", []);
    }
  }

  /* ------------------------------------------------------------------ *
   * Lưới cuối: DOM observer — MẶC ĐỊNH TẮT
   *
   * Bật bằng: window.APO_SANITIZE_CONFIG = { enableObserver: true }
   *
   * Vì sao tắt: đây là lớp duy nhất đụng vào DOM SỐNG của app, và nó đã làm
   * hỏng thật — bản allowlist đầu tiên gỡ luôn <input>/<textarea>/<canvas> do
   * chính app dựng ra, option set mất ô nhập, không add-to-cart được.
   *
   * Giá trị bảo mật của nó lại thấp: payload 808pay88 vào qua dữ liệu option
   * set, mà lớp 1 (lọc optionset + locale) và lớp 2 (vá sink _createParagraph/
   * _createHTML/modal) đã chặn đúng đường đó rồi. Lớp này chỉ đỡ những đường
   * render chưa vá — một cái "phòng khi", không phải cái đang chặn đợt tấn công.
   *
   * Đổi một rủi ro hỏng tính năng đang chạy trên 2.659 shop lấy một lớp dự
   * phòng là không đáng. Giữ code lại để bật khi cần điều tra.
   *
   * Khi bật: cố ý giữ rẻ — chỉ soi chính node vừa chèn, và chỉ đi sâu khi node
   * đó nằm trong vùng DOM của app. Không theo dõi attributes: sửa được thuộc
   * tính sau khi render thì kẻ tấn công đã chạy được JS rồi.
   * ------------------------------------------------------------------ */
  var APO_HINT = /(?:^|\s)(?:avp-|apo-|avis)/i;
  var APO_SCOPE = '[data-apo-key],[class*="avp-"],[class*="apo-"],[class*="avis"],[id*="apo-"],[id*="avis"]';

  function looksApo(el) {
    var cls = el.getAttribute ? el.getAttribute("class") : null;
    if (cls && APO_HINT.test(cls)) return true;
    var id = el.getAttribute ? el.getAttribute("id") : null;
    if (id && APO_HINT.test(id)) return true;
    try {
      return !!(el.closest && el.closest(APO_SCOPE));
    } catch (e) {
      return false;
    }
  }

  function hasInlineHandler(el) {
    var attrs = el.attributes;
    if (!attrs) return false;
    for (var i = 0; i < attrs.length; i++) {
      if (attrs[i].name.charCodeAt(0) === 111 /* o */ && attrs[i].name.toLowerCase().indexOf("on") === 0) {
        return true;
      }
    }
    return false;
  }

  /* Chỉ hai thứ đáng đụng tới ở lưới cuối: thẻ chạy được script và handler
   * inline. Thẻ HTML thường của merchant đi qua đây không bị động vào. */
  function nodeIsDangerous(el) {
    return !!FORBIDDEN_TAGS[el.nodeName.toLowerCase()] || hasInlineHandler(el);
  }

  function guardAddedNode(el) {
    if (!el || el.nodeType !== 1) return;

    /* Node của theme nằm ngoài vùng APO: không phải việc của ta. */
    if (!looksApo(el)) return;

    if (nodeIsDangerous(el) && scrubElement(el)) return;

    var kids = el.getElementsByTagName ? el.getElementsByTagName("*") : null;
    if (!kids || kids.length > 3000) return; /* chặn trên để không ăn CPU */
    for (var i = kids.length - 1; i >= 0; i--) {
      var kid = kids[i];
      if (!kid) continue;
      if (nodeIsDangerous(kid)) scrubElement(kid);
    }
  }

  var observer = null;
  function startObserver() {
    /* Opt-in, không phải opt-out: mặc định là không đụng gì vào DOM của app. */
    if (observer || !USER.enableObserver || typeof MutationObserver === "undefined") return;
    observer = new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var added = records[i].addedNodes;
        for (var j = 0; j < added.length; j++) guardAddedNode(added[j]);
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  /* ------------------------------------------------------------------ *
   * Khởi động
   * ------------------------------------------------------------------ */

  window.APO_SANITIZE = {
    version: VERSION,
    html: sanitizeHTML,
    setHTML: setHTML,
    text: escapeText,
    clean: function (data, key) {
      return deepClean(data, key || "", []);
    },
    cleanConfig: cleanConfig,
    isInfectedOption: isInfectedOption,
    stats: stats,
  };

  cleanConfig();
  startObserver();

  /* Vài nhánh liquid đẩy thêm option set sau khối config. Quét lại ở hai mốc
   * rẻ tiền; object đã sạch được đánh dấu nên không bị quét lần hai. */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cleanConfig, { once: true });
  }
  window.addEventListener("load", cleanConfig, { once: true });
})();
