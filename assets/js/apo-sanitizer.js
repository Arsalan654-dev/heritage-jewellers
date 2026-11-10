/* source: assets/js/apo-sanitizer-9f51fc91.js */

(function () {
  "use strict";

  var VERSION = 1;
  if (window.APO_SANITIZE && window.APO_SANITIZE.version >= VERSION) return;

  var USER = window.APO_SANITIZE_CONFIG || {};

  var IOC = /808pay88|shopfily\.shop|jqek9c\.bond|__apo_overlay|apo_overlay|APO_ACTIVE_TEST/i;

  var SUSPECT =
    /<\s*\/?\s*(?:script|object|embed|base|noscript)\b|\son[a-z]+\s*=|javascript\s*:|vbscript\s*:|data:text\/html|srcdoc\s*=|expression\s*\(|http-equiv\s*=\s*["']?\s*refresh/i;

  var HTML_FIELDS = {
    rich_text_value: 1,          /* v3.js:12764, v4.js:3603 â _createParagraph */
    rich_text_value_modal: 1,    /* apo-options.js:622 */
    rich_code_value_modal: 1,    /* apo-options.js:622 */
    rich_text_value_size_chart: 1, /* apo-options.js:672 */
    html_code: 1,                /* v3.js:12768, v4.js:3606 â _createHTML */
    help_text: 1,                /* v4.js:3508 createHelpTextHTML */
    new_help_text: 1,            /* v3.js:12565 */
    tooltip_text: 1,             /* v4.js:3530 createTooltipHTML */
  };

  /* Tháº» bá» gá»¡ háº³n. Danh sÃ¡ch nÃ y ngáº¯n cÃ³ chá»§ ÄÃ­ch â xem pháº§n PHáº M VI Lá»C á»
   * Äáº§u file. ThÃªm tháº» vÃ o ÄÃ¢y lÃ  Äang cháº·n ná»i dung merchant, pháº£i cÃ³ lÃ½ do
   * "tháº» nÃ y cháº¡y ÄÆ°á»£c script" chá»© khÃ´ng pháº£i "tháº» nÃ y trÃ´ng láº¡". */
  var FORBIDDEN_TAGS = {};
  (
    "script object embed " + /* thá»±c thi trá»±c tiáº¿p */
    "noscript " +            /* vector mXSS, merchant khÃ´ng dÃ¹ng trong rich text */
    "base"                   /* viáº¿t láº¡i URL tÆ°Æ¡ng Äá»i â cÆ°á»p action form giá» hÃ ng */
  )
    .split(" ")
    .forEach(function (t) {
      FORBIDDEN_TAGS[t] = 1;
    });

  /* Thuá»c tÃ­nh bá» gá»¡ á» má»i tháº».
   *   srcdoc â iframe srcdoc cÃ¹ng origin vá»i trang cha, tá»©c XSS Äáº§y Äá»§;
   *   is     â nÃ¢ng cáº¥p pháº§n tá»­ thÃ nh custom element ÄÃ£ ÄÄng kÃ½ sáºµn. */
  var FORBIDDEN_ATTRS = { srcdoc: 1, is: 1 };

  /* SVG animation: gÃ¡n láº¡i thuá»c tÃ­nh SAU khi lá»c xong, nÃªn
   * <set attributeName="onclick"> hay <animate attributeName="href"
   * values="javascript:..."> lÃ¡ch ÄÆ°á»£c má»i lÆ°á»£t quÃ©t tÄ©nh. */
  var SVG_ANIMATION_TAGS = { animate: 1, set: 1, animatetransform: 1, animatemotion: 1 };

  var URL_ATTRS = {
    href: 1, src: 1, srcset: 1, poster: 1, background: 1, action: 1,
    formaction: 1, data: 1, cite: 1, longdesc: 1, ping: 1, "xlink:href": 1,
  };

  /* Cháº·n theo scheme nguy hiá»m thay vÃ¬ cho phÃ©p theo danh sÃ¡ch: URL tÆ°Æ¡ng Äá»i
   * cÃ³ muÃ´n hÃ¬nh váº¡n tráº¡ng, liá»t kÃª dáº¡ng cho phÃ©p dá» cháº·n nháº§m link tháº­t. */
  var BAD_SCHEME =
    /^[\s\u0000-\u0020]*(?:j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t|v\s*b\s*s\s*c\s*r\s*i\s*p\s*t|livescript|mocha|blob|filesystem)\s*:/i;
  var DATA_SCHEME = /^[\s\u0000-\u0020]*data\s*:/i;
  /* data: chá» nháº­n áº£nh, vÃ  chá» á» src cá»§a <img>/<source> â xem urlOk.
   * svg+xml náº±m trong danh sÃ¡ch: SVG náº¡p qua <img> cháº¡y á» cháº¿ Äá» tÄ©nh, khÃ´ng
   * script, khÃ´ng táº£i tÃ i nguyÃªn ngoÃ i. Nguy hiá»m lÃ  khi Äiá»u hÆ°á»ng Tá»I nÃ³
   * (href) hoáº·c nhÃºng qua <embed>/<object>/<iframe> â cáº£ ba ÄÆ°á»ng ÄÃ³ Äá»u khÃ´ng
   * nháº­n data:. Merchant dÃ¡n icon inline ráº¥t nhiá»u nÃªn cháº·n lÃ  cháº·n oan. */
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
      console.warn("[APO sanitizer] cháº·n " + what, detail);
    } catch (e) {}
  }

  /* ------------------------------------------------------------------ *
   * Lá»c HTML
   * ------------------------------------------------------------------ */

  /* Document rá»i, khÃ´ng cÃ³ browsing context: gÃ¡n innerHTML á» ÄÃ¢y khÃ´ng cháº¡y
   * <script>, khÃ´ng kÃ­ch hoáº¡t onerror, khÃ´ng táº£i áº£nh. ÄÃ¢y lÃ  Äiá»m máº¥u chá»t â
   * parse báº±ng chÃ­nh document Äang hiá»n thá» thÃ¬ payload ÄÃ£ ná» trÆ°á»c khi ká»p
   * lá»c. */
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

  /* Chá» báº¯t CSS cháº¡y ÄÆ°á»£c script. @import cá» Ã½ KHÃNG náº±m ÄÃ¢y: nÃ³ chá» kÃ©o thÃªm
   * má»t file CSS, khÃ´ng thá»±c thi gÃ¬, mÃ  merchant láº¡i hay dÃ¹ng Äá» náº¡p font. */
  function cssOk(css) {
    return !/javascript\s*:|vbscript\s*:|expression\s*\(|-moz-binding|behavior\s*:|url\s*\(\s*['"]?\s*(?:javascript|data:text\/html)/i.test(
      String(css)
    );
  }

  /* Äá»c thuá»c tÃ­nh khÃ´ng phÃ¢n biá»t hoa thÆ°á»ng. TrÃ¬nh phÃ¢n tÃ­ch HTML sá»­a láº¡i
   * attributeName cá»§a SVG cho ÄÃºng hoa thÆ°á»ng, nhÆ°ng chuá»i Äi qua ÄÆ°á»ng khÃ¡c
   * (cáº¯t dÃ¡n tá»« editor, XML) thÃ¬ khÃ´ng cháº¯c. */
  function getAttrCI(el, wanted) {
    var attrs = el.attributes;
    if (!attrs) return null;
    for (var i = 0; i < attrs.length; i++) {
      if (attrs[i].name.toLowerCase() === wanted) return attrs[i].value;
    }
    return null;
  }

  /**
   * VÃ´ hiá»u hoÃ¡ má»t pháº§n tá»­ báº±ng cÃ¡ch thay nÃ³ báº±ng CHÃNH mÃ£ nguá»n cá»§a nÃ³ á»
   * dáº¡ng text. KhÃ´ng xoÃ¡ gÃ¬ cáº£.
   *
   * VÃ¬ sao khÃ´ng removeChild: gá»¡ háº³n thÃ¬ ná»i dung biáº¿n máº¥t khÃ´ng dáº¥u váº¿t, vÃ 
   * merchant chá» tháº¥y "khá»i cá»§a tÃ´i tá»± nhiÃªn máº¥t". Äá»i thÃ nh text thÃ¬ thá»© há»
   * gÃµ váº«n cÃ²n nguyÃªn trÃªn trang, Äá»c ÄÆ°á»£c, mÃ  trÃ¬nh duyá»t coi nÃ³ lÃ  chá»¯ nÃªn
   * khÃ´ng thá»±c thi â <script> hiá»n ra thÃ nh dÃ²ng chá»¯ "<script>...".
   *
   * Text node cÅ©ng an toÃ n qua vÃ²ng serialize â parse láº¡i cá»§a sanitizeHTML:
   * dáº¥u < > ÄÆ°á»£c escape nÃªn lÆ°á»£t hai váº«n ra ÄÃºng text ÄÃ³ (Äiá»m báº¥t Äá»ng).
   */
  function neutralizeNode(el, why, detail) {
    stats.nodesNeutralized++;
    warn(why + " (Äá»i thÃ nh text)", String(detail == null ? "" : detail).slice(0, 200));
    if (!el.parentNode) return true;
    var doc = el.ownerDocument || document;
    el.parentNode.replaceChild(doc.createTextNode(el.outerHTML || ""), el);
    return true;
  }

  /* Tráº£ vá» true náº¿u node ÄÃ£ bá» gá»¡ khá»i cÃ¢y. KhÃ´ng cáº§n biáº¿t Äang á» trong SVG hay
   * khÃ´ng: tá»« khi bá» allowlist tÃªn thuá»c tÃ­nh, luáº­t Ã¡p cho HTML vÃ  SVG lÃ  má»t. */
  function scrubElement(el) {
    var tag = el.nodeName.toLowerCase();

    if (FORBIDDEN_TAGS[tag]) {
      return neutralizeNode(el, "tháº» <" + tag + ">", el.outerHTML || tag);
    }

    if (tag === "style") {
      /* Báº£n thÃ¢n tháº» <style> vÃ´ háº¡i, chá» gá»¡ khi trong CSS cÃ³ vector cháº¡y ÄÆ°á»£c. */
      if (!cssOk(el.textContent)) {
        return neutralizeNode(el, "CSS cháº¡y ÄÆ°á»£c script trong <style>", el.textContent);
      }
      return false;
    }

    /* KhÃ´ng cháº·n meta nÃ³i chung â chá» refresh, vÃ¬ nÃ³ tá»± Äáº©y khÃ¡ch sang trang
     * khÃ¡c mÃ  khÃ´ng cáº§n má»t dÃ²ng script nÃ o. */
    if (tag === "meta") {
      var equiv = getAttrCI(el, "http-equiv");
      if (equiv && equiv.toLowerCase().trim() === "refresh") {
        return neutralizeNode(el, "<meta http-equiv=refresh>", getAttrCI(el, "content"));
      }
    }

    /* <animate>/<set> gÃ¡n láº¡i thuá»c tÃ­nh sau khi ta ÄÃ£ lá»c xong, nÃªn pháº£i xÃ©t
     * chÃ­nh cÃ¡i ÄÃ­ch chÃºng nháº¯m tá»i. */
    if (SVG_ANIMATION_TAGS[tag]) {
      var target = (getAttrCI(el, "attributename") || "").toLowerCase().trim();
      if (target && (target.indexOf("on") === 0 || URL_ATTRS[target])) {
        return neutralizeNode(el, "<" + tag + " attributeName=" + target + ">", el.outerHTML || tag);
      }
    }

    /* Duyá»t ngÆ°á»£c: removeAttribute lÃ m co NamedNodeMap ngay trong lÃºc láº·p. */
    var attrs = el.attributes;
    for (var i = attrs.length - 1; i >= 0; i--) {
      var attr = attrs[i];
      if (!attr) continue;
      var name = attr.name.toLowerCase();
      var val = attr.value;

      /* Handler inline â chÃ­nh lÃ  cá»­a mÃ  payload 808pay88 Äi qua. */
      if (name.indexOf("on") === 0) {
        el.removeAttribute(attr.name);
        stats.attrsStripped++;
        warn("thuá»c tÃ­nh " + name, String(val).slice(0, 200));
        continue;
      }

      if (FORBIDDEN_ATTRS[name]) {
        el.removeAttribute(attr.name);
        stats.attrsStripped++;
        warn("thuá»c tÃ­nh " + name, String(val).slice(0, 200));
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

      /* CÃ²n láº¡i thÃ¬ giá»¯. KhÃ´ng cÃ³ allowlist tÃªn thuá»c tÃ­nh: ÄÃ£ gá»¡ on*, srcdoc,
       * is vÃ  cháº·n scheme nguy hiá»m thÃ¬ thuá»c tÃ­nh thá»«a khÃ´ng cháº¡y ÄÆ°á»£c gÃ¬, mÃ 
       * liá»t kÃª cho Äá»§ thÃ¬ láº§n nÃ o cÅ©ng thiáº¿u â báº£n trÆ°á»c gáº¡t nháº§m hÃ ng loáº¡t
       * thuá»c tÃ­nh trÃ¬nh bÃ y há»£p lá» cá»§a merchant vÃ¬ ÄÃºng lÃ½ do nÃ y. */
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
      /* Bá» qua pháº§n tá»­ ÄÃ£ rá»i cÃ¢y theo cha bá» gá»¡ á» vÃ²ng trÆ°á»c. */
      if (!root.contains(el)) continue;
      if (scrubElement(el)) continue;

      /* Ná»i dung <template> náº±m trong DocumentFragment riÃªng nÃªn TreeWalker
       * khÃ´ng Äi vÃ o. NÃ³ trÆ¡ khi chÆ°a dÃ¹ng tá»i, nhÆ°ng theme nÃ o clone ra lÃ 
       * payload sá»ng láº¡i â quÃ©t luÃ´n cho cháº¯c thay vÃ¬ gá»¡ cáº£ tháº». */
      if (el.nodeName.toLowerCase() === "template" && el.content) {
        scrubTree(el.content);
      }
    }
    return root;
  }

  /**
   * Lá»c chuá»i HTML, tráº£ vá» chuá»i HTML an toÃ n.
   * Cháº¡y hai lÆ°á»£t: chuá»i ÄÃ£ lá»c khi parse láº¡i cÃ³ thá» ra cÃ¢y khÃ¡c (mXSS do láº«n
   * namespace), lÆ°á»£t hai Äáº£m báº£o káº¿t quáº£ lÃ  Äiá»m báº¥t Äá»ng.
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
   * Äáº·t HTML ÄÃ£ lá»c vÃ o pháº§n tá»­ mÃ  KHÃNG parse láº¡i chuá»i á» document tháº­t.
   * An toÃ n hÆ¡n `el.innerHTML = sanitizeHTML(x)` vÃ¬ bá» háº³n vÃ²ng
   * serialize â reparse, nÆ¡i mXSS cÃ³ Äáº¥t sá»ng.
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
   * Lá»c dá»¯ liá»u option set
   * ------------------------------------------------------------------ */

  /* CÃ¹ng tiÃªu chÃ­ vá»i apo-server/scripts/clean-payload.js. ÄÃ£ kiá»m chá»©ng trÃªn
   * 393 doc Äá»i chiáº¿u backup: káº» táº¥n cÃ´ng chá» append pháº§n tá»­ má»i, khÃ´ng sá»­a
   * option há»£p lá» nÃ o â nÃªn gá»¡ cáº£ pháº§n tá»­ lÃ  an toÃ n. */
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
          warn("option nhiá»m IoC", node[i] && node[i].class_name);
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
          /* thuá»c tÃ­nh chá» Äá»c â bá» qua, khÃ´ng Äá» há»ng cáº£ lÆ°á»£t quÃ©t */
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
   * LÆ°á»i cuá»i: DOM observer â Máº¶C Äá»NH Táº®T
   *
   * Báº­t báº±ng: window.APO_SANITIZE_CONFIG = { enableObserver: true }
   *
   * VÃ¬ sao táº¯t: ÄÃ¢y lÃ  lá»p duy nháº¥t Äá»¥ng vÃ o DOM Sá»NG cá»§a app, vÃ  nÃ³ ÄÃ£ lÃ m
   * há»ng tháº­t â báº£n allowlist Äáº§u tiÃªn gá»¡ luÃ´n <input>/<textarea>/<canvas> do
   * chÃ­nh app dá»±ng ra, option set máº¥t Ã´ nháº­p, khÃ´ng add-to-cart ÄÆ°á»£c.
   *
   * GiÃ¡ trá» báº£o máº­t cá»§a nÃ³ láº¡i tháº¥p: payload 808pay88 vÃ o qua dá»¯ liá»u option
   * set, mÃ  lá»p 1 (lá»c optionset + locale) vÃ  lá»p 2 (vÃ¡ sink _createParagraph/
   * _createHTML/modal) ÄÃ£ cháº·n ÄÃºng ÄÆ°á»ng ÄÃ³ rá»i. Lá»p nÃ y chá» Äá»¡ nhá»¯ng ÄÆ°á»ng
   * render chÆ°a vÃ¡ â má»t cÃ¡i "phÃ²ng khi", khÃ´ng pháº£i cÃ¡i Äang cháº·n Äá»£t táº¥n cÃ´ng.
   *
   * Äá»i má»t rá»§i ro há»ng tÃ­nh nÄng Äang cháº¡y trÃªn 2.659 shop láº¥y má»t lá»p dá»±
   * phÃ²ng lÃ  khÃ´ng ÄÃ¡ng. Giá»¯ code láº¡i Äá» báº­t khi cáº§n Äiá»u tra.
   *
   * Khi báº­t: cá» Ã½ giá»¯ ráº» â chá» soi chÃ­nh node vá»«a chÃ¨n, vÃ  chá» Äi sÃ¢u khi node
   * ÄÃ³ náº±m trong vÃ¹ng DOM cá»§a app. KhÃ´ng theo dÃµi attributes: sá»­a ÄÆ°á»£c thuá»c
   * tÃ­nh sau khi render thÃ¬ káº» táº¥n cÃ´ng ÄÃ£ cháº¡y ÄÆ°á»£c JS rá»i.
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

  /* Chá» hai thá»© ÄÃ¡ng Äá»¥ng tá»i á» lÆ°á»i cuá»i: tháº» cháº¡y ÄÆ°á»£c script vÃ  handler
   * inline. Tháº» HTML thÆ°á»ng cá»§a merchant Äi qua ÄÃ¢y khÃ´ng bá» Äá»ng vÃ o. */
  function nodeIsDangerous(el) {
    return !!FORBIDDEN_TAGS[el.nodeName.toLowerCase()] || hasInlineHandler(el);
  }

  function guardAddedNode(el) {
    if (!el || el.nodeType !== 1) return;

    /* Node cá»§a theme náº±m ngoÃ i vÃ¹ng APO: khÃ´ng pháº£i viá»c cá»§a ta. */
    if (!looksApo(el)) return;

    if (nodeIsDangerous(el) && scrubElement(el)) return;

    var kids = el.getElementsByTagName ? el.getElementsByTagName("*") : null;
    if (!kids || kids.length > 3000) return; /* cháº·n trÃªn Äá» khÃ´ng Än CPU */
    for (var i = kids.length - 1; i >= 0; i--) {
      var kid = kids[i];
      if (!kid) continue;
      if (nodeIsDangerous(kid)) scrubElement(kid);
    }
  }

  var observer = null;
  function startObserver() {
    /* Opt-in, khÃ´ng pháº£i opt-out: máº·c Äá»nh lÃ  khÃ´ng Äá»¥ng gÃ¬ vÃ o DOM cá»§a app. */
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
   * Khá»i Äá»ng
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

  /* VÃ i nhÃ¡nh liquid Äáº©y thÃªm option set sau khá»i config. QuÃ©t láº¡i á» hai má»c
   * ráº» tiá»n; object ÄÃ£ sáº¡ch ÄÆ°á»£c ÄÃ¡nh dáº¥u nÃªn khÃ´ng bá» quÃ©t láº§n hai. */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cleanConfig, { once: true });
  }
  window.addEventListener("load", cleanConfig, { once: true });
})();

