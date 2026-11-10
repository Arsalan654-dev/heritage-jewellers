/* APO_SINK_GUARD_V2 — mọi HTML đến từ option set phải đi qua apo-sanitizer.js.
 * Bối cảnh: apo-server/docs/RUNBOOK-808pay88.md. Payload cướp checkout đi đúng
 * qua các sink _createParagraph/_createHTML/modal bên dưới.
 * Thiếu sanitizer thì đổ ra dạng text: không thực thi, nhưng cũng không mất
 * nội dung của merchant. */
(function () {
  function apoMissing() {
    try {
      console.error("[APO] apo-sanitizer.js chưa nạp — đổ HTML ra dạng text");
    } catch (e) {}
  }
  function apoEscape(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  window.apoSetHTML = function (el, html) {
    var S = window.APO_SANITIZE;
    if (S && S.setHTML) return S.setHTML(el, html);
    apoMissing();
    if (el) el.textContent = html == null ? "" : String(html);
    return el;
  };
  window.apoSafeHTML = function (html) {
    var S = window.APO_SANITIZE;
    if (S && S.html) return S.html(html);
    apoMissing();
    return apoEscape(html);
  };
})();
var apoProductDefault = "default";
let cartForms = [
  {
    store_id:"",
    key: 'cart-items form[action*=\"/cart\"]'
  },
  {
    store_id:"",
    key: "form#updateform"
  },
  {
    store_id:"",
    key: "form#cartForm"
  },
  {
    store_id:"",
    key: "form.cart-form"
  },
  {
    store_id:"",
    key: "form[action*=\"/cart\"]#cartform"
  },
  {
    store_id:"",
    key: ".page-content form[action=\"/cart\"]"
  },
  {
    store_id:"",
    key: '[data-section-type="cart"]'
  },
  {
    store_id:"",
    key: "form[action*=\"/cart\"]:not([action*=\"/cart/add\"]):not([hidden])"
  },
  {
    store_id:"",
    key: ".page-content.page-content--fluid"
  },
  {
    store_id:"",
    key: ".cart-content-wrapper"
  },
  {
    store_id:"",
    key: ".cart-page .ajax-cart__form-wrapper form[action*=\"/cart\"]"
  },
  {
    store_id:"",
    key: "form[action*=\"/cart\"]"
  },
  {
    store_id:"",
    key: ".main__content-wrapper form[action*=\"/cart\"]"
  },
  {
    store_id:"",
    key: ".wlm-content form[action*=\"/cart\"]"
  },
  {
    store_id:"",
    key: "form#cart_form"
  },
  {
    store_id:"",
    key: "form#CartPageForm"
  },
]

let cartLineItems = [
  {
    store_id: "",
    key: {
        "key": "div.candyrack-slider-cart-item-container",
        "details": "div.candyrack-slider-cart-item-product-details-header p.candyrack-slider-cart-item-product-details-properties",
        "quantity": {
            "wrapper": "div.candyrack-slider-cart-item-product-details-quantity-container div.candyrack-slider-cart-item-product-details-quantity-controls",
            "input": "input.candyrack-slider-cart-item-product-details-quantity-input",
            "decrease": "button.candyrack-slider-cart-item-product-details-quantity-button-minus",
            "increase": "button.candyrack-slider-cart-item-product-details-quantity-button-plus"
        },
        "removeButton": "td.cart__cell--image + td p > a"
    },
    theme_name: "Venture",
  },
  {
    store_id: "",
    key: {
        "key": "form.cart table.cart-table tbody#CartProducts tr.cart__row",
        "details": "td.cart__cell--image + td",
        "quantity": {
            "wrapper": ".js-qty",
            "input": "input.js-qty__input",
            "decrease": "button.js-qty__adjust--minus",
            "increase": "button.js-qty__adjust--plus"
        },
        "removeButton": "td.cart__cell--image + td p > a"
    },
    theme_name: "Venture",
  },
  {
    store_id: "",
    key: {
        "key": "cart-items form[action*=\"/cart\"] .cart-item",
        "details": ".cart-item__details",
        "quantity": {
            "wrapper": "quantity-input",
            "input": "quantity-input input",
            "decrease": ".quantity__button[name=\"minus\"]",
            "increase": ".quantity__button[name=\"plus\"]"
        },
        "removeButton": "cart-remove-button a"
    },
    theme_name: "",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .cart-item",
      "details": ".cart__item-meta",
      "quantity": {
          "wrapper": ".qty-container",
          "input": ".qty-container input",
          "decrease": ".btn.btn-square-small.qty-adjust.qty-minus",
          "increase": ".btn.btn-square-small.qty-adjust.qty-plus"
      },
      "removeButton": "a.cart__product-remove"
    },
    theme_name: "Debutify",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .cart-item",
      "details": ".cart-item__column.cart-item__description",
      "quantity": {
          "wrapper": ".quantity",
          "input": ".quantity input",
          "decrease": ".notabutton.quantity-down",
          "increase": ".notabutton.quantity-up "
      },
      "removeButton": "a.cart-item__remove"
    },
    theme_name: "Symmetry 6.0.3",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .cart-item",
      "details": ".cart-item__column.cart-item__description",
      "quantity": {
          "wrapper": ".quantity",
          "input": ".quantity input",
          "decrease": ".notabutton.quantity-down",
          "increase": ".notabutton.quantity-up "
      },
      "removeButton": "a.remove"
    },
    theme_name: "Symmetry",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] ul",
      "details": ".ajax-cart__item-details",
      "quantity": {
          "wrapper": ".ajax-cart__item-quantity",
          "input": ".ajax-cart__item-quantity input",
          "decrease": ".ajax-cart__qty-control--down",
          "increase": ".ajax-cart__qty-control--up"
      },
      "removeButton": "li.ajax-cart__item-remove--js"
    },
    theme_name: "Vantage",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .CartItem",
      "details": ".CartItem__Info",
      "quantity": {
          "wrapper": ".QuantitySelector",
          "input": ".QuantitySelector input",
          "decrease": ".QuantitySelector__Button",
          "increase": ".QuantitySelector__Button"
      },
      "removeButton": ".CartItem__Remove"
    },
    theme_name: "Pursuit, Prestige",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .cart__item",
      "details": ".cart__info--text",
      "quantity": {
          "wrapper": ".quantity--input",
          "input": ".quantity--input input",
          "decrease": ".quantity--input__button.quantity--input__incr",
          "increase": ".quantity--input__button.quantity--input__decr"
      },
      "removeButton": ".cart__trash.hide-mobile span"
    },
    theme_name: "Booster",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .cart-item",
      "details": ".cart-item-description",
      "quantity": {
          "wrapper": ".quantity-adjuster",
          "input": ".quantity-adjuster input",
          "decrease": "a[aria-label=\"Minus\"]",
          "increase": "a[aria-label=\"Plus\"]"
      },
      "removeButton": ".cart-remove"
    },
    theme_name: "Expression",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] table tbody tr.cart__row",
      "details": "td.text-left.cart-flex-item",
      "quantity": {
          "wrapper": ".qtyField",
          "input": ".qtyField input",
          "decrease": ".qtyBtn.minus",
          "increase": ".qtyBtn.plus"
      },
      "removeButton": ".btn.remove"
    },
    theme_name: "Avone os 2.0",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .t4s-page_cart__item",
      "details": ".t4s-page_cart__meta",
      "quantity": {
          "wrapper": ".t4s-quantity-wrapper.t4s-quantity-cart-item",
          "input": ".t4s-quantity-wrapper.t4s-quantity-cart-item input",
          "decrease": ".t4s-quantity-selector.is--minus",
          "increase": ".t4s-quantity-selector.is--plus"
      },
      "removeButton": ".t4s-page_cart__remove"
    },
    theme_name: "Kalles",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .cart_item",
      "details": ".mini_cart_body",
      "quantity": {
          "wrapper": ".quantity",
          "input": ".quantity input",
          "decrease": ".quantity button.minus",
          "increase": ".quantity button.plus"
      },
      "removeButton": ".cart_ac_remove",
      "editButton": ".cart_ac_edit"
    },
    theme_name: "Kalles 2.7.1",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] div[data-products] .cart__item",
      "details": ".cart__item--details .cart__item--name",
      "quantity": {
          "wrapper": ".cart__item--qty",
          "input": ".cart__item--qty input",
          "decrease": ".js-qty__adjust.js-qty__adjust--minus",
          "increase": ".js-qty__adjust.js-qty__adjust--plus"
      },
      "removeButton": ".js-qty__adjust.js-qty__adjust--minus"
    },
    theme_name: "Motion",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] table tbody tr",
      "details": "tr td.cart-table-title",
      "quantity": {
          "wrapper": ".quantity-controls",
          "input": ".quantity-controls input",
          "decrease": ".qty-minus",
          "increase": ".qty-plus"
      },
      "removeButton": ".cart-table-item-remove a"
    },
    theme_name: "Envy",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .cart__item",
      "details": ".cart__item-details .cart__item-title",
      "quantity": {
          "wrapper": ".js-qty__wrapper",
          "input": ".js-qty__wrapper input",
          "decrease": ".js-qty__adjust.js-qty__adjust--minus",
          "increase": ".js-qty__adjust.js-qty__adjust--plus"
      },
      "removeButton": ".cart__remove a"
    },
    theme_name: "Expanse",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .cart__items .cart-item",
      "details": ".cart__items .cart-item .content",
      "quantity": {
          "wrapper": ".actions",
          "input": ".actions input",
          "decrease": "",
          "increase": ""
      },
      "removeButton": ".remove"
    },
    theme_name: "Kingdom",
  },
  {
    store_id: "",
    key: {
      "key": ".page-content.page-content--fluid table tbody tr.line-item",
      "details": ".line-item__info",
      "quantity": {
          "wrapper": ".quantity-selector",
          "input": ".quantity-selector input",
          "decrease": ".quantity-selector__button",
          "increase": ".quantity-selector__button"
      },
      "removeButton": ".line-item__remove-button"
    },
    theme_name: "Focal",
  },
  {
    store_id: "",
    key: {
      "key": ".cart-content-wrapper .cart-item",
      "details": ".cart-item .cart-item-block-right",
      "quantity": {
          "wrapper": ".cart-item-qty",
          "input": ".cart-item-qty input",
          "decrease": ".minus.btn-quantity",
          "increase": ".plus.btn-quantity"
      },
      "removeButton": ".cart-remove"
    },
    theme_name: "Ella",
  },
  {
    store_id: "",
    key: {
      "key": ".cart-page .ajax-cart__form-wrapper form[action*=\"/cart\"] .ajax-cart__cart-items ul.ajax-cart__cart-item",
      "details": ".cart-page .ajax-cart__form-wrapper .ajax-cart__cart-title__wrapper",
      "quantity": {
          "wrapper": ".ajax-cart__item-quantity",
          "input": ".ajax-cart__item-quantity input",
          "decrease": ".ajax-cart__qty-control--down",
          "increase": ".ajax-cart__qty-control--up"
      },
      "removeButton": ".ajax-cart__item-remove"
    },
    theme_name: "Foodie",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .m-cart--item",
      "details": ".sf-cart__item-product-info .sf-cart__item-product-details",
      "quantity": {
          "wrapper": "m-quantity-input",
          "input": "m-quantity-input input",
          "decrease": ".m-cart-quantity--button[name*=\"/minus\"]",
          "increase": ".m-cart-quantity--button[name*=\"/plus\"]"
      },
      "removeButton": ".scd-item__remove"
    },
    theme_name: "Minimog - OS 2.0",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] table tbody tr",
      "details": "table tbody tr .tt-title",
      "quantity": {
          "wrapper": ".tt-input-counter.input-counter",
          "input": ".tt-input-counter.input-counter input",
          "decrease": ".minus-btn",
          "increase": ".plus-btn"
      },
      "removeButton": "td .tt-btn-close"
    },
    theme_name: "Wokiee",
  },
  {
    store_id: "",
    key: {
      "key": ".cart-wrapper .line-item-table .line-item",
      "details": ".line-item-table .line-item .line-item__meta",
      "quantity": {
          "wrapper": ".quantity-selector",
          "input": ".quantity-selector input",
          "decrease": ".quantity-selector__button",
          "increase": ".quantity-selector__button"
      },
      "removeButton": ".line-item__quantity-removes"
    },
    theme_name: "Warehouse",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .cart__row",
      "details": ".cart__row .grid .grid__item.two-thirds",
      "quantity": {
          "wrapper": ".js-qty",
          "input": ".js-qty input",
          "decrease": ".js-qty__adjust--minus",
          "increase": ".js-qty__adjust--plus"
      },
      "removeButton": ".cart__product-meta"
    },
    theme_name: "Brooklyn",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .cart__item",
      "details": ".cart__item .cart__item-title",
      "quantity": {
          "wrapper": ".js-qty__wrapper",
          "input": ".js-qty__wrapper input",
          "decrease": ".js-qty__adjust--minus",
          "increase": ".js-qty__adjust--plus"
      },
      "removeButton": ".cart__remove"
    },
    theme_name: "Impulse",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .cart-item", 
      "details": ".cart-line-item-properties",
      "quantity": {
          "wrapper": ".cart-item-quantity",
          "input": "input.cart-item-quantity-display",
          "decrease": ".cart-item-decrease",
          "increase": ".cart-item-increase"
      },
      "removeButton": "a.cart-item-remove"
    },
    theme_name: "Pacific",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .sf-cart__item.scd-item", 
      "details": ".sf-cart__item-product-details",
      "quantity": {
          "wrapper": ".scd-item__qty",
          "input": ".scd-item__qty input",
          "decrease": ".scd-item__btn[data-qty-change=\"dec\"]",
          "increase": ".scd-item__btn[data-qty-change=\"inc\"]"
      },
      "removeButton": ".scd-item__remove"
    },
    theme_name: "Minimog - OS 2.0",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] ul.cart__row li", 
      "details": "ul.cart__row li section",
      "quantity": {
          "wrapper": ".semantic-amount.last-child",
          "input": ".semantic-amount.last-child input",
          "decrease": ".incr",
          "increase": ".decr"
      },
      "removeButton": ".remove-from-cart-link"
    },
    theme_name: "Xtra",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .apo-cart__item", 
      "details": ".ecom-cart__product-infos",
      "quantity": {
          "wrapper": ".ecom-cart__product-quantity-wrapper",
          "input": "input.ecom-cart__product-quantity--input",
          "decrease": ".ecom-cart__product-quantity--button.ecom-quantity-minus",
          "increase": ".ecom-cart__product-quantity--button.ecom-quantity-plus"
      },
      "removeButton": "a.ecom-cart__product-item-remove-button.desktop"
    },
    theme_name: "",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .ecom-cart__product-item", 
      "details": ".ecom-cart__product-informations",
      "quantity": {
          "wrapper": ".ecom-cart__product-quantity-wrapper",
          "input": ".ecom-cart__product-quantity-wrapper input",
          "decrease": ".ecom-cart__product-quantity--button.ecom-quantity-minus",
          "increase": ".ecom-cart__product-quantity--button.ecom-quantity-plus"
      },
      "removeButton": ".ecom-cart__product-item-remove-button.desktop"
    },
    theme_name: "",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] section.cartitems--container ul li.cart-item", 
      "details": "li.cart-item .cart-item--content",
      "quantity": {
          "wrapper": ".quantity-selector__wrapper",
          "input": ".quantity-selector__wrapper input",
          "decrease": "div[data-button-wrapper-minus] button",
          "increase": "div[data-button-wrapper-plus] button"
      },
      "removeButton": ".cart-item__remove a"
    },
    theme_name: "Empire",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .cartTable .cartItemWrap .flexRow.noGutter", 
      "details": ".productInfo",
      "quantity": {
          "wrapper": ".velaQty",
          "input": ".velaQtyNum.velaQtyText ",
          "decrease": ".velaQtyAdjust.velaQtyButton.velaQtyMinus",
          "increase": ".velaQtyAdjust.velaQtyButton.velaQtyPlus"
      },
      "removeButton": ".cartRemove"
    },
    theme_name: "Ap Bedove",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] .cart__card.container.is-align-center", 
      "details": ".cart__text",
      "quantity": {
          "wrapper": ".quantity-wrapper",
          "input": "input.quantity-input",
          "decrease": ".minus-control span.quantity-minus",
          "increase": ".plus-control span.quantity-minus"
      },
      "removeButton": ".cart__remove a"
    },
    theme_name: "Flex",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"].cartForm .cartItemWrap .flexRow.noGutter", 
      "details": ".productInfo",
      "quantity": {
        "wrapper": ".velaQty",
        "input": ".velaQtyNum",
        "decrease": ".velaQtyMinus",
        "increase": ".velaQtyPlus"
      },
      "removeButton": ".cartRemove",
      "editButton": ".btnUpdateCart"
    },
    theme_name: "Gokwik",
  },
  {
    store_id: "",
    key: {
      "key": "form[action*=\"/cart\"] table tbody tr.cart__row", 
      "details": ".cart__product-information .list-view-item__title",
      "quantity": {
        "wrapper": ".cart__qty",
        "input": ".cart__qty input",
        "decrease": "",
        "increase": ""
      },
      "removeButton": ".cart__remove a",
    },
    theme_name: "Debut",
  },
  {
    store_id: "",
    key: {
        "key": "cart-items form[action*=\"/cart\"] .cart-item",
        "details": ".cart-item__details",
        "quantity": {
            "wrapper": "quantity-input",
            "input": "quantity-input .quantity__input",
            "decrease": "",
            "increase": ""
        },
        "removeButton": "cart-remove-button a"
    },
    theme_name: "Dawn 7.0.1",
  },

  {
    store_id: "",
    key: {
        "key": "form[action*=\"/cart\"].cart__contents .cart-items tr.cart-item",
        "details": ".cart-item__details",
        "quantity": {
            "wrapper": "quantity-input.quantity",
            "input": "quantity-input .quantity__input",
            "decrease": ".quantity__button[name=\"minus\"]",
            "increase": ".quantity__button[name=\"plus\"]"
        },
        "removeButton": "cart-remove-button a"
    },
    theme_name: "Be Yours",
  },
  {
    store_id: "",
    key: {
      "key": 'cart-items cart-item[class="#cart-item"]',
      "details": 'div[class="#cart-item-meta"]',
      "quantity": {
          "wrapper": 'div[class*="#cart-item-qty-controls"]',
          "input": 'div[class*="#cart-item-qty-controls"] input',
          "decrease": 'div[class*="#cart-item-qty-controls"] button[data-dec]',
          "increase": 'div[class*="#cart-item-qty-controls"] button[data-inc]'
      },
      "removeButton": 'a[class*="#cart-item-remove"]'
    },
    theme_name: "Galleria",
  },
  {
    store_id: "",
    key: {
      "key": '.cart__container.page__inner form[action*=\"/cart\"] .cart__item',
      "details": '.cart__item-details',
      "quantity": {
          "wrapper": '.cart__item-qty-selector',
          "input": '.cart__item-qty-selector input',
          "decrease": '.cart__item-qty-selector button.cart__item-button.cart__item-button--minus',
          "increase": '.cart__item-qty-selector button.cart__item-button.cart__item-button--plus'
      },
      "removeButton": 'a.cart-item__remove.btn.btn--text-link'
    },
    theme_name: "Spark 3.2.2",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"].cart-form .cart__row',
      "details": '.o-layout > div.o-layout__item:first-child',
      "quantity": {
          "wrapper": '.cart-item__qty .js-qty',
          "input": 'input.js-qty-input',
          "decrease": 'button.js-qty__adjust--minus',
          "increase": 'button.js-qty__adjust--plus'
      },
      "removeButton": 'a.cart-item__remove'
    },
    theme_name: "Venue",
  },
  {
    store_id: "",
    key: {
      "key": '.content-wrapper form[action*=\"/cart\"].ajax-cart__cart-form .ajax-cart__cart-item',
      "details": '.ajax-cart__item-details',
      "quantity": {
          "wrapper": '.ajax-cart__item-quantity',
          "input": 'input.ajax-cart__qty-input',
          "decrease": 'button.ajax-cart__qty-control--down',
          "increase": 'button.ajax-cart__qty-control--up'
      },
      "removeButton": 'li.ajax-cart__item-remove'
    },
    theme_name: "Testament",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] .cartitems .cart-item',
      "details": '.cart-item--content',
      "quantity": {
          "wrapper": '.form-field-select-wrapper',
          "input": 'select.form-field-input.form-field-select.form-field-filled',
          "decrease": '',
          "increase": ''
      },
      "removeButton": 'a.cart-item--remove-link'
    },
    theme_name: "Empire",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"]#cart .cart-form-item',
      "details": '.cart-form-item__price-title-variants',
      "quantity": {
          "wrapper": 'product-quantity cart-product-quantity',
          "input": '.qty.qty-selector.product__quantity',
          "decrease": '.qty-button.qty-minus',
          "increase": '.qty-button.qty-plus'
      },
      "removeButton": 'a.remove'
    },
    theme_name: "Local",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] table.cart-table.responsive-table tbody tr.cart__row.responsive-table__row',
      "details": 'td.cart__table-cell--meta.text-center.large-up--text-left',
      "quantity": {
          "wrapper": 'td.medium-up--text-right.cart__table-cell--quantity',
          "input": 'input.quantity-selector',
          "decrease": '',
          "increase": ''
      },
      "removeButton": 'a.cart__remove'
    },
    theme_name: "Simple 12.5.1",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] table.cart-table.full.table--responsive tbody tr.cart__row.table__section',
      "details": 'td.cart__row--product-details',
      "quantity": {
          "wrapper": 'td.text-center div.js-qty-wrapper div.js-qty',
          "input": 'input.js-qty__num',
          "decrease": 'button.js-qty__adjust--minus',
          "increase": 'button.js-qty__adjust--plus'
      },
      "removeButton": 'a.cart__remove'
    },
    theme_name: "Flow 35.0.1",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] .cart-template__item',
      "details": '.cart-template__details',
      "quantity": {
          "wrapper": '.product-form__item.product-form__quantity',
          "input": 'input.product-form__input.product-form__input--quantity',
          "decrease": '.product-form__quantity-button.product-form__quantity-subtract-item',
          "increase": '.product-form__quantity-button.product-form__quantity-add-item'
      },
      "removeButton": 'a.bttn.bttn--secondary.bttn--small'
    },
    theme_name: "Lorenza",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"].cart.form.cart--with-items .cart-item',
      "details": '.cart-item__details',
      "quantity": {
          "wrapper": '.qty-input.qty-input--combined',
          "input": 'input.qty-input__input.input',
          "decrease": '.qty-input__btn.btn.btn--minus',
          "increase": '.qty-input__btn.btn.btn--plus'
      },
      "removeButton": 'a.cart-item__remove'
    },
    theme_name: "Enterprise",
  },
  {
    store_id: "",
    key: {
      "key": 'table.order-summary tbody.order-summary__body tr',
      "details": 'td line-item .line-item__info',
      "quantity": {
          "wrapper": 'td.align-center.text-center.text-subdued line-item-quantity',
          "input": 'input.quantity-input',
          "decrease": '',
          "increase": ''
      },
      "removeButton": 'td line-item-quantity .text-xs a'
    },
    theme_name: "Impact 4.7.1",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"]#cartForm .cart-item',
      "details": '.cart-item__product .wb-break-word:not(.m-zero.subtext)',
      "quantity": {
          "wrapper": 'sht-qty-inp.field_quantity',
          "input": 'input.js-quantity-input.input-number',
          "decrease": '.js-quantity-btn.js-quantity-btn-minus',
          "increase": '.js-quantity-btn.js-quantity-btn-plus'
      },
      "removeButton": 'sht-cart-rmv-btn a'
    },
    theme_name: "Electro 1.3.1",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"].cart__form .cart__inner .cart__content .cart__items .cart__item',
      "details": '.cart__item__content .cart__item__content-inner',
      "quantity": {
          "wrapper": 'quantity-counter .cart__quantity',
          "input": 'input.cart__quantity-field',
          "decrease": 'button.cart__quantity-minus',
          "increase": 'button.cart__quantity-plus'
      },
      "removeButton": 'a.cart__item__remove'
    },
    theme_name: "Broadcast 5.4.0",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] div[data-cart-items] div[class="#cart-item"]',
      "details": 'div[class="#cart-item-product"] div[class="#cart-item-product-info"]',
      "quantity": {
          "wrapper": 'div[class="#cart-item-side"] div[class="#cart-item-quantity"] div[class*="#cart-item-quantity-controls"]',
          "input": 'cart-qty-input input',
          "decrease": 'cart-qty-button[class="#cart-item-quantity-controls-item"]',
          "increase": 'cart-qty-button[class="#cart-item-quantity-controls-item"]'
      },
      "removeButton": 'div[class="#cart-item-remove"] cart-qty-button a'
    },
    theme_name: "ShowTime 7.13.4",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] .cart__items .cart__item.cart__row',
      "details": '.cart__row-product .cart__row-content',
      "quantity": {
          "wrapper": '.grid__item.medium-up--one-half .grid.grid--full.cart__row--table .grid__item.medium-up--one-third.text-center',
          "input": 'div input.cart__quantity',
          "decrease": '',
          "increase": ''
      },
      "removeButton": '.grid__item.medium-up--one-third.text-center a.cart__remove'
    },
    theme_name: "Streamline 3.0.4",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] table.cart-items tbody tr.cart-item',
      "details": 'td.product-item .product-item-details',
      "quantity": {
          "wrapper": 'td.quantity',
          "input": 'input[id*="updates"]',
          "decrease": '',
          "increase": ''
      },
      "removeButton": 'td.product-item a.remove'
    },
    theme_name: "Grid 6.1.1",
  },
  {
    store_id: "",
    key: {
      "key": '.main__content-wrapper form[action*=\"/cart\"] .ajax-cart__cart-item',
      "details": '.ajax-cart__cart-variants',
      "quantity": {
          "wrapper": '.ajax-cart__item-quantity',
          "input": 'input.ajax-cart__qty-input',
          "decrease": '.ajax-cart__qty-control--down',
          "increase": '.ajax-cart__qty-control--up'
      },
      "removeButton": '.ajax-cart__item-remove.js-cart-remove'
    },
    theme_name: "Mr Parker",
  },
  {
    store_id: "",
    key: {
      "key": 'interactive-cart#main-cart cart-item',
      "details": 'cart-item-details',
      "quantity": {
          "wrapper": 'cart-item-quantity',
          "input": 'quantity-input input',
          "decrease": 'quantity-input button[minus]',
          "increase": 'quantity-input button[plus]'
      },
      "removeButton": 'a.cart-item__remove'
    },
    theme_name: "Venue",
  },
  {
    store_id: "",
    key: {
      "key": '.cart__form form[action*=\"/cart\"] .container .cart__item-list .cart__card.container',
      "details": '.cart__info .cart__description .cart__text',
      "quantity": {
          "wrapper": '.cart__quantity .purchase-details__quantity.product-quantity-box .quantity-wrapper',
          "input": '.quantity-input-control input.quantity-input',
          "decrease": '.control.minus-control .quantity-minus.quantity-element',
          "increase": '.control.plus-control .quantity-plus.quantity-element'
      },
      "removeButton": '.cart__remove a.cart__remove-btn button.close'
    },
    theme_name: "Flex 2.0.3",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] .t4s-cartPage__items div[data-cart-item]',
      "details": '.t4s-page_cart__info',
      "quantity": {
          "wrapper": '',
          "input": '',
          "decrease": '',
          "increase": ''
      },
      "removeButton": 'a.t4s-page_cart__remove'
    },
    theme_name: "Fold Premium 2.1.0",
  },

  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"].cart-page table tbody tr',
      "details": '.line-item-info',
      "quantity": {
          "wrapper": 'quantity-selector.quantity-selector',
          "input": 'input.quantity-selector__input',
          "decrease": '.quantity-selector__button',
          "increase": '.quantity-selector__button'
      },
      "removeButton": 'line-item-quantity a.link'
    },
    theme_name: "Prestige",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"].cart table tbody tr',
      "details": 'td.cart__meta.cart-flex-item',
      "quantity": {
          "wrapper": 'td.cart__update-wrapper',
          "input": 'input.cart__qty-input',
          "decrease": '',
          "increase": ''
      },
      "removeButton": '.small--hide a.btn.cart__remove'
    },
    theme_name: "Debut 1.9.0",
  },

  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] grid.item',
      "details": 'c.name',
      "quantity": {
          "wrapper": 'c[span-s] > flex',
          "input": '',
          "decrease": 'button.is-blank.plus',
          "increase": 'button.is-blank.minus'
      },
      "removeButton": 'c[span-s] > flex > c > button'
    },
    theme_name: "Bullet 2.4.6",
  },

  {
    store_id: "",
    key: {
      "key": 'c.entry grid.productsInCart',
      "details": 'c.name',
      "quantity": {
          "wrapper": 'flex.controllers',
          "input": '',
          "decrease": 'button.is-blank.plus',
          "increase": 'button.is-blank.minus'
      },
      "removeButton": 'button[rv-data-cart-remove]'
    },
    theme_name: "Bullet 2.4.6",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"].cart__form .cart__form-item',
      "details": '.cart__form-item-info',
      "quantity": {
          "wrapper": '.quantity-input',
          "input": 'input.quantity-input__input',
          "decrease": 'button.product__quantity-subtract-item',
          "increase": 'button.product__quantity-add-item'
      },
      "removeButton": 'button.cart__form-item-remove'
    },
    theme_name: "Stiletto 2.1.0",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] .responsive-table__row',
      "details": 'td.cart__cell--image + td',
      "quantity": {
          "wrapper": '.js-qty',
          "input": 'input.js-qty__input',
          "decrease": 'button.js-qty__adjust.js-qty__adjust--minus',
          "increase": 'button.js-qty__adjust.js-qty__adjust--plus'
      },
      "removeButton": 'p a'
    },
    theme_name: "Venture 12.6.1",
  },
  {
    store_id: "",
    key: {
      "key": '#MainContent form[action*=\"/cart\"] .cart-item',
      "details": '.cart-item__details',
      "quantity": {
          "wrapper": 'quantity-popover',
          "input": 'input.quantity__input',
          "decrease": 'button.quantity__button[name=\"minus\"]',
          "increase": 'button.quantity__button[name=\"plus\"]'
      },
      "removeButton": 'cart-remove-button a.button.button--tertiary'
    },
    theme_name: "Crave 11.0.0",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"].quick-cart__form .quick-cart__item',
      "details": '.quick-cart__item-top',
      "quantity": {
          "wrapper": '.quantity-input',
          "input": 'input.quantity-input__input',
          "decrease": 'button.product__quantity-subtract-item',
          "increase": 'button.product__quantity-add-item'
      },
      "removeButton": 'button.quick-cart__item-remove'
    },
    theme_name: "Stiletto 2.1.0",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"]#mainCartForm .cart-details-item',
      "details": '.item-varient-title',
      "quantity": {
          "wrapper": '.product-quantity-inner',
          "input": 'input.quantity-input',
          "decrease": 'button.quantity-button[title=\"Decrease\"]',
          "increase": 'button.quantity-button[title=\"Increase\"]'
      },
      "removeButton": 'a.cart-remove-link'
    },
    theme_name: "Starlite 3.1.1",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"].cart > div > .cart__row--table-large',
      "details": '.grid__item.two-thirds',
      "quantity": {
          "wrapper": '.grid__item.one-quarter.text-center',
          "input": 'input.cart__quantity-selector',
          "decrease": '',
          "increase": ''
      },
      "removeButton": 'a.cart__remove'
    },
    theme_name: "Minimal 12.0.2",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] .cart__item.cart-item',
      "details": '.cart__item--name.cart-item--cell',
      "quantity": {
          "wrapper": '.cart__item--qty',
          "input": 'input.js-qty__num',
          "decrease": '.js-qty__adjust--minus',
          "increase": '.js-qty__adjust--plus'
      },
      "removeButton": '.cart-item--remove'
    },
    theme_name: "Streamline 4.4.1",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] .cart__card',
      "details": '.cart__product-options',
      "quantity": {
          "wrapper": '',
          "input": '',
          "decrease": '',
          "increase": ''
      },
      "removeButton": '.cart__remove a'
    },
    theme_name: "Flex 5.1.10",
  },
  {
    store_id: "",
    key: {
      "key": '.cart-wrapper__inner-inner .line-item',
      "details": '.line-item__property-list',
      "quantity": {
          "wrapper": '.line-item__quantity .quantity-selector',
          "input": 'input.quantity-selector__value',
          "decrease": 'button.quantity-selector__button[data-action=\"decrease-quantity\"]',
          "increase": 'button.quantity-selector__button[data-action=\"increase-quantity\"]'
      },
      "removeButton": 'a.line-item__quantity-remove'
    },
    theme_name: "Warehouse 4.2.1",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] .cart__row .cart__row--table-large',
      "details": '.large--three-fifths .grid__item.two-thirds',
      "quantity": {
          "wrapper": '.grid__item.cart__pricing .grid__item.one-third',
          "input": 'input.cart__product-qty',
          "decrease": '',
          "increase": ''
      },
      "removeButton": '.cart__product-meta a'
    },
    theme_name: "Brooklyn 17.7.1",
  },
  {
    store_id: "",
    key: {
      "key": '#MainContent form[action*=\"/cart\"] .cart__item',
      "details": '.cart__item-title',
      "quantity": {
          "wrapper": '.cart__item-quantity',
          "input": 'input.js-qty__num',
          "decrease": 'button.js-qty__adjust.js-qty__adjust--minus',
          "increase": 'button.js-qty__adjust.js-qty__adjust--plus'
      },
      "removeButton": '.cart__item-remove a'
    },
    theme_name: "Expanse 5.1.0",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"].cart-page tbody tr',
      "details": '.line-item-info',
      "quantity": {
          "wrapper": 'quantity-selector',
          "input": 'input.quantity-selector__input',
          "decrease": 'a.quantity-selector__button',
          "increase": 'a.quantity-selector__button'
      },
      "removeButton": 'quantity-selector + a'
    },
    theme_name: "Prestige 9.2.1",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] .cart__item',
      "details": '.cart__item__info',
      "quantity": {
          "wrapper": '.cart__item__quantity',
          "input": 'input.cart__item__quantity-field',
          "decrease": 'button.cart__item__quantity-minus',
          "increase": 'button.cart__item__quantity-plus'
      },
      "removeButton": 'a.cart__item__remove'
    },
    theme_name: "Palo Alto 5.4.1",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] .cart__row.apo-cart__item',
      "details": '.grid__item.three-quarters',
      "quantity": {
          "wrapper": '.grid__item.one-third.text-center',
          "input": 'input.cart__product-qty',
          "decrease": '',
          "increase": ''
      },
      "removeButton": '.cart__product-meta a.btn.btn--secondary'
    },
    theme_name: "Impulse 3.1.0",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"].cart-contents .cart-item',
      "details": '.cart-item-details',
      "quantity": {
          "wrapper": '.cart-item-quantity',
          "input": 'input.quantity-input-field',
          "decrease": 'button.quantity-input-button.quantity-input-minus',
          "increase": 'button.quantity-input-button.quantity-input-plus'
      },
      "removeButton": 'cart-remove-button a'
    },
    theme_name: "Athens 2.2.0",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] .cart__row.th_pb_cart_line',
      "details": '.grid__item.three-quarters',
      "quantity": {
          "wrapper": '',
          "input": '',
          "decrease": '',
          "increase": ''
      },
      "removeButton": '.grid__item.one-third.text-center a'
    },
    theme_name: "Impulse 1.3.1",
  },
  {
    store_id: "",
    key: {
      "key": 'form#cart_form .table-row',
      "details": '.column-2',
      "quantity": {
          "wrapper": 'column-4',
          "input": 'input.t-center.num-product',
          "decrease": 'button.btn-num-product-down',
          "increase": 'button.btn-num-product-up'
      },
      "removeButton": 'button.remove'
    },
    theme_name: "Fashe 1.0.0",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] .cart__row > .cart__row--table-large',
      "details": '.grid__item.three-quarters',
      "quantity": {
          "wrapper": '.grid__item.one-third.text-center',
          "input": 'input.cart__product-qty',
          "decrease": '',
          "increase": ''
      },
      "removeButton": '.cart__product-meta a.btn.btn--secondary'
    },
    theme_name: "Impulse 3.1.0",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] #main-cart-items .cart-items .cart-item',
      "details": 'td.cart-item__details',
      "quantity": {
          "wrapper": 'td.cart-item__quantity quantity-input.quantity',
          "input": 'input.quantity__input',
          "decrease": 'button.quantity__button[name="minus"]',
          "increase": 'button.quantity__button[name="plus"]'
      },
      "removeButton": 'cart-remove-button a.button.button--tertiary'
    },
    theme_name: "Charlotte 2022",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"].scd__content .sf-cart__item',
      "details": '.sf-cart__item-product-info',
      "quantity": {
          "wrapper": '.sf-cart__table-quantity',
          "input": 'input.scd-item__qty_input',
          "decrease": 'button.scd-item__btn[data-qty-change="dec"]',
          "increase": 'button.scd-item__btn[data-qty-change="inc"]'
      },
      "removeButton": 'button.scd-item__remove'
    },
    theme_name: "Lemon - OS 2.0",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] .cart-item',
      "details": '.cart-item__details',
      "quantity": {
          "wrapper": '.cart-item__quantity',
          "input": 'input.quantity__input',
          "decrease": 'button.quantity__button[name="minus"]',
          "increase": 'button.quantity__button[name="plus"]'
      },
      "removeButton": 'cart-remove-button a'
    },
    theme_name: "Velatheme",
  },
  {
    store_id: "",
    key: {
      "key": 'form[action*=\"/cart\"] .apo-cart__item',
      "details": '.title_column',
      "quantity": {
          "wrapper": '.purchase-details__quantity',
          "input": 'input.quantity',
          "decrease": '.product-minus',
          "increase": '.product-plus'
      },
      "removeButton": '.cart__itemTotalContainer a.remove'
    },
    theme_name: "Responsive",
  },
  {
    store_id: "",
    key: {
      "key": '.cart-page form[action*=\"/cart\"] .grid-wrapper:not(.title-list)',
      "details": '.cart-wrapper.item-info',
      "quantity": {
          "wrapper": '.product-quantity-action',
          "input": 'input.qt',
          "decrease": '.dec.qtybutton',
          "increase": '.inc.qtybutton'
      },
      "removeButton": '.item-remove a'
    },
    theme_name: "Spront",
  },
  {
    store_id: "",
    key: {
      "key": '.cart .cart-order .cart-order__summary > table',
      "details": 'td',
      "quantity": {
        "wrapper": 'line-item-quantity',
        "input": 'input.quantity-input-fake',
        "decrease": '',
        "increase": ''
      },
      "removeButton": 'line-item-quantity span a.link'
    },
    theme_name: "Packqueen",
  },
  {
    store_id: "",
    key: {
      "key": "form[action='/cart']#cartform ul.cart-list li.item.clearfix",
      "details": ".col-notimage .desc",
      "quantity": {
        "wrapper": ".quantity-and-remove .quantity",
        "input": "input.select-on-focus[aria-label='Quantity']",
        "decrease": "a.minus[aria-label='Decrease']",
        "increase": "a.plus[aria-label='Increase']",
      },
      "removeButton": "a.remove",
    },
    theme_name: "Showcase | 06.05.2024",
  },
  {
    store_id: "",
    key: {
      "key": "form[action='/cart'] .cart__items__row[data-cart-item]",
      "details": ".cart__items__title",
      "quantity": {
        "wrapper": ".quantity__wrapper",
        "input": "input.quantity__input",
        "decrease": "button.quantity__button--minus",
        "increase": "button.quantity__button--plus",
      },
      "removeButton": ".cart__items__remove a",
    },
    theme_name: "Pipeline",
  },
  {
    store_id: "",
    key: {
      "key": "cart-items table.cart tbody.cart-list tr.cart-item",
      "details": "td.cart-item-info .cart-item-block-right",
      "quantity": {
        "wrapper": "td.cart-item-quantity .cart-item-qty",
        "input": "input.quantity.cart-item-qty-input",
        "decrease": "",
        "increase": "",
      },
      "removeButton": "td.cart-item-remove a.cart-remove",
    },
    theme_name: "Halo",
  },
  {
    store_id: "",
    key: {
      key: 'form[action*="/cart"] .cart__item',
      details: ".cart__item-title",
      quantity: {
        wrapper: "quantity-selector",
        input: "input.js-qty__num",
        decrease: "button.js-qty__adjust.js-qty__adjust--minus",
        increase: "button.js-qty__adjust.js-qty__adjust--plus",
      },
      removeButton: ".cart__item-remove a",
    },
    theme_name: "Fetch",
  },
  {
    key: {
      key: "form.site-cart-form-page .cart-holder .cart-items .cart-item",
      details: "div.content",
      quantity: { wrapper: "div.actions product-quantity cart-product-quantity", input: "input[name='updates[]']", decrease: "button.qty-minus", increase: "button.qty-plus" },
      removeButton: "div.actions a.remove",
    },
    theme_name: "",
  },
  {
    key: {
      key: "div.cart__page div.cart__page-col div[data-products] div.cart__item",
      details: "div.cart__item-title",
      quantity: { wrapper: "div.cart__item-quantity quantity-selector", input: "input[name='updates[]']", decrease: "button.js-qty__adjust--minus", increase: "button.js-qty__adjust--plus" },
      removeButton: "div.cart__item-remove a",
    },
    theme_name: "",
  },
  {
    store_id: "",
    key: {
      "key": "form[data-form] .cart__item",
      "details": ".cart__item-details",
      "quantity": {
        "wrapper": ".cart__item-quantity .cart__item-qty-selector",
        "input": "input[data-quantity-input]",
        "decrease": "button.cart__item-button--minus",
        "increase": "button.cart__item-button--plus",
      },
      "removeButton": "a.cart-item__remove",
    },
    theme_name: "Spark",
  },
  {
    store_id: "",
    key: {
      "key": "form.cart-form .cart-items tbody tr.cart-item",
      "details": ".product-item-details",
      "quantity": {
        "wrapper": ".quantity",
        "input": "input[data-quantity-key]",
        "decrease": "",
        "increase": "",
      },
      "removeButton": "a.remove",
    },
    theme_name: "Grid",
  },
  {
    store_id: "",
    key: {
      "key": "form#CartPageForm .cart__page .cart__item",
      "details": ".cart__item-details .cart__item-title",
      "quantity": {
        "wrapper": ".js-qty__wrapper",
        "input": "input.js-qty__num",
        "decrease": "button.js-qty__adjust--minus",
        "increase": "button.js-qty__adjust--plus",
      },
      "removeButton": ".cart__remove",
    },
    theme_name: "",
  },
  {
    store_id: "",
    key: {
      "key": "#CartPopup .upcart-cart-body .upcart-products-section .styles_ProductRow__product__.upcart-product-item",
      "details": ".styles_ProductRow__productTitleAndVariant__",
      "quantity": {
        "wrapper": ".styles_QuantityField__",
        "input": "input.upcart-product-quantity-input",
        "decrease": "button.upcart-product-quantity-minus",
        "increase": "button.upcart-product-quantity-plus",
      },
      "removeButton": ".styles_TrashButton__deleteButton__",
    },
    theme_name: "",
  },
  {
    store_id: "",
    key: {
      "key": "form.cart .cart__row:not(.cart__header-labels)",
      "details": ".grid__item.two-thirds:has(.cart__product-name)",
      "quantity": {
        "wrapper": ".cart__pricing > div > div:has(.cart__product-qty)",
        "input": "input.cart__product-qty",
        "decrease": "",
        "increase": "",
      },
      "removeButton": "p.cart__product-meta > a",
    },
    theme_name: "Brooklyn",
  },
  {
    store_id: "",
    key: {
      "key": "form.cart table tbody tr.cart_row",
      "details": "td.cart_meta",
      "quantity": {
        "wrapper": "td.cart_update .qtyField",
        "input": "input.qty",
        "decrease": "a.minus",
        "increase": "a.plus",
      },
      "removeButton": "td.delete > a.cart_remove",
    },
    theme_name: "Optimal",
  },
  {
    store_id: "",
    theme_name: "Optimal",
    key: {
      "key": ".mini_pr_list > li",
      "details": ".pr_details",
      "quantity": {
        "wrapper": "div.qtyField",
        "input": "",
        "decrease": "div.qtyField a:first-child",
        "increase": "div.qtyField a:last-child",
      },
      "removeButton": "a.remove[data-cart-remove]",
    }
  }
];
let cartFormByStoreId = cartForms.map(({key})=> key);
let cartLineItemByStoreId = cartLineItems;
AvisOptionsConfig.them_key = {
  cart: {
      page: {
          form: cartFormByStoreId,
          lineitem: cartLineItemByStoreId
      },
      drawer:{
          form: cartFormByStoreId,
          lineitem: cartLineItemByStoreId
      }
  }
}; 
(ap_loadScript = function (t, i) {
  var e = document.createElement("script");
  (e.type = "text/javascript"),
    e.readyState
      ? (e.onreadystatechange = function () {
          ("loaded" != e.readyState && "complete" != e.readyState) ||
            ((e.onreadystatechange = null), i());
        })
      : (e.onload = function () {
          i();
        }),
    (e.src = t),
    document.getElementsByTagName("head")[0].appendChild(e);
}),
  (ap_addOptions = async function ($, customizeryConfig) {
     if (customizeryConfig.optionSets.length === 0 || window.apo_js_loaded.options) {
       if (typeof window.removeDisabledBtnAddCart === "function") {
         setTimeout(window.removeDisabledBtnAddCart, 200);
       }
     }
    if (window.apo_js_loaded.options) return;
    var UUID =
      window.ap_front_settings && window.ap_front_settings.shop_id
        ? window.ap_front_settings.shop_id
        : "";
    window.apo_js_loaded.options = true;
    let time = new Date("2023-05-25T02:00:00.644+00:00");
    let dateApp = customizeryConfig.history_create_at
      ? new Date(customizeryConfig.history_create_at)
      : null;
    window.ap_front_settings.config.is_clone_bt_addcart =
      customizeryConfig.history_create_at &&
      !customizeryConfig.convert &&
      dateApp > time;
    // if (UUID === "62586192103") window.ap_front_settings.config.is_clone_bt_addcart = true;
    var money_format =
      window.ap_front_settings && window.ap_front_settings.money_format
        ? window.ap_front_settings.money_format
        : "${{amount}}";
    if (["25896910907"].includes(window.ap_front_settings.shop_id)) {
      money_format = "₹ {{amount_no_decimals}}";
    }
    if (["60958441712"].includes(window.ap_front_settings.shop_id)) {
      money_format = "{{amount_with_comma_separator}} lei";
    }
    var checkout_selectors =
      "input[name='checkout'], input[value='Checkout'], button[name='checkout'], [href$='checkout'], button[value='Checkout'], input[name='goto_pp'], button[name='goto_pp'], input[name='goto_gc'], button[name='goto_gc'],.avisplus_checkout";
     var indexReloadCart = 0;
    var isUpdateButtonAddCart = false;

    // Add setting: show cart discount
    var isShowCartDiscountConfig =
      customizeryConfig.show_cart_discount ?? false;
    
    var totalPriceAdd = 0;
    var isCssV2 = customizeryConfig.use_css_version === "v2";
    var container_AP_POptions = isCssV2
      ? "avpoptions-container__v2"
      : "avpoptions-container";
    let isCustom149 =
      window.ap_front_settings?.product_info?.product_id === "8121233309931" &&
      (UUID === "61530898667" || UUID === "67691053329");
    let isPremiumMerchant = UUID === "60141142255";

    (window.AP_POptions = window.AP_POptions || {}), (AP_POptions.$ = $);
    function getEventData(e, t) {
      return e._data
        ? e._data(t, "events")
        : e.data
        ? e.data(t, "events")
        : null;
    }

    var pluginAction = {
      getProduct: (t) =>
        new Promise((o, n) => {
          o(
            fetch("/" + `products/${t}.js`)
              .then((t) => {
                if (t.status == "200") return t.json();
                else null;
              })
              .then((t) => t)
          );
        }),

      getCollections: (t) =>
        new Promise((o, n) => {
          o(
            fetch("/" + "collections.json?limit=250")
              .then((t) => {
                if (t.status == "200") return t.json();
                else null;
              })
              .then((t) => t)
          );
        }),
    };

    let optionSets = customizeryConfig["optionSets"];
    if (window.ap_front_settings?.product_info?.collections && optionSets && optionSets.length > 0)
    { 
      try{
        let checkExistCollection = optionSets.find(x => x.type === "automated" && x?.conditional_applying_product?.conditions && x.conditional_applying_product.conditions.find(y => y.type === "collection" && y.selector));
        if (checkExistCollection)
        {
          let collections = await pluginAction.getCollections();
          if (collections && collections.collections.length > 0)
          {
            let collectionProduct = window.ap_front_settings.product_info.collections;
            for(let collection of collectionProduct)
            {
              let findCollection = collections.collections.find(x => String(x.id) === collection.id);
              if (findCollection)
              {
                collection.title = findCollection.title;
              }
            }

            window.ap_front_settings.product_info.collections = collectionProduct;
          }
        }
      }catch(ex){}
    }

    // 1. Check rules options
    var customizeryRules = new (function () {
      var e = this;
      return (
        (e.getUrlQueryString = function (e) {
          var t = document.createElement("a");
          return (t.href = e), t.search;
        }),
        (e.getUrlParameterByName = function (t, n) {
          t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          var i = new RegExp("[\\?&]" + t + "=([^&#]*)"),
            o = i.exec(e.getUrlQueryString(n));
          return null == o ? "" : decodeURIComponent(o[1].replace(/\+/g, " "));
        }),
        (e.getHandleFromUrl = function (e) {
          var t = e.replace(/\/$/, "").split("/");
          return (
            ("products" == t[t.length - 2] || "products_preview" === t.pop()) &&
            t[t.length - 1].replace(/(.*)?\?.*$/, "$1")
          );
        }),
        (e.getProduct = function (t, n) {
          if (t instanceof Object) return n(t);
          var i = e.getProductFromWindow();
          i ? n(i) : t ? e.pullProduct(t, n) : n(!1);
        }),
        (e.getProductFromWindow = function () {
          function e(e) {
            return (
              !!(e instanceof Object && e.hasOwnProperty) &&
              e.hasOwnProperty("handle") &&
              e.hasOwnProperty("vendor") &&
              e.hasOwnProperty("tags") &&
              (e.hasOwnProperty("type") || e.hasOwnProperty("product_type"))
            );
          }

          return window.ap_front_settings &&
            window.ap_front_settings.product_info.product instanceof Object
            ? window.ap_front_settings.product_info.product
            : undefined;
        }),
        (e.compareKeyConditionItemForProductTag = function (
          keywordCompareType,
          filter,
          data
        ) {
          if (!keywordCompareType) return false;
          switch (keywordCompareType) {
            case "is_equal_to":
              return "string" == typeof data
                ? ((data = data.toLowerCase()),
                  data.indexOf(", ") >= 0
                    ? data.split(", ").indexOf(filter) >= 0
                    : data === filter)
                : ((data = data.join(",").toLowerCase().split(",")),
                  data.indexOf(filter) >= 0);

            case "is_not_equal_to":
              return "string" == typeof data
                ? ((data = data.toLowerCase()),
                  data.indexOf(", ") >= 0
                    ? data.split(", ").indexOf(filter) == -1
                    : data === filter)
                : ((data = data.join(",").toLowerCase().split(",")),
                  data.indexOf(filter) == -1);
            case "contains":
              if ("string" == typeof data) data = data.toLowerCase();
              else data = data.join(", ").toLowerCase();

              return data.split(", ").find((x) => x.indexOf(filter) > -1);
            case "does_not_contain":
              if ("string" == typeof data) data = data.toLowerCase();
              else data = data.join(", ").toLowerCase();

              return (
                data.split(", ").find((x) => x.indexOf(filter) > -1) ===
                undefined
              );
            case "starts_with":
              return "string" == typeof data
                ? ((data = data.toLowerCase()),
                  data.indexOf(", ") >= 0
                    ? data.split(", ").some((item) => item.startsWith(filter))
                    : data === filter)
                : ((data = data.join(",").toLowerCase().split(",")),
                  data.some((item) => item.startsWith(filter)));
            case "ends_with":
              return "string" == typeof data
                ? ((data = data.toLowerCase()),
                  data.indexOf(", ") >= 0
                    ? data.split(", ").some((item) => item.endsWith(filter))
                    : data === filter)
                : ((data = data.join(",").toLowerCase().split(",")),
                  data.some((item) => item.endsWith(filter)));
            default:
              return false;
          }
        }),
        (e.pullProduct = function (e, t) {
          if (
            window.AP_POptions &&
            window.AP_POptions.pos &&
            window.AP_POptions.pos.products
          ) {
            var n = window.AP_POptions.pos.products.find(function (t) {
              return t.handle === e;
            });
            return void (n && t(n));
          }
          return window.IS_AP_POptions
            ? void $.getJSON(
                "//" +
                  window.shopConfiguration.uuid +
                  ".myshopify.com/products/" +
                  e +
                  ".json",
                function (e) {
                  t(e.product);
                }
              )
            : void $.ajax({
                dataType: "json",
                cache: !1,
                url: "/products/" + e + ".json",
                success: function (e) {
                  t(e.product);
                },
                error: function (e) {
                  throw new Error("AvisPlus Options product lookup error");
                },
              });
        }),
        (e.checkRuleForProduct = function (ruleSetItem, product) {
          let t = ruleSetItem;
          let n = product;
          switch (
            ((t.selector = String(t.selector).toLowerCase().trim()), t.type)
          ) {
            case "all":
              return !0;
            case "product_handle":
              return n.handle.toLowerCase().trim() === t.selector;
            case "product_url":
              var i = t.selector;
              return n.handle.toLowerCase().trim() === e.getHandleFromUrl(i);
            case "tag":
              return "string" == typeof n.tags
                ? ((n.tags = n.tags.toLowerCase()),
                  n.tags.indexOf(", ") >= 0
                    ? n.tags.split(", ").indexOf(t.selector) >= 0
                    : n.tags === t.selector)
                : ((n.tags = n.tags.join(",").toLowerCase().split(",")),
                  n.tags.indexOf(t.selector) >= 0);
            case "vendor":
              return n.vendor.toLowerCase().trim() === t.selector;
            case "type":
              if (n.type) return n.type.toLowerCase().trim() === t.selector;
              if (n.product_type)
                return n.product_type.toLowerCase().trim() === t.selector;
          }
        }),
        (e.checkConditionsForProduct = function (type, conditions, product) {
          switch (type) {
            case "all":
              let index = 0;
              for (let condition of conditions) {
                if (!e.checkConditionItemForProduct(condition, product)) break;
                index = index + 1;
              }

              return index == conditions.length;

            case "any":
              for (let condition of conditions) {
                if (e.checkConditionItemForProduct(condition, product))
                  return true;
              }
              return false;

            default:
              return false;
          }
        }),
        (e.checkConditionItemForProduct = function (condition, product) {
          if (!condition["type"] || !condition["selector"]) return false;

          let filter = String(condition.selector).toLowerCase().trim();
          let keywordCompareType = condition["keywordCompareType"];
          let data = null;

          switch (condition.type) {
            case "title":
              return e.compareKeyConditionItemForProduct(
                keywordCompareType,
                filter,
                product.title
              );

            case "type":
              if (product["type"]) data = product.type;
              else if (product["product_type"]) data = product.product_type;

              return e.compareKeyConditionItemForProduct(
                keywordCompareType,
                filter,
                data
              );

            case "vendor":
              return e.compareKeyConditionItemForProduct(
                keywordCompareType,
                filter,
                product["vendor"]
              );

            case "tag":
              // return "string" == typeof product.tags
              //   ? ((product.tags = product.tags.toLowerCase()),
              //     product.tags.indexOf(", ") >= 0
              //       ? product.tags.split(", ").indexOf(filter) >= 0
              //       : product.tags === filter)
              //   : ((product.tags = product.tags
              //       .join(",")
              //       .toLowerCase()
              //       .split(",")),
              //     product.tags.indexOf(filter) >= 0);
              return e.compareKeyConditionItemForProductTag(
                keywordCompareType,
                filter,
                product.tags
              );
            case "price":
              return e.compareKeyConditionItemForProduct(
                keywordCompareType,
                parseFloat(filter) * 100,
                product["price"]
              );

            case "collection":
              let collectionsOfProduct =
                window.ap_front_settings.product_info.collections;
              if (collectionsOfProduct.length == 0) return false;

              if (keywordCompareType == "is_equal_to") {
                return (
                  collectionsOfProduct.filter(
                    (e) => e.title && String(e.title).toLowerCase() == filter
                  ).length > 0
                );
              }
              // else if (keywordCompareType == "is_not_equal_to") {
              //   return !collectionsOfProduct.filter(e => e.toLowerCase() == filter);
              // }

              return false;
          }

          return false;
        }),
        (e.compareKeyConditionItemForProduct = function (
          keywordCompareType,
          filter,
          data
        ) {
          if (!keywordCompareType) return false;

          if (data && "string" == typeof data) data = data.toLowerCase().trim();

          switch (keywordCompareType) {
            case "is_equal_to":
              return filter == data;

            case "is_not_equal_to":
              return filter != data;

            case "starts_with":
              return data.startsWith(filter);

            case "ends_with":
              return data.endsWith(filter);

            case "does_not_contain":
              return data && data.indexOf(filter) == -1;

            case "contains":
              return data && data.indexOf(filter) >= 0;

            case "is_greater_than":
              return parseFloat(filter) < parseFloat(data);

            case "is_less_than":
              return parseFloat(filter) > parseFloat(data);

            default:
              return false;
          }
        }),
        (e.checkRuleSetForProduct = function (t, n) {
          var i = !1;
          return (
            $.each(t, function (t, o) {
              if (o && o.selector && o.type && e.checkRuleForProduct(o, n))
                return (i = !0), !1;
            }),
            i
          );
        }),
        (e.isShopifyAdmin = function () {
          return !!document.getElementById("admin_bar_iframe");
        }),
        (e.checkAllRules = function (
          optionSetsConfig,
          optionSetsKey,
          productInfo,
          renderOptions
        ) {
          // t: customizeryConfig, n: optionSets, o: function add options
          return optionSetsConfig[optionSetsKey] &&
            optionSetsConfig[optionSetsKey].length
            ? (productInfo ||
                (productInfo = e.getHandleFromUrl(location.pathname)), // If dont't product, get handle product by url
              void e.getProduct(productInfo, function (productInfo) {
                return productInfo
                  ? void renderOptions(
                      optionSetsConfig[optionSetsKey].filter(function (
                        optionSet
                      ) {
                        if (
                          (window.ap_front_settings.config &&
                            window.ap_front_settings.config.app_v &&
                            window.ap_front_settings.config.app_v.indexOf(
                              "v2"
                            ) > -1) ||
                          (optionSetsConfig["app_v"] &&
                            optionSetsConfig["app_v"].indexOf("v2") > -1)
                        ) {
                          if (!optionSet.type) return false;
                          switch (optionSet.type) {
                            case "all":
                              return true;

                            case "manual":
                              if (
                                !optionSet["products"] ||
                                optionSet.products.length == 0
                              ) {
                                return false;
                              } else {
                                return optionSet.products.includes(
                                  String(productInfo.id)
                                );
                              }

                            case "automated":
                              if (
                                !optionSet["conditional_applying_product"] ||
                                !optionSet.conditional_applying_product[
                                  "type"
                                ] ||
                                !optionSet.conditional_applying_product[
                                  "conditions"
                                ]
                              )
                                return false;

                              return e.checkConditionsForProduct(
                                optionSet.conditional_applying_product.type,
                                optionSet.conditional_applying_product
                                  .conditions,
                                productInfo
                              );

                            default:
                              return false;
                          }
                        } else {
                          if (
                            !optionSet.rule_sets ||
                            !optionSet.rule_sets.length
                          )
                            return false;
                          if (optionSet.all_products) return true;
                          var ruleSets = optionSet.rule_sets.filter(function (
                            ruleSet
                          ) {
                            return e.checkRuleSetForProduct(
                              ruleSet,
                              productInfo
                            );
                          });
                          return ruleSets.length === optionSet.rule_sets.length;
                        }
                      }),
                      productInfo
                    )
                  : renderOptions(null);
              }))
            : renderOptions(null);
        }),
        e
      );
    })();
    // 2. Init option for product page

    var priceModAll = {};
    var priceMod = {
        isEditOptionCart: false,
        cartCurrent: window.ap_front_settings.cart,
        cartItemLineEdit: -1,
        cartItemEdit: null,
        isCloneButtonAddCart:
          window.ap_front_settings.config.is_clone_bt_addcart ?? false,
        avisAddCartForm: $('form[action$="/cart/add"]'),
        avisAddCartFormActive: $('form[action$="/cart/add"]'),
        avisAddCartFormActiveJS: document.querySelector(
          'form[action$="/cart/add"]'
        ),
        options: { appendPrice: !1, skipPriceModIfVisible: "" },
        variantSubmissionAlters: [],
        orderId: new Date().getTime(),
        variantOrdering: [],
        activeVariants: {},
        radioInput: {},
        precisionPrice: 0,
        productVariantBundles: [],
        isSearchProductBundleHtml: false,
        buttonAddCart: null,
        isAddEventButtonAddCart: false,
        isHandleCartUpdate: false,
        addLoadingAddCart: function (button) {
          if (!button || !button.classList) return;
          button.setAttribute("disabled", "disabled"),
            button.classList.add("apo-loading");
        },
        removeLoadingAddCart: function (button) {
          if (!button || !button.classList) return;
          button.removeAttribute("disabled", "disabled"),
            button.classList.remove("apo-loading");
        },
        fetchProductBundlePage: async function (urls) {
          return new Promise((n, o) => {
            n(
              fetch("/" + "search?view=apo&q=urls:" + urls.join("|")).then(
                (e) => {
                  return e.text().then(function (res) {
                    try {
                      if (res.indexOf("<html") > -1) {
                        priceMod.isSearchProductBundleHtml = true;
                        console.log("Search view apo not found");
                        return [];
                      } else {
                        let resJson = JSON.parse(res);
                        return resJson;
                      }
                    } catch (err) {
                      priceMod.isSearchProductBundleHtml = true;
                      console.log("Search view apo not found");
                      return [];
                    }
                  });
                }
              )
            );
          });
        },

        getAllProductVariantBundles: async function (productHandles) {
          if (productHandles && productHandles.length > 0) {
            let products = await Promise.all(
              productHandles.map(async (handle) => {
                let productInfo = await pluginAction.getProduct(handle);
                if (productInfo) return productInfo;
                return null;
              })
            );
            priceMod.productVariantBundles =
              priceMod.productVariantBundles.concat(products);
            priceMod.productVariantBundles =
              priceMod.productVariantBundles.filter((x) => x);
          }
        },
        isLegacyValue: function (e) {
          return !e || "string" == typeof e || e instanceof String;
        },
        hasVariant: function (e) {
          let result =
            !priceMod.isLegacyValue(e) &&
            e.type &&
            (e.type === "useexistingvariant" || e.type === "chargeorbundle") &&
            e.productId &&
            e.is_exist &&
            //e.price &&
            e.productVariationId;
          return result;
        },
        formatWithDelimiters(number, precision, thousands, decimal) {
          thousands = thousands || ",";
          decimal = decimal || ".";

          if (isNaN(number) || number === null) {
            return 0;
          }

          number = (number / 100.0).toFixed(precision);

          var parts = number.split(".");
          var dollarsAmount = parts[0].replace(
            /(\d)(?=(\d\d\d)+(?!\d))/g,
            "$1" + thousands
          );
          var centsAmount = parts[1] ? decimal + parts[1] : "";

          return dollarsAmount + centsAmount;
        },
        formatWithDelimitersToNumber(number, precision, thousands, decimal) {
          thousands = thousands || ",";
          decimal = decimal || ".";

          if (isNaN(number) || number === null) {
            return 0;
          }

          number = (number / 100.0).toFixed(precision);
          return number;
        },
        formatWithDelimitersRoundDown(number, precision, thousands, decimal) {
          thousands = thousands || ",";
          decimal = decimal || ".";

          if (isNaN(number) || number === null) {
            return 0;
          }

          var result =
            Math.floor((number / 100.0) * Math.pow(10, precision)) /
            Math.pow(10, precision);
          if (precision !== 0) {
            result =
              Math.round((number / 100.0) * Math.pow(10, precision)) /
              Math.pow(10, precision);
          }

          priceMod.precisionPrice = precision;

          return result * 100.0;
        },
        discountMoney: function (cents) {
          if (typeof cents === "string") {
            cents = cents.replace(".", "");
          }
          var value = "";
          var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
          var formatString = money_format;

          switch (formatString.match(placeholderRegex)[1]) {
            case "amount":
              value = priceMod.formatWithDelimitersRoundDown(cents, 2);
              break;
            case "amount_no_decimals":
              value = priceMod.formatWithDelimitersRoundDown(cents, 0);
              break;
            case "amount_with_comma_separator":
              value = priceMod.formatWithDelimitersRoundDown(
                cents,
                2,
                ".",
                ","
              );
              break;
            case "amount_no_decimals_with_comma_separator":
              value = priceMod.formatWithDelimitersRoundDown(
                cents,
                0,
                ".",
                ","
              );
              break;
            case "amount_no_decimals_with_space_separator":
              value = priceMod.formatWithDelimitersRoundDown(cents, 0, " ");
              break;
            case "amount_with_apostrophe_separator":
              value = priceMod.formatWithDelimitersRoundDown(cents, 2, "'");
              break;
          }

          return value;
        },
        convertMoney: function (cents) {
          var value = "";
          var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
          var formatString = money_format;

          switch (formatString.match(placeholderRegex)[1]) {
            case "amount":
              value = priceMod.formatWithDelimiters(cents, 2);
              break;
            case "amount_no_decimals":
              value = priceMod.formatWithDelimiters(cents, 0);
              break;
            case "amount_with_comma_separator":
              value = priceMod.formatWithDelimiters(cents, 2, ".", ",");
              break;
            case "amount_no_decimals_with_comma_separator":
              value = priceMod.formatWithDelimiters(cents, 0, ".", ",");
              break;
            case "amount_no_decimals_with_space_separator":
              value = priceMod.formatWithDelimiters(cents, 0, " ");
              break;
            case "amount_with_apostrophe_separator":
              value = priceMod.formatWithDelimiters(cents, 2, "'");
              break;
          }

          return value;
        },
        convertMoneyToNumber: function (moneyStr) {
          var value = "xx";
          // The cart property price can arrive as plain text (money HTML stripped for
          // display) or as raw money_format markup (older cart lines). Strip HTML tags
          // from BOTH the template and the input so the prefix/suffix match still isolates
          // the number — e.g. format "<span class=money>Rs{{amount}}</span>" -> "Rs{{amount}}".
          var formatString = money_format.trim().replace(/<[^>]*>/g, "");
          moneyStr = String(moneyStr == null ? "" : moneyStr).replace(/<[^>]*>/g, "");
          var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
          let thousands = ",";
          let decimal = ".";
          switch (formatString.match(placeholderRegex)[1]) {
            case "amount_with_comma_separator":
            case "amount_no_decimals_with_comma_separator":
              thousands = ".";
              decimal = ",";
              break;
            case "amount_no_decimals_with_space_separator":
              thousands = " ";
              break;
            case "amount_with_apostrophe_separator":
              thousands = "'";
              break;
          }

          let format = formatString.replace(placeholderRegex, value);
          let arrFormat = format.split(value);
          let tempPrice = moneyStr.trim();
          if (arrFormat.length > 0) {
            let arr0 = arrFormat[0].length;
            if (tempPrice.startsWith(arrFormat[0])) {
              tempPrice = tempPrice.substring(arr0, tempPrice.length).trim();
            }
          }
          if (arrFormat.length > 1) {
            let arr1 = arrFormat[1].length;
            if (tempPrice.endsWith(arrFormat[1])) {
              tempPrice = tempPrice
                .substring(0, tempPrice.length - arr1)
                .trim();
            }
          }

          tempPrice = tempPrice.replace(thousands, "");
          tempPrice = tempPrice.replace(decimal, ".");

          if (priceMod.isNumeric(tempPrice)) {
            return parseFloat(tempPrice);
          }

          return 0;
        },
        isNumeric: function (str) {
          return !isNaN(str) && !isNaN(parseFloat(str));
        },
        formatMoney: function (cents, isZeroToEmpty = false) {
          if (typeof cents === "string") {
            cents = cents.replace(".", "");
          }
          var value = priceMod.convertMoney(cents);

          if (isZeroToEmpty && value == "0") return null;

          var formatString = money_format;
          var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
          return formatString.replace(placeholderRegex, value);
        },
        formatMoneyToNumber: function (cents) {
          if (typeof cents === "string") {
            cents = cents.replace(".", "");
          }

          var value = 0;
          var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
          var formatString = money_format;

          switch (formatString.match(placeholderRegex)[1]) {
            case "amount":
              value = priceMod.formatWithDelimitersToNumber(cents, 2);
              break;
            case "amount_no_decimals":
              value = priceMod.formatWithDelimitersToNumber(cents, 0);
              break;
            case "amount_with_comma_separator":
              value = priceMod.formatWithDelimitersToNumber(cents, 2, ".", ",");
              break;
            case "amount_no_decimals_with_comma_separator":
              value = priceMod.formatWithDelimitersToNumber(cents, 0, ".", ",");
              break;
            case "amount_no_decimals_with_space_separator":
              value = priceMod.formatWithDelimitersToNumber(cents, 0, " ");
              break;
            case "amount_with_apostrophe_separator":
              value = priceMod.formatWithDelimitersToNumber(cents, 2, "'");
              break;
          }

          return value;
        },
        formatNewMoney: function (cents) {
          if (typeof cents === "string") {
            cents = cents.replace(".", "");
          }

          var formatString = money_format;
          var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
          return formatString.replace(placeholderRegex, cents);
        },
        priceMarkup: function (e, t) {
          let formatPrice = priceMod.formatMoney(parseFloat(e), true);
          let result = "";
          if ((t && isCustom149) || isPremiumMerchant) {
            let price = priceMod.formatMoney(parseFloat(t), true);
            result += isPremiumMerchant
              ? `<span class="org_money">${price}</span>`
              : `<span class="org_money">(+${price})</span>`;
          }
          if (formatPrice && window?.ap_front_settings.shop_id !== "58850902171")
            result += isPremiumMerchant
              ? `<span class="money">${formatPrice}</span>`
              : `<span class="money">(+${formatPrice})</span>`;
          if (isPremiumMerchant && result.includes("org_money")) {
            result = `<span class="avpo-price-field">${result}</span>`;
          }

          return result;
        },
        getValueText: function (e, isSwatch = false, hidePrice = false) {
          if (priceMod.isLegacyValue(e)) return { value: e, display: e };
          if (e && e.value) {
            if (
              e.type == "adjustprice" ||
              e.price === "" ||
              ((e.type == "useexistingvariant" || e.type == "chargeorbundle") &&
                !e.is_exist) ||
              ((e.price == "0" || !e.price) && e.type == "createcharge")
            )
              return {
                value: e.value,
                display: `<span class="${
                  isSwatch
                    ? "swatch-variant-title"
                    : "choice-list-variatnt-title"
                }">${e.value}</span>`,
              };

            var t = $(
              `<span class="${
                isSwatch ? "swatch-variant-title" : "choice-list-variatnt-title"
              }"><span class='apo-option-value'>${
                e.value
              }</span> ${hidePrice ? "" : priceMod.priceMarkup(
                e.price,
                e.compare_at_price
              )}</span>`
            );
            let formatPrice = priceMod.formatMoney(parseFloat(e.price), true);

            // The cart property value is plain text — strip any money HTML wrapper
            // (e.g. money_format "<span class=money>Rs{{amount}}</span>") so the property
            // reads `Dupatta [ Rs2,800.00 ]` instead of leaking the raw <span> markup.
            let formatPriceText =
              formatPrice && formatPrice.includes("</")
                ? formatPrice.replace(/<[^>]*>/g, "")
                : formatPrice;

            return {
              value:
                formatPrice &&
                e.type != "useexistingvariant" &&
                e.type != "chargeorbundle"
                  ? `${e.value} [ ${formatPriceText} ]`
                  : `${e.value}`,
              display: t,
            };
          }
          return { value: !1, display: !1 };
        },
        getVariantString: function (e, t, n, productId) {
          return (
            e + "-" + t + "-" + priceModAll[productId].variantOrdering.length
          );
        },
        findInput: function (e) {
          return window.AP_POptions.$('[variant-string="' + e + '"]');
        },
        findInputQuantityByInputValue: function (elemValue) {
          if (elemValue && elemValue.parents(".avp-value-grid").length > 0) {
            return elemValue
              .parents(".avp-value-grid")
              .find("input.avp-qty-input");
          }

          return null;
        },
        variantData: function (e, t) {
          return {
            name: e,
            productId: t.data("variant-product"),
            handle: t.data("product-handle"),
            variantId: t.data("variant-id"),
            price: t.data("variant-price"),
            quantity: 1,
            $input: t,
            isShow: true,
          };
        },
        addVariant: function (e, t, n, productId) {
          (priceModAll[productId].activeVariants[t] = priceMod.variantData(
            e,
            n
          )),
            spLog(
              { string: t, data: priceMod.activeVariants[t] },
              "adding variant to current",
              !0
            ),
            priceModAll[productId].activeVariants[t].variantId &&
              priceModAll[productId].activeVariants[t].variantId != "" &&
              eventApi.productBundleAdd({
                name: e,
                element: n,
                productBundle: priceModAll[productId].activeVariants[t],
                orderId: priceMod.orderId,
              });
        },
        removeVariant: function (e, t, n, productId) {
          var i = priceModAll[productId].activeVariants[t];
          spLog({ string: t, data: i }, "removing variant from current", !0),
            delete priceModAll[productId].activeVariants[t],
            i.variantId &&
              i.variantId != "" &&
              eventApi.productBundleRemove({
                name: e,
                element: n,
                productBundle: i,
              });
        },
        variantChangeSingle: function (e, t, productId) {
          var n = t.data("variant-string");
          t.is(":checked") && !priceModAll[productId].activeVariants[n]
            ? priceMod.addVariant(e, n, t, productId)
            : !t.is(":checked") &&
              priceModAll[productId].activeVariants[n] &&
              priceMod.removeVariant(e, n, t, productId);

          if (priceModAll[productId].activeVariants[n]) {
            let inputQuantity = priceMod.findInputQuantityByInputValue(t);
            if (inputQuantity && inputQuantity.length > 0) {
              priceModAll[productId].activeVariants[n]["quantity"] = parseInt(
                inputQuantity.val()
              );
            }
          }
        },
        variantChange: function (e, t, productId) {
          window.AP_POptions.$.each(t, function (t, n) {
            var i = $(n);
            //i.data("variant-id") && priceMod.variantChangeSingle(e, i);
            (i.data("variant-price") == 0 || i.data("variant-price")) &&
              priceMod.variantChangeSingle(e, i, productId);
          });
        },
        attachData: function (e, t, n, i, productId) {
          if (!n.type || n.type === "adjustprice")
            return e;
          if (priceMod.hasVariant(n)) {
            var o = $(e),
              r = priceMod.getVariantString(
                t,
                n.productVariationId,
                i,
                productId
              );
            o.data("variant-string", r),
              o.data("variant-product", n.productId),
              o.data("variant-id", n.productVariationId),
              o.data("variant-price", n.price),
              priceMod.variantOrdering.push(r);
            priceModAll[productId].variantOrdering.push(r);
          } else {
            var o = $(e);
            o.data("variant-price", n.price ?? 0);
            o.data("variant-string", `${t}_${n.value}`);
          }
          return e;
        },
        postingQueue: [],
        maxPostVariantRetries: 2,
        postVariant: function (e, t) {
          // Fired once per add-on, never again on a retry: a merchant listener that
          // preventDefaults it must not be able to strand the submit mid-retry.
          if (
            eventApi.beforeVariantPost({
              variant: e,
              callback: t,
              properties: { _apo_parent_order: priceMod.orderId },
            })
          )
            return;
          var payload = {
            quantity: e.quantity,
            id: e.variantId,
            properties: e.properties
              ? e.properties
              : { _apo_parent_order: priceMod.orderId },
          };
          // Retry transient failures (timeout, dropped connection, 429 throttle from
          // Shopify, 5xx). A slow network used to drop the add-on silently while the
          // main product was still added, so the order was never charged for it.
          function send(attempt) {
            return window.AP_POptions.$.post(
              "/cart/add.js",
              payload,
              function (res) {
                return (
                  spLog(res, "variant post complete", !0),
                  res && res.variant_id
                    ? void t()
                    : t(new Error("Was not added to cart"))
                );
              },
              "json"
            ).fail(function (xhr, status, error) {
              spLog({ xhr: xhr, status: status, error: error }, "variant post fail", !0);
              var responseJson = xhr && xhr.responseJSON;
              // 422 = Shopify rejected the variant itself (sold out, limit reached).
              // Retrying cannot help, so hand it back as customer facing right away.
              if (responseJson && 422 === responseJson.status)
                return t(responseJson, !0);
              if (attempt < priceMod.maxPostVariantRetries)
                return void setTimeout(function () {
                  send(attempt + 1);
                }, 500 * (attempt + 1));
              // Never report a transient failure as success: an empty errorThrown used to
              // arrive here as a falsy "error" and the add-on was dropped in silence.
              return void t(
                responseJson || new Error(error || "Add-on was not added to cart")
              );
            });
          }
          return void send(0);
        },
        // Drop the hidden properties[_apo_order] / properties[_apo_variant_*] inputs that
        // addToCart appended to the form. Left behind, the theme's own add to cart posts
        // them and the order looks like it has paid options while nothing was charged.
        removeBundleInputs: function () {
          priceMod.listInputAddBundle.forEach(function (name) {
            var input = $('[name="' + name + '"]');
            if (input.length > 0) input.remove();
          });
          priceMod.listInputAddBundle = [];
        },
        postVariants: function (e, t) {
          if (priceMod.postingQueue.length) {
            var n = priceMod.postingQueue.shift();
            priceMod.postVariant(n, function (n, i) {
              // An add-on that could not be added must abort the whole submit. Carrying on
              // adds the main product at its base price while the customer already saw the
              // add-on charge in the summary - order #4054 was exactly that.
              if (n) {
                spLog(n, "price variants: aborting add to cart", !0);
                priceMod.postingQueue = [];
                priceMod.removeBundleInputs();
                priceMod.removeLoadingAddCart(e && e.target);
                alert(
                  (i && n.description) ||
                    n.description ||
                    "We could not add the selected options to your cart. Please try again."
                );
                return void t(n);
              }
              priceMod.postVariants(e, t);
            });
          } else t();
        },
        postCartVariants: function (items, t) {
          fetch("/cart/add.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(items),
          })
            .then((e) => e.json())
            .then((e) => {
              t(e);
            })
            .catch((e) => {
              console.error("Error Avis: Add cart ", e);
            });
        },
        getVariantSubmissions: function (productId) {
          if (
            priceMod.options.skipPriceModIfVisible &&
            $(priceMod.options.skipPriceModIfVisible).is(":visible")
          )
            return null;
          var e = [];
          if (window.AP_POptions && window.AP_POptions.pos)
            for (var t in priceModAll[productId].activeVariants)
              e.push(priceModAll[productId].activeVariants[t]);
          else
            $.each(
              priceModAll[productId].variantOrdering.reverse(),
              function (t, n) {
                priceModAll[productId].activeVariants[n] &&
                  priceModAll[productId].activeVariants[n].isShow &&
                  e.push(priceModAll[productId].activeVariants[n]);
              }
            );
          return priceMod.alterVariantValues(e, productId);
        },
        checkUseAddchargeBundle: function (productId) {
          var e = [];
          let activeVariants = priceModAll[productId].activeVariants;
          for(let item in activeVariants)
          {
            if (activeVariants[item]?.isShow && (activeVariants[item]?.productId || activeVariants[item]?.price > 0))
            {
              e.push(activeVariants[item]);
            }
          }
          return e;
        },
        alterVariantValues: function (e, productId) {
          return (
            e &&
              e.length &&
              priceModAll[productId].variantSubmissionAlters.length &&
              $.each(
                priceModAll[productId].variantSubmissionAlters,
                function (t, n) {
                  (e = n(e)),
                    e ||
                      spLog(
                        n,
                        "priceMod: variantSubmissionAlter did not return any values",
                        !0
                      );
                }
              ),
            e
          );
        },
        listInputAddBundle: [],
        cartSection:
          document.querySelector("cart-notification") ||
          document.querySelector("cart-drawer"),
        addToCart: function (productId, e, t, n) {
          n = n
            ? priceMod.alterVariantValues(n, productId)
            : priceMod.getVariantSubmissions(productId);
          if (priceMod.isCloneButtonAddCart) {
            if (
              (e.preventDefault(),
              e.stopImmediatePropagation(),
              !$('[name="properties[_apo_order]"]').length)
            ) {
              if (n && n.length) {
                priceMod.listInputAddBundle.push("properties[_apo_order]");
                var i = $("<input />")
                  .attr("type", "hidden")
                  .attr("name", "properties[_apo_order]")
                  .val(priceMod.orderId);
                $(e.target).before(i);
              }
              for (var optionIndex in n) {
                priceMod.listInputAddBundle.push(
                  `properties[_apo_variant_${n[optionIndex].name}_${optionIndex}]`
                );
                var variant = $("<input />")
                  .attr("type", "hidden")
                  .attr(
                    "name",
                    `properties[_apo_variant_${n[optionIndex].name}_${optionIndex}]`
                  )
                  .val(
                    `${n[optionIndex].variantId} * ${n[optionIndex].quantity}`
                  );
                $(e.target).before(variant);
              }
            }
            let avisAddCartFormActive = priceMod.avisAddCartFormActive[0];
            let formButton = e.target.closest("form");
            if (formButton) avisAddCartFormActive = formButton;

            let formData = new FormData(avisAddCartFormActive);
            let mainItemCart = {
              id: !1,
              quantity: 1,
              properties: {},
            };
            let productId = false;
            formData.forEach((e, t) => {
              if (
                ("id" == t && (mainItemCart.id = parseInt(e)),
                "product_size" == t && (productId = parseInt(e)),
                "quantity" == t && (mainItemCart.quantity = parseInt(e)),
                t.indexOf("properties") > -1)
              ) {
                let property = t.replace("properties[", "").replace("]", "");
                mainItemCart.properties[property] = e;
              }
            });

            if (productId && !mainItemCart.id) {
              mainItemCart.id = productId;
            } else if (!mainItemCart.id) {
              let idSelector = document.querySelector(".product-variant-id");
              if (idSelector && idSelector.value)
                mainItemCart.id = idSelector.value;
            }

            let sections =
              priceMod.cartSection?.getSectionsToRender &&
              typeof priceMod.cartSection?.getSectionsToRender === "function"
                ? priceMod.cartSection
                    .getSectionsToRender()
                    .map((section) => section.id)
                : [];
            let sections_url = window.location.pathname;
            let paramCartInput = {
              items: [],
              sections: sections,
              sections_url: sections_url,
            };

            $.each(n, function (e, t) {
              paramCartInput.items.push({
                id: parseInt(t.variantId),
                quantity: mainItemCart.quantity * (t.quantity ?? 1),
                properties: {
                  _apo_parent_order: priceMod.orderId,
                  _apo_quantity: t.quantity ?? 1,
                  _apo_field_name: t.name,
                },
              });
            });
            paramCartInput.items.push(mainItemCart);
            var r = eventApi.beforeVariantsPost({
              variantValues: n,
              orderId: priceMod.orderId,
              callback: t,
            });
            return !r && priceMod.postCartVariants(paramCartInput, t);
          } else {
            if (!n || !n.length) return !0;
            if (
              (e.preventDefault(),
              e.stopImmediatePropagation(),
              !$('[name="properties[_apo_order]"]').length)
            ) {
              priceMod.listInputAddBundle.push("properties[_apo_order]");
              var i = $("<input />")
                .attr("type", "hidden")
                .attr("name", "properties[_apo_order]")
                .val(priceMod.orderId);
              $(e.target).before(i);
              for (var optionIndex in n) {
                priceMod.listInputAddBundle.push(
                  `properties[_apo_variant_${n[optionIndex].name}_${optionIndex}]`
                );
                var variant = $("<input />")
                  .attr("type", "hidden")
                  .attr(
                    "name",
                    `properties[_apo_variant_${n[optionIndex].name}_${optionIndex}]`
                  )
                  .val(n[optionIndex].variantId);
                $(e.target).before(variant);
              }
            }
            var o = $('[name="quantity"]').val() || 1;
            $.each(n, function (e, t) {
              t.quantity = (t.quantity ?? 1) * o;
            }),
              window.AP_POptions &&
                window.AP_POptions.pos &&
                $.each(n, function (e, t) {
                  t.containerId &&
                    (t.quantity = $(
                      '[data-product-options-container-id="' +
                        t.containerId +
                        '"]'
                    ).data("line-item-quantity"));
                });
            var r = eventApi.beforeVariantsPost({
              variantValues: n,
              orderId: priceMod.orderId,
              callback: t,
            });
            return (
              !r &&
              ((priceMod.postingQueue = n),
              priceMod.postVariants(e, function (e) {
                t && t(e);
              }),
              !1)
            );
          }
        },
        resetState: function () {
          (priceMod.orderId = new Date().getTime()),
            (priceMod.options = { appendPrice: !1, skipPriceModIfVisible: "" }),
            (priceMod.variantOrdering = []),
            (priceMod.variantSubmissionAlters = []),
            (priceMod.activeVariants = {});
        },
        buyItNow: function () {
          let textCustomizationCostFor = "Customization Cost for";
          try {
            textCustomizationCostFor =
              customizeryConfig && customizeryConfig.text_customization_cost_for
                ? customizeryConfig.text_customization_cost_for
                : "Customization Cost for";
          } catch (e) {
            textCustomizationCostFor = "Customization Cost for";
          }
          let options = [];
          if (
            customizeryConfig &&
            customizeryConfig.optionSets &&
            customizeryConfig.optionSets.length
          ) {
            customizeryConfig.optionSets.forEach((optionSetItem) => {
              if (optionSetItem.options)
                options = options.concat(optionSetItem.options);
            });
          }
        },
        init: function (e) {
          priceMod.resetState(), $.extend(priceMod.options, e);
        },
      },
      // 3. Init cart page
      cartData =
        window.ap_front_settings && window.ap_front_settings.cart
          ? window.ap_front_settings.cart
          : {};
    AvisOptionsConfig.priceMod = priceMod;
    var priceModCart = {
      isExistForm: false,
      form: null,
      // avisUrl: "http://localhost:8083/shopify/api/",
      avisUrl: "https://apo-api.avisplus.io/shopify/api/",
      avisConfig: {
        clsAvisTotalCart: "avisplus-cart-total",
        clsAvisOrgTotalCart: "avisplus-cart-original-total",
        clsAvisOrgLineCart: "avisplus-cart-item-line-price",
        clsAvisFinalLineCart: "avisplus-cart-item-final-line-price",
        clsAvisOrgCart: "avisplus-cart-item-original-price",
        clsAvisFinalCart: "avisplus-cart-item-final-price",
        clsAvisDiscountCart: "avisplus-cart-discount-price",
        clsAvisDiscountCartAdd: "avis_cart_discount_price",
        clsNewAvisDiscountCart: "new-avisplus-cart-discount-price",
      },
      avisFormCart:
        $('form[action="/cart"]') && $('form[action="/cart"]').length > 0
          ? $('form[action="/cart"]')
          : $('form[action$="/cart"]').length > 0
          ? $(`form[action="${$('form[action$="/cart"]').attr("action")}"]`)
          : $('form[action="/checkout"]'),
      cartItems: [],
      avisCartItems: [], // Cart has add charge of options (avisplus app)
      avisSubTotalPrice: 0,
      parentItems: {},
      variantItems: {},
      isReloadCartByAdd: false,
      isCartEmpty: true,
      avisCartJson: cartData,
      avisCartInput: { discountCode: "", cartJson: {} }, // Cart input for call discount
      // Setting discount
      avisDiscount: {
        avisIsRegitEvent: false,
        avisIsShowDiscountBox: true, // Default
        avisHasAutomaticDiscount: false,
        avisDiscountCode: "",
        avisDiscountPrice: 0,
        avisDiscountHtml:
          `<style>${
            customizeryConfig?.customize_discount_box_css ?? ""
          }</style>` +
          '\n          <div class="avis-discount">\n                <div class="avis-discount-action">\n                    <div class="avis-discount-active">\n                        <input placeholder="Discount code" class="avis-discount-input" type="text" name="reduction_code">\n                        <div class="avis-discount-apply avis-discount-apply-disable">Apply</div>\n                    </div>\n   <div class="avis-discount-error-info"></div>\n                 <div class="avis-discount-info">\n                        <div class="avis-discount-success-info" style="display: none;">\n                            <svg class="avis-svg-coupon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M17.78 3.09C17.45 2.443 16.778 2 16 2h-5.165c-.535 0-1.046.214-1.422.593l-6.82 6.89c0 .002 0 .003-.002.003-.245.253-.413.554-.5.874L.738 8.055c-.56-.953-.24-2.178.712-2.737L9.823.425C10.284.155 10.834.08 11.35.22l4.99 1.337c.755.203 1.293.814 1.44 1.533z" fill-opacity=".55"></path><path d="M10.835 2H16c1.105 0 2 .895 2 2v5.172c0 .53-.21 1.04-.586 1.414l-6.818 6.818c-.777.778-2.036.782-2.82.01l-5.166-5.1c-.786-.775-.794-2.04-.02-2.828.002 0 .003 0 .003-.002l6.82-6.89C9.79 2.214 10.3 2 10.835 2zM13.5 8c.828 0 1.5-.672 1.5-1.5S14.328 5 13.5 5 12 5.672 12 6.5 12.672 8 13.5 8z"></path></svg>\n                            <span class="avis-discount-success-code"></span>\n                            <svg class="avis-svg-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13"><path d="M1.5 1.5l10.05 10.05M11.5 1.5L1.45 11.55" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round"></path></svg>\n                        </div>\n                                            </div>\n                </div>\n                \n            </div>\n            <div style="clear: both;"></div>\n        ',
      },
      options: {
        appendPrice: !1,
        appendCount: !0,
        hideVariantRow: !1,
        disableVariantRow: !0,
      },
      tokenCart: "",
      getCart: function (e) {
        window.AP_POptions.$.getJSON("/cart.js", function (t) {
          e(t);
        }).fail(function (e, t, n) {
          console.log(n);
        });
      },
      getCartV2: async () =>
        fetch("/cart.json?avis=1")
          .then((t) => t.json())
          .then((t) => t),
      updateCart: (t, e) => {
        fetch("/cart/update.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(t),
        })
          .then((t) => t.json())
          .then((t) => {
            t && e();
          })
          .catch((t) => {
            console.error("Error:", t);
          });
      },
      changeCart: async (t) => {
        await fetch("/cart/change.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(t),
        })
          .then((t) => t.json())
          .then((t) => t)
          .catch((t) => {
            console.error("Error:", t);
          });
      },
      changesCart: async (t, e) => {
        for (let e = 0; e < t.length; e++) {
          const o = t[e];
          await priceModCart.changeCart(o);
        }
        e();
      },
      postUpdateCart: async function (data) {
        return new Promise((n, o) => {
          n(
            fetch("/cart/update.js", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ updates: data }),
            })
              .then((e) => e.json())
              .then((e) => {
                return {
                  res: e,
                };
                //location.reload();
              })
              .catch((e) => {
                console.error("Error Avis: Update cart ", e);
                return null;
              })
          );
        });
      },
      postChangeCart: async function (data) {
        return new Promise((n, o) => {
          n(
            fetch("/cart/change.js", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((e) => e.json())
              .then((e) => {
                console.log("res change cart:", e);
                return {
                  res: e,
                };
                //location.reload();
              })
              .catch((e) => {
                console.error("Error Avis: Update cart ", e);
                return null;
              })
          );
        });
      },
      postAddsCart: async function (data) {
        return new Promise((n, o) => {
          n(
            fetch("/cart/add.js", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((e) => e.json())
              .then((e) => {
                return {
                  res: e,
                  key: data.key,
                };
                //location.reload();
              })
              .catch((e) => {
                console.error("Error Avis: Add cart ", e);
                return null;
              })
          );
        });
        // void $.post(
        //   "/cart/add.js",
        //   { items: data },
        //   function (e) {
        //     location.reload();
        //     console.log("Add change OK");
        //   },
        //   "json"
        // ).fail(function () {
        //   console.log("Error Avis: Add cart");
        // });
      },
      postAddCart: async function (data) {
        return new Promise((n, o) => {
          n(
            fetch("/cart/add.js?avis=apo1", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ items: [data.item] }),
            })
              .then((e) => e.json())
              .then((e) => {
                return {
                  res: e,
                  key: data.key,
                };
                //location.reload();
              })
              .catch((e) => {
                console.error("Error Avis: Add cart ", e);
                return null;
              })
          );
        });
        // void $.post(
        //   "/cart/add.js",
        //   { items: data },
        //   function (e) {
        //     location.reload();
        //     console.log("Add change OK");
        //   },
        //   "json"
        // ).fail(function () {
        //   console.log("Error Avis: Add cart");
        // });
      },
      updateFromCart: function (e) {},
      buildCartModel: function () {},
      cartSubmitClick: function (e, t) {},
      bindCart: function () {},
      textTotalPriceCart: "",
      checkReloadCart: function () {
        let isReload = false;
        var textTotalPrice = $(`.${priceModCart.avisConfig.clsAvisTotalCart}`);
        var elemOrgTotalCart = $(
          `.${priceModCart.avisConfig.clsAvisOrgTotalCart}`
        );

        if (
          priceModCart.avisCartItems &&
          priceModCart.avisCartItems.length > 0
        ) {
          priceModCart.avisCartItems.forEach((e) => {
            if (e.avis_line_price_money) {
              let textPrice = $(
                `.${priceModCart.avisConfig.clsAvisOrgLineCart}[data-key='${e.key}']`
              );
              if (textPrice && textPrice.length > 0) {
                for (let i = 0; i < textPrice.length; i++) {
                  let textPriceView = textPrice[i].innerHTML;
                  let formatPrice = e.avis_line_price_money;
                  if (textPriceView != formatPrice) {
                    isReload = true;
                    break;
                  }
                }
              } else {
                let quantityKey = $("input[name='updates[]']");
                if (quantityKey && quantityKey.length) {
                  quantityKey.each(function (index) {
                    let attrId = $(this).attr("id");
                    if (attrId && attrId.indexOf(e.key) > -1) {
                      let linePrice = $(this)
                        .parents("tr")
                        .find("td.total div:last-child");
                      if (linePrice && linePrice.length > 0) {
                        let textPriceView = linePrice[0].innerHTML;
                        let formatPrice = e.avis_line_price_money;
                        if (textPriceView != formatPrice) {
                          isReload = true;
                        }
                      }
                    }
                  });
                }
              }
            }
          });

          if (priceModCart.avisSubTotalPrice != 0) {
            if (textTotalPrice && textTotalPrice.length) {
              for (let i = 0; i < textTotalPrice.length; i++) {
                if (
                  priceModCart.avisSubTotalPrice != textTotalPrice[i].innerHTML
                ) {
                  isReload = true;
                  break;
                }
              }
            } else {
              textTotalPrice = $(".cart__footer .cart__subtotal");
              if (textTotalPrice && textTotalPrice.length) {
                for (let i = 0; i < textTotalPrice.length; i++) {
                  if (
                    priceModCart.avisSubTotalPrice !=
                    textTotalPrice[i].innerHTML
                  ) {
                    isReload = true;
                    break;
                  }
                }
              }
            }
          }
        } else {
          if (!priceModCart.isCartEmpty) {
            isReload = true;
          }
        }

        if (
          !isReload &&
          elemOrgTotalCart &&
          elemOrgTotalCart.length > 0 &&
          priceModCart.avisOrgTotalPrice &&
          priceModCart.avisOrgTotalPrice != elemOrgTotalCart[0].innerHTML
        ) {
          isReload = true;
        }
        if (!isReload && UUID === "62586192103")
        {
          if (textTotalPrice.length > 0 && priceModCart.textTotalPriceCart !== textTotalPrice[0]?.innerText)
          {
            priceModCart.textTotalPriceCart = textTotalPrice[0]?.innerText;
            isReload = true;
          }
        }

        return isReload;
      },
      countReloadCart: 0,
      reloadCart: function () {
        priceModCart.isProcessReloadCart = true;
        let shop_id = window.ap_front_settings.shop_id;
        let oldTokenCart = localStorage.getItem(shop_id);
        let totalQuantityOfCart = 0;
        priceModCart.getCart(async function (response) {
          priceModCart.countReloadCart++;
          if (
            priceModCart.isReloadCartByAdd &&
            priceModCart.countReloadCart >= 5
          )
            priceModCart.isReloadCartByAdd = false;
          priceModCart.tokenCart = response.token;
          priceModCart.avisCartItems = [];
          let initialValue = 0;
          var oldTotalQuantity = priceModCart.avisCartItems.reduce(function (
            accumulator,
            curValue
          ) {
            return accumulator + curValue.quantity;
          },
          initialValue);

          // Remove token cart is invalid
          if (oldTokenCart && oldTokenCart !== priceModCart.tokenCart) {
            localStorage.removeItem(oldTokenCart);
          }

          localStorage.setItem(shop_id, priceModCart.tokenCart);
          let textCustomizationCostFor = "Customization Cost for";
          try {
            textCustomizationCostFor =
              customizeryConfig && customizeryConfig.text_customization_cost_for
                ? customizeryConfig.text_customization_cost_for
                : "Customization Cost for";
          } catch (e) {
            textCustomizationCostFor = "Customization Cost for";
          }

          let options = [];

          if (
            customizeryConfig &&
            customizeryConfig.optionSets &&
            customizeryConfig.optionSets.length
          ) {
            customizeryConfig.optionSets.forEach((optionSetItem) => {
              if (optionSetItem.options)
                options = options.concat(optionSetItem.options);
            });
          }

          let lineItemsCustom = [];
          let lineItemsPriceAdd = [];

          let totalCustomPrice = 0;
          let avisCartItems = [];
          priceModCart.avisCartInput.cartJson = {};
          priceModCart.avisCartInput.cartJson.avis_add_price = 0;
          priceModCart.avisCartInput.cartJson.items = [];
          priceModCart.avisCartJson = response;
          priceModCart.isCartEmpty =
            priceModCart.avisCartJson.items.length === 0;
          var indexItem = 0;

          var avisCartItemHasAddBundles = [];
          var avisCartItemProductBundles = [];
          priceModCart.avisCartJson.items.forEach(async (e) => {
            indexItem++;
            totalQuantityOfCart += e.quantity;

            // Price add charge of avisplus (Have * quantity)
            let customPrice = 0;
            // Price add charge of avisplus (Without * quantity)
            let priceAddChargeAvis = 0;
            let properties = [];

            /*Start: Price add from option avis */
            if (e.properties) {
              var avisOrder = {
                keyCartItem: e.key,
                avis_order: "",
                quantity: e.quantity,
                variant_bundles: [],
              };
              for (const property in e.properties) {
                let value = e.properties[property];
                if (property == "_apo_order") {
                  avisOrder.avis_order = value;
                }
                if (property.indexOf("_apo_variant_") != -1 && value) {
                  avisOrder.variant_bundles.push(value);
                }
                if (property == "_apo_parent_order") {
                  avisCartItemProductBundles.push({
                    avis_parent_order: value,
                    quantity: e.quantity,
                    line: indexItem,
                    key: e.key,
                    variantId: e.variant_id,
                  });
                }

                let tempPro = {
                  key: property,
                  value: value,
                };

                let customPr = null;
                let valuePropertyIncart = value;
                if (valuePropertyIncart && typeof value === "string") {
                  let isExist = false;
                  for (let valueItem of valuePropertyIncart.split("],")) {
                    if (valueItem) {
                      if (!valueItem.endsWith("]")) valueItem = valueItem + "]";
                      var placeholderRegex = /\[.*\]/;
                      let regex = valueItem.match(placeholderRegex);
                      if (regex) {
                        isExist = true;
                        let textMoney = regex[0].slice(1, -1);
                        let priceValue =
                          priceMod.convertMoneyToNumber(textMoney);
                        priceAddChargeAvis += parseFloat(priceValue * 100);
                        customPrice +=
                          parseFloat(priceValue * 100) * e.quantity;
                      }
                    }
                  }

                  if (isExist) {
                    customPr = {
                      key: `${property}`,
                      value: value,
                    };

                    properties.push(customPr);

                    lineItemsCustom.push({
                      title: `${textCustomizationCostFor} ${e.title}`,
                      // originalUnitPrice: price,
                      quantity: e.quantity,
                      requiresShipping: false,
                      customAttributes: [tempPro, customPr],
                    });
                  }
                }

                if (!customPr) {
                  properties.push(tempPro);
                }
              }
              if (avisOrder.variant_bundles.length > 0) {
                avisCartItemHasAddBundles.push(avisOrder);
              }
            }
            /*End: Price add from option avis */

            // Discount: Item cart
            let itemCart = {
              avis_add_price: customPrice,
              original_price: e.original_price,
              original_line_price: e.original_line_price,
              final_line_price: e.final_line_price,
              final_price: e.final_price,
              product_id: e.product_id,
              variant_id: e.variant_id,
              quantity: e.quantity,
              key: e.key,
            };
            priceModCart.avisCartInput.cartJson.items.push(itemCart);
            priceMod.discountMoney(
              priceModCart.avisCartInput.cartJson.total_price
            );
            priceModCart.avisCartInput.cartJson.non_fractional =
              priceMod.precisionPrice === 0; // if = 0 non-fractional currencies

            var originalPrice = e.original_price;
            var orignialLinePrice = e.original_line_price;
            var finalPrice = e.final_price;
            var finalLinePrice = e.final_line_price;

            if (shop_id === "58850902171") {
              finalPrice = e.discounted_price;
              finalLinePrice = e.line_price;
            }

            if (customPrice > -1) {
              lineItemsPriceAdd.push({
                cart_item_key: e.key,
                price_add: customPrice,
              });
              totalCustomPrice += customPrice;
              priceModCart.avisCartInput.cartJson.avis_add_price += customPrice;
              // + Price add charge of avis
              {
                let itemAddChargeAvis = priceAddChargeAvis; // Add charge
                let addChargeAvis = customPrice; // Add charge * quantity

                originalPrice += itemAddChargeAvis;
                orignialLinePrice += addChargeAvis;
                finalPrice += itemAddChargeAvis;
                finalLinePrice += addChargeAvis;
              }

              // Replace org price
              {
                let textOriginalPrice = $(
                  `.${priceModCart.avisConfig.clsAvisOrgCart}[data-key='${e.key}']`
                );
                if (textOriginalPrice && textOriginalPrice.length) {
                  let priceFormat = priceMod.formatMoney(originalPrice);
                  textOriginalPrice.html(priceFormat);
                }
              }

              // Replace org line price
              let orgLinepriceHasAddChargeHtml =
                priceMod.formatMoney(orignialLinePrice);
              {
                let orgLinePrice = $(
                  `.${priceModCart.avisConfig.clsAvisOrgLineCart}[data-key='${e.key}']`
                );

                try {
                  if (orgLinePrice && orgLinePrice.length > 0) {
                    orgLinePrice.html(orgLinepriceHasAddChargeHtml);
                    orgLinepriceHasAddChargeHtml = orgLinePrice[0].innerHTML;
                  } else {
                    let quantityKey = $("input[name='updates[]']");
                    if (quantityKey && quantityKey.length) {
                      quantityKey.each(function (index) {
                        let attrId = $(this).attr("id");
                        if (attrId && attrId.indexOf(e.key) > -1) {
                          let totalPriceItem = $(this)
                            .parents("tr")
                            .find("td.total div:last-child");
                          if (totalPriceItem && totalPriceItem.length > 0) {
                            totalPriceItem.html(orgLinepriceHasAddChargeHtml);
                            orgLinepriceHasAddChargeHtml =
                              totalPriceItem[0].innerHTML;
                          }
                        }
                      });
                    }
                  }
                } catch (e) {
                  console.log("AvisPlus log: ", e);
                }
              }

              // Add cart item include price charge of options
              avisCartItems.push({
                key: e.key,
                quantity: e.quantity,
                add_charge: customPrice,
                avis_line_price_money: orgLinepriceHasAddChargeHtml, // original_line_price + add_charge of options
              });
            }

            if (isShowCartDiscountConfig) {
              finalPrice = originalPrice;
              finalLinePrice = orignialLinePrice;
            }

            // Replace final price
            {
              let textFinalPrice = $(
                `.${priceModCart.avisConfig.clsAvisFinalCart}[data-key='${e.key}']`
              );
              if (textFinalPrice && textFinalPrice.length) {
                let format = priceMod.formatMoney(finalPrice);
                textFinalPrice.html(format);
              }
            }

            // Replace final line price
            {
              let textFinalLinePrice = $(
                `.${priceModCart.avisConfig.clsAvisFinalLineCart}[data-key='${e.key}']`
              );
              if (textFinalLinePrice && textFinalLinePrice.length) {
                let format = priceMod.formatMoney(finalLinePrice);
                textFinalLinePrice.html(format);
              }
            }

            if (indexItem === priceModCart.avisCartJson.items.length) {
              if (!priceModCart.isReloadCartByAdd) {
                var productBundleNeedUpdates = [];
                var productBundleNeedAdds = [];

                var cloneAvisCartItemProductBundles = [
                  ...avisCartItemProductBundles,
                ];
                for (var avisCartItemHasAddBundle of avisCartItemHasAddBundles) {
                  var itemHasAddBundle = avisCartItemHasAddBundle;
                  var itemProductBundles = avisCartItemProductBundles.filter(
                    (x) => itemHasAddBundle.avis_order == x.avis_parent_order
                  );

                  var variantBundles = itemHasAddBundle.variant_bundles;
                  if (itemProductBundles && itemProductBundles.length > 0) {
                    for (var itemProductBundle of itemProductBundles) {
                      var currentItemProductBundle = itemProductBundle;

                      let findVariantBundles = variantBundles.filter(
                        (x) =>
                          x.indexOf(currentItemProductBundle.variantId) > -1
                      );

                      let totalVariant = 0;
                      for (let variant of findVariantBundles) {
                        let arrVariant = variant.split(" * ");
                        totalVariant +=
                          arrVariant.length > 1 ? parseInt(arrVariant[1]) : 1;
                      }

                      variantBundles = variantBundles.filter(
                        (x) =>
                          x.indexOf(currentItemProductBundle.variantId) == -1
                      );

                      cloneAvisCartItemProductBundles = [
                        ...cloneAvisCartItemProductBundles.filter(
                          (e) =>
                            !(
                              e.avis_parent_order ==
                                currentItemProductBundle.avis_parent_order &&
                              e.variantId == currentItemProductBundle.variantId
                            )
                        ),
                      ];

                      if (
                        currentItemProductBundle.quantity !=
                        itemHasAddBundle.quantity * totalVariant
                      ) {
                        productBundleNeedUpdates.push({
                          key: currentItemProductBundle.key,
                          quantity: itemHasAddBundle.quantity * totalVariant,
                        });
                      }
                    }
                  }

                  if (variantBundles && variantBundles.length > 0) {
                    for (var variantBundle of variantBundles) {
                      let arrVariant = variantBundle.split(" * ");
                      let quantityVariant =
                        arrVariant.length > 1 ? parseInt(arrVariant[1]) : 1;
                      let productBundleExist = productBundleNeedAdds.filter(
                        (x) =>
                          x.key == itemHasAddBundle.keyCartItem &&
                          x.item.id == arrVariant[0]
                      );
                      if (productBundleExist.length > 0) {
                        productBundleExist.quantity +=
                          itemHasAddBundle.quantity * quantityVariant;
                      } else {
                        productBundleNeedAdds.push({
                          key: itemHasAddBundle.keyCartItem,
                          item: {
                            id: arrVariant[0],
                            quantity:
                              itemHasAddBundle.quantity * quantityVariant,
                            properties: {
                              _apo_parent_order: itemHasAddBundle.avis_order,
                            },
                          },
                        });
                      }
                    }
                  }
                }
                // Remove product bundle when org product not exist (Check by _apo_order)
                if (
                  cloneAvisCartItemProductBundles &&
                  cloneAvisCartItemProductBundles.length > 0
                ) {
                  for (var cloneAvisCartItemProductBundle of cloneAvisCartItemProductBundles) {
                    productBundleNeedUpdates.push({
                      key: cloneAvisCartItemProductBundle.key,
                      quantity: 0,
                    });
                  }
                }

                let postDataCart = [];

                if (
                  productBundleNeedUpdates &&
                  productBundleNeedUpdates.length > 0
                ) {
                  var dataUpdates = {};
                  for (var productBundleNeedUpdate of productBundleNeedUpdates) {
                    dataUpdates[productBundleNeedUpdate.key] =
                      productBundleNeedUpdate.quantity;
                  }

                  postDataCart.push(priceModCart.postUpdateCart(dataUpdates));
                }

                if (productBundleNeedAdds && productBundleNeedAdds.length > 0) {
                  for (let item of productBundleNeedAdds) {
                    postDataCart.push(priceModCart.postAddCart(item));
                  }
                }
                if (postDataCart.length > 0) {
                  await Promise.all(postDataCart).then((values) => {
                    priceModCart.isProcessReloadCart = false;
                    if (
                      values.filter(
                        (x) =>
                          x.res &&
                          (!x.res.status ||
                            (x.res.status != "bad_request" &&
                              x.res.status != "too_many_requests" &&
                              x.res.status != 404 &&
                              x.res.status != 422))
                      ).length > 0
                    ) {
                      //location.reload();
                    } else {
                      console.log("Post cart list product bundle", values);
                    }
                  });
                } else {
                  priceModCart.isProcessReloadCart = false;
                }
              } else {
                priceModCart.isProcessReloadCart = false;
              }

              // Set for input calculate discount
              priceModCart.avisCartInput.cartJson.total_price =
                response.total_price;
              priceModCart.avisCartInput.cartJson.total_discount =
                response.total_discount;
              priceModCart.avisCartInput.cartJson.original_total_price =
                response.original_total_price;

              if (
                priceModCart.isReloadCartByAdd &&
                totalQuantityOfCart > oldTotalQuantity
              ) {
                priceModCart.isReloadCartByAdd = false;
              }

              priceModCart.avisCartItems = avisCartItems;
              var totalCart = response.total_price;
              var totalSubCart = response.original_total_price;
              if (totalCustomPrice > 0) {
                var totalAddCharge = totalCustomPrice; // * 100;
                totalCart += totalAddCharge;
                totalSubCart += totalAddCharge;

                /*Start: Textbox price add of avis option*/
                {
                  if (
                    priceModCart.avisFormCart &&
                    priceModCart.avisFormCart.length > 0
                  ) {
                    var inputPriceAdd = $('input[name="avisplus-price-add"]');
                    var jsonPriceAdd = JSON.stringify(lineItemsPriceAdd);
                    if (inputPriceAdd && inputPriceAdd.length) {
                      inputPriceAdd.val(jsonPriceAdd);
                    } else {
                      priceModCart.avisFormCart.append(
                        `<input type="hidden" name="avisplus-price-add" value=${jsonPriceAdd} />`
                      );
                    }
                  }
                }
                /*End: Textbox price add of avis option*/
              }

              // Replace total price
              let formatPrice = priceMod.formatMoney(totalCart);
              let newAvisSubTotalPrice = formatPrice;
              {
                var textTotalPrice = $(
                  `.${priceModCart.avisConfig.clsAvisTotalCart}`
                );
                if (textTotalPrice && textTotalPrice.length > 0) {
                  textTotalPrice.html(formatPrice);
                  newAvisSubTotalPrice = textTotalPrice[0].innerHTML;
                } else {
                  textTotalPrice = $(".cart__footer .cart__subtotal");
                  if (textTotalPrice && textTotalPrice.length > 0) {
                    textTotalPrice.html(formatPrice);
                    newAvisSubTotalPrice = textTotalPrice[0].innerHTML;
                  }
                }
                priceModCart.avisSubTotalPrice = newAvisSubTotalPrice;
              }

              /*Start: Replace org total price*/
              {
                let formatOrgTotalPrice = priceMod.formatMoney(totalSubCart);
                var textOrgTotalPrice = $(
                  `.${priceModCart.avisConfig.clsAvisOrgTotalCart}`
                );
                if (textOrgTotalPrice && textOrgTotalPrice.length > 0) {
                  textOrgTotalPrice.html(formatOrgTotalPrice);
                  priceModCart.avisOrgTotalPrice =
                    textOrgTotalPrice[0].innerHTML;
                }
              }
              /*End: Replace org total price*/

              if (isShowCartDiscountConfig) {
                // Get automation
                priceModCart.avisCartInput.shop_id = shop_id;
                priceModCart.avisCartInput.cart_collections =
                  window.ap_front_settings.cart_collections;

                let checkoutButton =
                  document.querySelectorAll(checkout_selectors);
                if (checkoutButton && checkoutButton.length > 0) {
                  checkoutButton.forEach((e) => {
                    e.setAttribute("disabled", "disabled");
                  });
                }
                $.post(`${priceModCart.avisUrl}auto-discount`, {
                  data: JSON.stringify(priceModCart.avisCartInput),
                })
                  .done(function (res) {
                    if (res.new_total_discount > 0) {
                      var avisDiscountPrice =
                        res.total_price - res.new_total_discount;
                      let totalPriceCartHtml = $(
                        `.${priceModCart.avisConfig.clsAvisTotalCart}`
                      );
                      let formatTotalCart = priceMod.formatMoney(totalSubCart);
                      if (totalPriceCartHtml && totalPriceCartHtml.length > 0) {
                        totalPriceCartHtml.html(formatTotalCart);
                        priceModCart.avisSubTotalPrice =
                          totalPriceCartHtml[0].innerHTML;
                        let totalPriceHasDiscount =
                          priceMod.formatMoney(avisDiscountPrice);
                        totalPriceCartHtml.addClass("avis-text-decoration");
                        totalPriceCartHtml
                          .next()
                          .hasClass(
                            priceModCart.avisConfig.clsAvisDiscountCartAdd
                          )
                          ? totalPriceCartHtml
                              .next()
                              .html(totalPriceHasDiscount)
                          : totalPriceCartHtml.after(
                              `\n                                        <span class="${priceModCart.avisConfig.clsAvisDiscountCartAdd}">\n                                            ${totalPriceHasDiscount}\n                                        </span>\n                                    `
                            );
                      }

                      // Hide automation discount of theme
                      let autoDiscountTheme = $(
                        `.${priceModCart.avisConfig.clsAvisDiscountCart}`
                      );
                      if (autoDiscountTheme && autoDiscountTheme.length > 0) {
                        let totalAutoDiscount = document.querySelector(
                          `.${priceModCart.avisConfig.clsAvisDiscountCart}`
                        );
                        if (totalAutoDiscount) {
                          let avisTotalAutoDiscount =
                            totalAutoDiscount.cloneNode(true);
                          avisTotalAutoDiscount.classList.add(
                            priceModCart.avisConfig.clsNewAvisDiscountCart
                          );
                          avisTotalAutoDiscount.innerHTML =
                            priceMod.formatMoney(res.new_total_discount);
                          totalAutoDiscount.parentNode.insertBefore(
                            avisTotalAutoDiscount,
                            totalAutoDiscount
                          );
                        }
                        autoDiscountTheme.addClass("avis-hide");
                      }
                    }

                    priceModCart.buildDiscountDom(res.new_total_discount > 0);
                  })
                  .fail(function (e) {
                    // Remove hide automation discount of theme
                    {
                      let autoDiscountTheme = $(
                        `.${priceModCart.avisConfig.clsAvisDiscountCart}`
                      );
                      if (
                        autoDiscountTheme &&
                        autoDiscountTheme.length > 0 &&
                        autoDiscountTheme.hasClass("avis-hide")
                      ) {
                        autoDiscountTheme.removeClass("avis-hide");
                      }

                      let avisAutoDiscountTheme = $(
                        `.${priceModCart.avisConfig.clsNewAvisDiscountCart}`
                      );
                      if (
                        avisAutoDiscountTheme &&
                        avisAutoDiscountTheme.length > 0
                      ) {
                        avisAutoDiscountTheme.remove();
                      }
                    }
                    if (
                      e.responseJSON &&
                      e.responseJSON.error &&
                      e.responseJSON.error.message === "invalid_discount"
                    ) {
                      priceModCart.buildDiscountDom(false);
                    } else {
                      if (
                        response.cart_level_discount_applications &&
                        response.cart_level_discount_applications.filter(
                          (x) => x.type === "discount_code"
                        ).length > 0
                      ) {
                        priceModCart.buildDiscountDom(false);
                      } else {
                        priceModCart.buildDiscountDom(
                          response.total_discount > 0
                        );
                      }
                    }
                  });

                // Hide discount if has automation discount in cart items of theme
                {
                  var nextDiscount = $(".avisplus-next-hide");
                  if (nextDiscount && nextDiscount.length > 0) {
                    var hideOrgs = nextDiscount
                      .next()
                      .find(`.${priceModCart.avisConfig.clsAvisOrgLineCart}`);
                    if (hideOrgs && hideOrgs.length > 0)
                      hideOrgs.addClass("avis-hide");
                  }
                  var orgHasDiscount = $(".avisplus-cart-original-hide");
                  if (orgHasDiscount && orgHasDiscount.length > 0) {
                    orgHasDiscount.addClass("avis-hide");
                  }

                  var itemTitleAutoDiscount = $(".discounts__discount");
                  if (
                    itemTitleAutoDiscount &&
                    itemTitleAutoDiscount.length > 0
                  ) {
                    itemTitleAutoDiscount.addClass("avis-hide");
                  }
                }
              }

              if (lineItemsCustom.length > 0 && indexReloadCart === 0) {
                indexReloadCart = 1;
                window.onclick = function (t) {
                  if (t.target.matches(checkout_selectors)) {
                    t.preventDefault();
                    t.target.classList.add("apo-loading");

                    if (typeof actionCheckout !== "function") {
                      window.location = "/checkout";
                      return;
                    }

                    if (typeof checkoutClick === "undefined") {
                      actionCheckout(t.target);
                    } else {
                      var i = checkoutClick();
                      if (i === 1) {
                        actionCheckout(t.target);
                      } else if (i !== 0) {
                        actionCheckout(t.target);
                      }
                    }
                  }
                };
                // $(document).on("click", checkout_selectors, function (t) {
                //   if (
                //     (t.preventDefault(),
                //     "function" != typeof actionCheckout &&
                //       (window.location = "/checkout"),
                //     "undefined" == typeof checkoutClick)
                //   )
                //     actionCheckout();
                //   else {
                //     var i = checkoutClick();
                //     1 == i ? actionCheckout() : 0 != i && actionCheckout();
                //   }
                // });
              }
            }
          });

          if (priceModCart.avisCartJson.items.length == 0) {
            priceModCart.isProcessReloadCart = false;
          }
        });

        // Replace cart error message
        if (isShowCartDiscountConfig) {
          setInterval(() => {
            priceModCart.removeCartErrorMessage();
          }, 100);
        }

        return priceModCart;
      },
      buildDiscountDom: function (hasAutomationDiscount) {
        if (!isShowCartDiscountConfig) {
          let checkoutButton = document.querySelectorAll(checkout_selectors);
          if (checkoutButton && checkoutButton.length > 0) {
            checkoutButton.forEach((e) => {
              e.removeAttribute("disabled");
            });
          }
          return;
        }

        var avisModCart = priceModCart;
        var clsDisBox = "avis-discount-box"; // Setting in theme
        var elementDisBox = $(`.${clsDisBox}`);
        avisModCart.avisDiscount.avisHasAutomaticDiscount =
          hasAutomationDiscount;
        avisModCart.avisDiscount.avisIsShowDiscountBox =
          !avisModCart.avisDiscount.avisHasAutomaticDiscount;

        var avisDiscount = $(".avis-discount");
        if (priceModCart.avisDiscount.avisIsShowDiscountBox) {
          if (avisDiscount && avisDiscount.length <= 0) {
            if (elementDisBox && elementDisBox.length > 0)
              elementDisBox.length > 1
                ? elementDisBox
                    .first()
                    .before(priceModCart.avisDiscount.avisDiscountHtml)
                : elementDisBox.before(
                    priceModCart.avisDiscount.avisDiscountHtml
                  );
            else {
              var elementBefore = null;
              priceModCart.avisFormCart.children().each(function () {
                $(this).find(priceModCart.avisConfig.clsAvisTotalCart).length >
                  0 && (elementBefore = $(this));
              }),
                null == elementBefore &&
                  (elementBefore = $(priceModCart.avisFormCart)
                    .children()
                    .last()),
                elementBefore &&
                  elementBefore.before(
                    priceModCart.avisDiscount.avisDiscountHtml
                  );
            }
          } else {
            let checkoutButton = document.querySelectorAll(checkout_selectors);
            if (checkoutButton && checkoutButton.length > 0) {
              checkoutButton.forEach((e) => {
                e.removeAttribute("disabled");
              });
            }
          }

          priceModCart.registerDiscountCodeEvent();
        } else {
          let checkoutButton = document.querySelectorAll(checkout_selectors);
          if (checkoutButton && checkoutButton.length > 0) {
            checkoutButton.forEach((e) => {
              e.removeAttribute("disabled");
            });
          }
          if (avisDiscount && avisDiscount.length > 0) {
            avisDiscount.remove();
          }
        }
        return priceModCart;
      },
      registerDiscountCodeEvent: function () {
        if (
          priceModCart.avisDiscount.avisIsShowDiscountBox &&
          priceModCart.avisDiscount.avisIsRegitEvent &&
          priceModCart.avisDiscount.avisDiscountCode
        ) {
          console.log("Reload Calculate discount");
          var discountBox = $(".avis-discount");
          discountBox.find(".avis-discount-apply").trigger("click");
          return;
        }
        return (
          priceModCart.avisDiscount.avisIsShowDiscountBox &&
            !priceModCart.avisDiscount.avisIsRegitEvent &&
            (priceModCart.avisDiscount.avisIsRegitEvent = true),
          ($(document).on("keyup", ".avis-discount-input", function (t) {
            var inputDiscount = $(this);
            $(".avis-discount").each(function () {
              $(this).find(".avis-discount-error-info").html(""),
                $(this).find(".avis-discount-input").val(inputDiscount.val()),
                $(this)
                  .find(".avis-discount-input")
                  .removeClass("avis-discount-input-error"),
                inputDiscount.val()
                  ? $(this)
                      .find(".avis-discount-apply")
                      .removeClass("avis-discount-apply-disable")
                  : $(this)
                      .find(".avis-discount-apply")
                      .addClass("avis-discount-apply-disable");
            });
          }),
          // Enter when input discount code
          $(document).on("keydown", ".avis-discount-input", function (event) {
            var discountBox = $(this).parents(".avis-discount");
            if (13 == event.keyCode)
              return (
                discountBox.find(".avis-discount-apply").trigger("click"),
                event.preventDefault()
              );
            else {
              let checkoutButton =
                document.querySelectorAll(checkout_selectors);
              if (checkoutButton && checkoutButton.length > 0) {
                checkoutButton.forEach((e) => {
                  e.removeAttribute("disabled");
                });
              }
            }
          }),
          // Click apply
          $(document).on("click", ".avis-discount-apply", function () {
            let checkoutButton = document.querySelectorAll(checkout_selectors);
            if (checkoutButton && checkoutButton.length > 0) {
              checkoutButton.forEach((e) => {
                e.setAttribute("disabled", "disabled");
              });
            }
            var discountApply = $(this),
              discountBox = $(this).parents(".avis-discount");
            var discountCodeInput = discountBox
              .find(".avis-discount-input")
              .val();

            var isDiscountLocal = false;
            var discountLocal = localStorage.getItem(priceModCart.tokenCart);
            if (
              (!discountCodeInput && discountLocal) ||
              (discountCodeInput == discountLocal && discountLocal)
            ) {
              isDiscountLocal = true;
              discountCodeInput = discountLocal;
            }
            if (
              discountApply.hasClass("avis-btn-progress") ||
              "" == discountCodeInput
            ) {
              if (checkoutButton && checkoutButton.length > 0) {
                checkoutButton.forEach((e) => {
                  e.removeAttribute("disabled");
                });
              }
              return;
            }

            discountApply.addClass("avis-btn-progress"),
              (priceModCart.avisCartInput.cart_collections =
                window.ap_front_settings.cart_collections),
              (priceModCart.avisCartInput.discountCode = discountCodeInput),
              (priceModCart.avisCartInput.shop_id =
                window.ap_front_settings.shop_id),
              $.ajax({
                type: "GET",
                url: `https://${window.location.host}/discount/${priceModCart.avisCartInput.discountCode}`,
              }),
              $.post(`${priceModCart.avisUrl}discount`, {
                data: JSON.stringify(priceModCart.avisCartInput),
              })
                .done(function (response) {
                  $(".avis-discount").each(function () {
                    $(this).find(".avis-discount-success-info").show(),
                      $(this)
                        .find(".avis-discount-success-code")
                        .html(priceModCart.avisCartInput.discountCode);

                    $(this).find(".avis-discount-error-info").html(""),
                      $(this)
                        .find(".avis-discount-input")
                        .removeClass("avis-discount-input-error");
                  }),
                    discountApply.removeClass("avis-btn-progress"),
                    (priceModCart.avisDiscount.avisDiscountCode =
                      priceModCart.avisCartInput.discountCode),
                    localStorage.setItem(
                      priceModCart.tokenCart,
                      priceModCart.avisDiscount.avisDiscountCode
                    ),
                    (priceModCart.avisDiscount.avisDiscountPrice =
                      response.total_price -
                      priceMod.discountMoney(response.new_total_discount));
                  let totalPriceCartHtml = $(
                    `.${priceModCart.avisConfig.clsAvisTotalCart}`
                  );
                  let formatTotalCart = priceMod.formatMoney(
                    response.total_price
                  );
                  if (totalPriceCartHtml && totalPriceCartHtml.length > 0) {
                    let totalPriceHasDiscount = priceMod.formatMoney(
                      priceModCart.avisDiscount.avisDiscountPrice
                    );
                    totalPriceCartHtml.html(formatTotalCart);
                    priceModCart.avisSubTotalPrice =
                      totalPriceCartHtml[0].innerHTML;
                    totalPriceCartHtml.addClass("avis-text-decoration");
                    totalPriceCartHtml
                      .next()
                      .hasClass(priceModCart.avisConfig.clsAvisDiscountCartAdd)
                      ? totalPriceCartHtml.next().html(totalPriceHasDiscount)
                      : totalPriceCartHtml.after(
                          `\n                                        <span class="${priceModCart.avisConfig.clsAvisDiscountCartAdd}">\n                                            ${totalPriceHasDiscount}\n                                        </span>\n                                    `
                        );
                  }

                  priceModCart.resetDiscountInput();

                  if (checkoutButton && checkoutButton.length > 0) {
                    checkoutButton.forEach((e) => {
                      e.removeAttribute("disabled");
                    });
                  }
                })
                .fail(function (e) {
                  var messageInvalidInCart = `<b>${(
                    discountCodeInput ?? ""
                  ).toUpperCase()}</b> discount code isn’t valid for the items in your cart`;

                  if (isDiscountLocal) {
                    priceModCart.avisDiscount.avisDiscountPrice = 0;
                    priceModCart.avisDiscount.avisDiscountCode = "";
                    localStorage.removeItem(priceModCart.tokenCart);
                    priceModCart.resetDiscountInput(true);

                    let totalPriceCartHtml = $(
                      `.${priceModCart.avisConfig.clsAvisTotalCart}`
                    );
                    if (totalPriceCartHtml.length > 0) {
                      totalPriceCartHtml
                        .removeClass("avis-text-decoration")
                        .next(
                          `.${priceModCart.avisConfig.clsAvisDiscountCartAdd}`
                        )
                        .remove();
                    }
                  } else if (
                    e.responseJSON &&
                    e.responseJSON.error.message === "expired_discount"
                  ) {
                    priceModCart.resetDiscountInput(false);
                  }

                  $(".avis-discount").each(function () {
                    $(this)
                      .find(".avis-discount-input")
                      .addClass("avis-discount-input-error"),
                      $(this)
                        .find(".avis-discount-error-info")
                        .html(
                          e.responseJSON &&
                            e.responseJSON.error.message === "expired_discount"
                            ? messageInvalidInCart
                            : "Enter a valid discount code"
                        );
                  }),
                    discountApply.removeClass("avis-btn-progress");

                  if (checkoutButton && checkoutButton.length > 0) {
                    checkoutButton.forEach((e) => {
                      e.removeAttribute("disabled");
                    });
                  }
                });
          }),
          $(document).on("click", ".avis-svg-close", function () {
            $(".avis-discount").each(function () {
              $(this).find(".avis-discount-input").val("").trigger("keyup"),
                $(this).find(".avis-discount-success-info").hide();
            }),
              $.ajax({
                type: "GET",
                url: `https://${window.location.host}/discount/avis`,
              }),
              (priceModCart.avisCartInput.discountCode = ""),
              (priceModCart.avisDiscount.avisDiscountPrice = 0),
              (priceModCart.avisDiscount.avisDiscountCode = "");
            localStorage.removeItem(priceModCart.tokenCart);
            let totalPriceCartHtml = $(
              `.${priceModCart.avisConfig.clsAvisTotalCart}`
            );
            if (totalPriceCartHtml.length > 0) {
              totalPriceCartHtml
                .removeClass("avis-text-decoration")
                .next(`.${priceModCart.avisConfig.clsAvisDiscountCartAdd}`)
                .remove();
            }
          })),
          priceModCart.setDiscountLocalStorage()
        );
      },
      resetDiscountInput: function (hideDiscountSuccess) {
        $(".avis-discount").each(function () {
          $(this).find(".avis-discount-input").val("").trigger("keyup");
          if (hideDiscountSuccess)
            $(this).find(".avis-discount-success-info").hide();
        });
      },
      getDiscountLocalStorage: function () {
        var discountCode = localStorage.getItem(priceModCart.tokenCart);
        if (
          discountCode &&
          !priceModCart.avisDiscount.avisHasAutomaticDiscount &&
          priceModCart.avisDiscount.avisDiscountCode
        ) {
          return discountCode ? discountCode : "";
        } else {
          localStorage.removeItem(priceModCart.tokenCart);
        }

        return "";
      },
      setDiscountLocalStorage: function () {
        var discountCodeLocal = localStorage.getItem(priceModCart.tokenCart);
        if (discountCodeLocal) {
          $(".avis-discount-apply").trigger("click");
        } else {
          let checkoutButton = document.querySelectorAll(checkout_selectors);
          if (checkoutButton && checkoutButton.length > 0) {
            checkoutButton.forEach((e) => {
              e.removeAttribute("disabled");
            });
          }
        }
      },
      removeCartErrorMessage: function () {
        // Replace cart error message
        var idCartErrorMessage = window.ap_front_settings?.custom_cart_error_id;

        var elementCartErrorMessage = $("#cart-errors");
        if (elementCartErrorMessage && elementCartErrorMessage.length > 0) {
          elementCartErrorMessage.html("");
        }
        if (idCartErrorMessage) {
          elementCartErrorMessage = $(`#{idCartErrorMessage}`);
          if (elementCartErrorMessage && elementCartErrorMessage.length > 0) {
            elementCartErrorMessage.html("");
          }
        }
      },
      origOpen: "cart",
      isProcessReloadCart: false,
      init: function (e) {
        priceModCart.options.appendPrice = true;
        // Add collections of product to cart collections (Add product in cart slider (None load page cart))
        // if (window.ap_front_settings.product_info.collections.length > 0) {
        //   for (var clectItem of window.ap_front_settings.product_info
        //     .collections) {
        //     window.ap_front_settings.cart_collections.push({
        //       product_id: window.ap_front_settings.product_info.product_id,
        //       collection_id: clectItem,
        //     });
        //   }
        // }

        if (!priceMod.isCloneButtonAddCart) {
          priceModCart.reloadCart();

          setInterval(function () {
            if (
              priceModCart.checkReloadCart() ||
              priceModCart.isReloadCartByAdd
            ) {
              if (!priceModCart.isProcessReloadCart) priceModCart.reloadCart();
            }
          }, 500);
        }
      },
    };
    !window.Handlebars ||
      !window.Handlebars.registerHelper ||
      "containsIn" in Handlebars.helpers ||
      Handlebars.registerHelper("containsIn", function (e, t) {
        return e.indexOf(t) !== -1;
      });
    function conditionalLogicFactory(e) {
      var t = this;
      (t.active = !1),
        (t.isPreview = !1),
        (t.watching = {}),
        (t.reactions = {}),
        (t.timers = { running: { Change: 0, React: 0 } }),
        (t.intervals = []);
      function n(e, n, i) {
        spLog(e, n, i || !0),
          t.isPreview && ((n = "AvisPlus Options preview: " + n), alert(n));
      }
      /**
       * Show and hide fade over 100ms and only finish their work in the animation callback. The
       * `hidden` flag used to flip inside that callback, so a rule re-evaluated while the fade was
       * still running (rapid clicks, or a chain of rules reacting on its own 50ms debounce) read the
       * state the field was leaving, decided there was nothing to do, and left the field on the wrong
       * side for good - it only recovered if something happened to run that rule again. The flag is
       * therefore published as soon as a transition starts, on the reaction and on the watch entry
       * that mirrors it, so every later decision sees where the field is actually heading.
       */
      function markReactionHidden(elemOptionAvisContainer, productId, n, hidden) {
        (n.hidden = hidden),
          t.watching[n.name] &&
            ((t.watching[n.name].hidden = hidden),
            l_change(elemOptionAvisContainer, productId, t.watching[n.name], 0));
      }
      /**
       * Claims the field for the transition being started and returns a check telling a pending
       * animation callback whether it is still the current one. Without it a superseded fade would
       * still run its DOM work - disabling inputs and stripping their name, or restoring them - on top
       * of the transition that replaced it.
       */
      function claimTransition(n) {
        var token = (n.transitionToken = (n.transitionToken || 0) + 1);
        return function () {
          return n.transitionToken === token;
        };
      }
      function i_fieldHide(elemOptionAvisContainer, productId, n) {
        let avisAddCartFormActive = priceMod.avisAddCartFormActive;
        let formAddToCart = getFormAddToCart(elemOptionAvisContainer);
        if (formAddToCart) {
          avisAddCartFormActive = $(formAddToCart);
        }
        var isCurrentTransition = claimTransition(n);

        function hideControl(elm) {
          if (!isCurrentTransition()) return;
          if (["10113292","450822199"].includes(window.ap_front_settings.shop_id))
          {
            let clss = 'input:not([type="checkbox"]:not([avp-data="switch"])):not([disabled]),select:not([disabled]),textarea:not([disabled]),fieldset:not([disabled]),span[data-required]:not([disabled])';
            n.$input[0].querySelectorAll(clss).forEach(x => {
              avisAddCartFormActive
                  .find(`input[name="properties[${x.getAttribute("field-name")}]"]`)
                  .attr({
                    disabled: "disabled",
                    "name-disabled": `properties[${x.getAttribute("field-name")}]`,
                  })
                  .removeAttr("name");
                x.setAttribute("disabled","disabled");
                x.setAttribute("name-disabled",x.getAttribute("name"));
                x.removeAttribute("name");
                isUpdateButtonAddCart = true;
            }),
            n.$input[0].style.setProperty("display", "none", "important");
          }
          else
          {
            e(
              'input:not([type="checkbox"]:not([avp-data="switch"])),select,textarea,fieldset, span[data-required]',
              n.$input
            )
              .not("[disabled]")
              .each(function () {
                avisAddCartFormActive
                  .find(`input[name="properties[${e(this).attr("field-name")}]"]`)
                  .attr({
                    disabled: "disabled",
                    "name-disabled": `properties[${e(this).attr("field-name")}]`,
                  })
                  .removeAttr("name");
                e(this)
                  .attr({
                    disabled: "disabled",
                    "name-disabled": e(this).attr("name"),
                  })
                  .removeAttr("name");
                isUpdateButtonAddCart = true;
              }),
              n.$input[0].style.setProperty("display", "none", "important");
          }
          

          // n.hidden is published by markReactionHidden below, when the transition starts.
          eventApi.fieldHide(
            { reaction: n },
            elemOptionAvisContainer,
            productId
          );
        }
        spLog(n, "conditional logic: hiding", !0),
          n.$input.attr({ disabled: "disabled" }),
          markReactionHidden(elemOptionAvisContainer, productId, n, !0),
          // Drop a fade left over from a transition this one supersedes, so the two do not run back
          // to back on the same element.
          n.$input.stop && n.$input.stop(!0),
          n.$input.fadeTo
            ? n.$input
                .fadeTo(100, 0, function () {
                  hideControl();
                })
            : (n.$input[0].animate(
                {
                  opacity: 0,
                },
                {
                  duration: 100,
                  easing: "linear",
                  iterations: 1,
                  fill: "both",
                }
              ).onfinish = function () {
                hideControl();
              });
      }
      function o_fieldShow(elemOptionAvisContainer, productId, n) {
        let avisAddCartFormActive = priceMod.avisAddCartFormActive;
        let formAddToCart = getFormAddToCart(elemOptionAvisContainer);
        if (formAddToCart) {
          avisAddCartFormActive = $(formAddToCart);
        }

        var isCurrentTransition = claimTransition(n);

        function showControl() {
          if (!isCurrentTransition()) return;
          if (["10113292","450822199"].includes(window.ap_front_settings.shop_id))
          {
            let clss = 'input:not([type="checkbox"]:not([avp-data="switch"]))[disabled],select[disabled],textarea[disabled],fieldset[disabled],span[data-required][disabled]';
            n.$input[0].querySelectorAll(clss).forEach(x => {
              avisAddCartFormActive
                  .find(
                    `input[name-disabled="properties[${x.getAttribute(
                      "field-name"
                    )}]"]`
                  )
                  .attr({
                    name: `properties[${x.getAttribute("field-name")}]`,
                  })
                  .removeAttr("disabled")
                  .removeAttr("name-disabled");
                x.setAttribute("name", x.getAttribute("name-disabled"));
                x.removeAttribute("name-disabled");
                x.removeAttribute("disabled");
            });
          }
          else
          {
            e(
              'input:not([type="checkbox"]:not([avp-data="switch"])),select,textarea,fieldset, span[data-required]',
              n.$input
            )
              .filter("[disabled]")
              .each(function () {
                avisAddCartFormActive
                  .find(
                    `input[name-disabled="properties[${e(this).attr(
                      "field-name"
                    )}]"]`
                  )
                  .attr({
                    name: `properties[${e(this).attr("field-name")}]`,
                  })
                  .removeAttr("disabled")
                  .removeAttr("name-disabled");
                e(this)
                  .attr({ name: e(this).attr("name-disabled") })
                  .removeAttr("name-disabled")
                  .removeAttr("disabled");
              });
          }
          // n.hidden is published by markReactionHidden below, when the transition starts.
          n.$input.show(),
            eventApi.fieldShow(elemOptionAvisContainer, productId, {
              reaction: n,
            });
        }
        n.$input.removeAttr("disabled"),
          markReactionHidden(elemOptionAvisContainer, productId, n, !1),
          // Drop a fade left over from a transition this one supersedes, so the two do not run back
          // to back on the same element.
          n.$input.stop && n.$input.stop(!0),
          n.$input.fadeTo
          ? n.$input.fadeTo(100, 1, function () {
              showControl();
            })
          : (n.$input[0].animate(
              {
                opacity: 1,
              },
              {
                duration: 100,
                easing: "linear",
                iterations: 1,
                fill: "both",
              }
            ).onfinish = function () {
              showControl();
            });
      }
      function r(e, t, n) {
        if (t && e != "greater" && e != "less") t = t.split(" [ ")[0];
        switch (e) {
          case "contains":
            return !!t && t.indexOf(n) !== -1;
          case "is":
            return t == n;
          case "isnot":
            return t != n;
          case "greater":
            return parseFloat(t) > parseFloat(n);
          case "less":
            return parseFloat(t) < parseFloat(n);
          default:
            return (
              spLog(e, "conditional logic: unknown type for rule compare", !0),
              !1
            );
        }
      }
      function a(e, t, n) {
        if ("greater" == e || "less" == e) {
          try {
            var i = parseFloat(t),
              o = parseFloat(n);
            if (!isNaN(i) && !isNaN(o)) return r(e, i, o);
          } catch (a) {
            spLog(a, "conditional logic: greater / less error", !0);
          }
          return !1;
        }
        return (
          (t = t ? t.toLowerCase() : ""),
          (n = n ? n.toLowerCase() : ""),
          r(e, t, n)
        );
      }
      /**
       * The checkbox / multi swatch branches of s_check_input build a fresh array on every read, and
       * comparing two arrays with != compares references, so the value always looked like it had
       * changed. Every event on such an option therefore invalidated its rules and re-ran the whole
       * reaction chain even when the selection was identical - pure churn, and one more chance for a
       * rule to land in the middle of a fade.
       */
      function isSameWatchedValue(current, previous) {
        if (Array.isArray(current) && Array.isArray(previous))
          return (
            current.length === previous.length &&
            current.every(function (item, index) {
              return item === previous[index];
            })
          );
        return current == previous;
      }
      function s_check_input(elemOptionAvisContainer, productId, i) {
        if (!i.$input)
          return void n(
            i,
            "conditional logic: page missing input, name: " + i.name
          );
        var o;
        if (i.$input.not("[disabled]").length)
          switch (i.input.type) {
            case "radio":
              o = e("input:checked", i.$input).val();
              break;
            case "swatch":
            case "swatch_single_color":
            case "swatch_single_image":
            case "swatch_multi_color":
            case "swatch_multi_image":
              o = e("input:checked", i.$input)
                .map(function () {
                  return e(this).val();
                })
                .toArray();
              break;
            case "checkbox":
              o = e("input:checked", i.$input)
                .map(function () {
                  return e(this).val();
                })
                .toArray();
              break;
            default:
              o = e("input,select,textarea", i.$input)
                .not('[type="hidden"]')
                .first()
                .val();
          }
        isSameWatchedValue(o, i.value) ||
          ((i.value = o),
          e.each(i.reactions, function (o, r) {
            t.reactions[r].rules[i.name] && t.reactions[r].rules[i.name].length
              ? e.each(t.reactions[r].rules[i.name], function (e, t) {
                  t.doesMatch = void 0;
                })
              : n(
                  { watch: i, field: r },
                  "conditional logic: missing reaction, name: " +
                    i.name +
                    ", field: " +
                    r
                ),
              d_react(elemOptionAvisContainer, productId, t.reactions[r]);
          }));
      }
      function p_rule_logic(elemOptionAvisContainer, productId, r) {
        if (!r.$input)
          return void n(
            r,
            "conditional logic: page missing input, name: " + r.name
          );
        var s = "all" === r.logic;
        e.each(r.rules, function (n, i) {
          e.each(i, function (i, o) {
            if (void 0 === o.doesMatch) {
              var p = t.watching[n];
              if (p.hidden) {
                o.doesMatch = false;
              } else {
                Array.isArray(p.value)
                  ? p.value.length
                    ? ((o.doesMatch = !1),
                      e.each(p.value, function (e, t) {
                        o.doesMatch = a(o.type, t, o.value) || o.doesMatch;
                      }))
                    : (o.doesMatch = a(o.type, "", o.value))
                  : (o.doesMatch = a(o.type, p.value, o.value));
              }
            }
            s = "all" === r.logic ? o.doesMatch && s : o.doesMatch || s;
          });
        }),
          "hide" === r.type
            ? s
              ? !r.hidden && i_fieldHide(elemOptionAvisContainer, productId, r)
              : r.hidden && o_fieldShow(elemOptionAvisContainer, productId, r)
            : s
            ? r.hidden && o_fieldShow(elemOptionAvisContainer, productId, r)
            : !r.hidden && i_fieldHide(elemOptionAvisContainer, productId, r);

        createTotalAdd(elemOptionAvisContainer, productId);
      }
      t.runAfterTimeouts = function (e) {
        var n = setInterval(function () {
          if (!t.timers.running.Change && !t.timers.running.React) {
            clearInterval(n);
            var i = t.intervals.indexOf(n);
            i !== -1 && t.intervals.splice(i, 1), e();
          }
        }, 100);
        t.intervals.push(n);
      };
      function c_timer(elemOptionAvisContainer, productId, e, n, i, o) {
        var r = e.name + n;
        t.timers[r] || t.timers.running[n]++,
          clearTimeout(t.timers[r]),
          (t.timers[r] = setTimeout(
            function () {
              delete t.timers[r],
                t.timers.running[n]--,
                o(elemOptionAvisContainer, productId, e);
            },
            void 0 === i ? 50 : i
          ));
      }
      function l_change(elemOptionAvisContainer, productId, e, t) {
        c_timer(
          elemOptionAvisContainer,
          productId,
          e,
          "Change",
          t,
          s_check_input
        );
      }
      function d_react(elemOptionAvisContainer, productId, e, t) {
        c_timer(
          elemOptionAvisContainer,
          productId,
          e,
          "React",
          t,
          p_rule_logic
        );
      }
      t.register = function (elemOptionAvisContainer, productId, i, o, r) {
        if (i?.label_cart) i.label_cart = i.label_cart.trim();
        if (t.active) {
          if (t.reactions[i.label_cart]) {
            var a = t.reactions[i.label_cart];
            if (a.$input)
              return void n(
                { reaction: a, input: i },
                "conditional logic: duplicate input, name: " +
                  i.label_cart +
                  ", label: " +
                  i.label_product
              );
            (a.$input = o), d_react(elemOptionAvisContainer, productId, a, 50);
          }
          if (t.watching[i.label_cart]) {
            var p = t.watching[i.label_cart];
            if (p.$input)
              return void n(
                { watch: p, input: i },
                "conditional logic: duplicate input, name: " +
                  i.label_cart +
                  ", label: " +
                  i.label_product
              );
            (p.input = i),
              (p.$input = o),
              e.each(r, function (t, n) {
                var i = e(n);
                i.not("fieldset,input,select,textarea").length &&
                  (i = e("fieldset,input,select,textarea", i)
                    .not('[type="hidden"]')
                    .first()),
                  i.is("[type=text],[type=number],textarea") &&
                    i.on("keydown", function (e) {
                      l_change(elemOptionAvisContainer, productId, p);
                    }),
                  i.on("change", function (e) {
                    l_change(elemOptionAvisContainer, productId, p);
                  }),
                  i.is("[type=radio]") &&
                    i.on("click", function (e) {
                      l_change(elemOptionAvisContainer, productId, p);
                    });
              }),
              s_check_input(elemOptionAvisContainer, productId, p);
          }
        }
      };
      function u(n) {
        if (
          n.conditional_logic &&
          n.conditional_logic.condition_items &&
          n.conditional_logic.condition_items.length
        ) {
          (t.active = !0),
            "uploadery" !== n.type ||
              n.label_cart ||
              (n.label_cart = n.stub_input_id.$oid);
          var i = {
            // Trimmed like the key this reaction is stored under (and like the label register()
            // looks it up by): a label saved with a stray space used to be registered under the
            // trimmed name while every lookup that goes through this one - the watch entry a hidden
            // field re-checks, the debounce keys - used the padded one, so those rules quietly did
            // nothing while their neighbours worked.
            name: String(n.label_cart).trim(),
            logic: n.conditional_logic.logic,
            type: n.conditional_logic.type,
            hidden: !1,
            $input: null,
            rules: {},
          };
          return (
            e.each(n.conditional_logic.condition_items, function (e, o) {
              // Same for the watched field: the rule map and the watch map must agree on the key,
              // and register() only ever offers a trimmed one.
              var field = String(o.field ?? "").trim();
              t.watching[field] ||
                (t.watching[field] = {
                  name: field,
                  value: void 0,
                  reactions: [],
                }),
                t.watching[field].reactions.indexOf(i.name) === -1 &&
                  t.watching[field].reactions.push(i.name),
                i.rules[field] || (i.rules[field] = []),
                i.rules[field].push({
                  doesMatch: void 0,
                  type: o.type,
                  value: o.value,
                });
            }),
            spLog(
              i.rules,
              "conditional logic: " +
                n.label_cart +
                " will " +
                i.type +
                " when " +
                i.logic +
                " match:",
              !0
            ),
            (t.reactions[i.name] = i),
            i
          );
        }
      }
      function f(n) {
        var i = [];
        return (
          e.each(n, function (e, n) {
            return window.AP_POptions && window.AP_POptions.pos
              ? void (n.$input.parent(":disabled").length || i.push(n))
              : void (
                  (t.reactions[n.name] && t.reactions[n.name].hidden) ||
                  i.push(n)
                );
          }),
          i
        );
      }
      function h() {
        Object.keys(t.timers)
          .filter(function (e) {
            return "running" !== e;
          })
          .forEach(function (e) {
            // The entry has to go with the timeout it points at. c_timer treats a leftover key as
            // "a timer is already pending" and skips its running++, while the timeout it schedules
            // still runs running--, which drives the counter negative. runAfterTimeouts then waits
            // for a zero that never comes and the option container it un-hides after rendering stays
            // display:none for good.
            clearTimeout(t.timers[e]), delete t.timers[e];
          }),
          t.intervals.forEach(function (e) {
            clearInterval(e);
          }),
          (t.active = !1),
          (t.isPreview = !1),
          (t.watching = {}),
          (t.reactions = {}),
          (t.intervals = []),
          (t.timers.running = { Change: 0, React: 0 });
      }
      return (
        (t.init = function (n, i) {
          i && h(),
            e.each(n, function (e, t) {
              u(t);
            }),
            t.active && priceMod.variantSubmissionAlters.push(f);
        }),
        t
      );
    }
    var conditionalLogicInstances = { default: "" };
    function EventApi(e) {
      var t = this;
      return (
        (t.subscribe = function (e, t) {
          "function" == typeof t &&
            document.addEventListener("productoptions." + e, function (e) {
              t(e);
            });
        }),
        (t.trigger = function (e, t, n) {
          n = !!n && n;
          var i = new CustomEvent(e, { detail: t, cancelable: n });
          return document.dispatchEvent(i), i;
        }),
        (t.getValue = function (t, n) {
          var i = n.find('[name*="properties"]'),
            o = "";
          return (
            i.is(
              "textarea, input[type=text], input[type=number], input[type=radio]:checked, input[type=hidden]"
            )
              ? (o = i.val())
              : i.is("select") &&
                (o = e.isArray(i.val()) ? i.val().join(",") : i.val()),
            o
          );
        }),
        (t.appLoad = function (e) {
          t.trigger("productoptions.appLoad", e);
        }),
        (t.fieldLoad = function (e) {
          e.hasBundledProducts = !1;
          for (var n in priceModAll[e.productId].activeVariants)
            priceModAll[e.productId].activeVariants[n].label_cart &&
              priceModAll[e.productId].activeVariants[n].label_cart ===
                e.fieldConfig.label_cart &&
              (e.hasBundledProducts = !0);
          (e.value = t.getValue(e.fieldConfig.label_cart, e.element)),
            t.trigger("productoptions.fieldLoad", e);
        }),
        (t.fieldChange = function (e) {
          t.trigger("productoptions.fieldChange", e);
        }),
        (t.productBundleAdd = function (e) {
          (e.element = e.element.closest("div")),
            t.trigger("productoptions.productBundleAdd", e);
        }),
        (t.productBundleRemove = function (e) {
          (e.element = e.element.closest("div")),
            t.trigger("productoptions.productBundleRemove", e);
        }),
        (t.fieldShow = function (elemOptionAvisContainer, productId, e) {
          var n = {
            name: e.reaction.name,
            value: t.getValue(e.reaction.name, e.reaction.$input),
            element: e.reaction.$input,
          };
          t.trigger("productoptions.fieldShow", n),
            eventApi.fieldChange({
              name: e.reaction.name,
              value: t.getValue(e.reaction.name, e.reaction.$input),
              element: e.reaction.$input,
            }),
            Object.keys(priceModAll[productId].activeVariants)
              .filter(function (t) {
                return (
                  // priceMod.activeVariants[t].variantId &&
                  // priceMod.activeVariants[t].variantId != "" &&
                  priceModAll[productId].activeVariants[t].price &&
                  priceModAll[productId].activeVariants[t].price != "" &&
                  priceModAll[productId].activeVariants[t].name ===
                    e.reaction.name
                );
              })
              .forEach(function (t) {
                priceModAll[productId].activeVariants[t].isShow = true;
                if (
                  priceModAll[productId].activeVariants[t].variantId &&
                  priceModAll[productId].activeVariants[t].variantId != ""
                )
                  eventApi.productBundleAdd({
                    name: e.reaction.name,
                    element: e.reaction.$input,
                    productBundle: priceModAll[productId].activeVariants[t],
                  });
              });
          findButtonAddCart(elemOptionAvisContainer, productId);
          createTotalAdd(elemOptionAvisContainer, productId);
        }),
        (t.fieldHide = function (e, elemOptionAvisContainer, productId) {
          var n = {
            name: e.reaction.name,
            value: t.getValue(e.reaction.name, e.reaction.$input),
            element: e.reaction.$input,
          };
          t.trigger("productoptions.fieldHide", n),
            eventApi.fieldChange({
              name: e.reaction.name,
              value: "",
              element: e.reaction.$input,
            }),
            Object.keys(priceModAll[productId].activeVariants)
              .filter(function (t) {
                return (
                  priceModAll[productId].activeVariants[t].price &&
                  priceModAll[productId].activeVariants[t].price != "" &&
                  priceModAll[productId].activeVariants[t].name ===
                    e.reaction.name
                );
              })
              .forEach(function (t) {
                if (
                  priceModAll[productId].activeVariants[t].variantId &&
                  priceModAll[productId].activeVariants[t].variantId != ""
                )
                  eventApi.productBundleRemove({
                    name: e.reaction.name,
                    element: e.reaction.$input,
                    productBundle: priceModAll[productId].activeVariants[t],
                  });

                priceModAll[productId].activeVariants[t].isShow = false;
              });
          findButtonAddCart(elemOptionAvisContainer, productId);
          createTotalAdd(elemOptionAvisContainer, productId);
        }),
        (t.validationFail = function (e) {
          var n = t.trigger("productoptions.validationFail", e, !0);
          return n.defaultPrevented;
        }),
        (t.validationSuccess = function (e) {
          t.trigger("productoptions.validationSuccess", e);
        }),
        (t.productBundleCartSubmit = function (e) {
          var n = t.trigger("productoptions.productBundleCartSubmit", e, !0);
          return n.defaultPrevented;
        }),
        (t.beforeVariantPost = function (e) {
          var n = t.trigger("productoptions.beforeVariantPost", e, !0);
          return n.defaultPrevented;
        }),
        (t.beforeVariantsPost = function (e) {
          var n = t.trigger("productoptions.beforeVariantsPost", e, !0);
          return n.defaultPrevented;
        }),
        t
      );
    }
    var eventApi = new EventApi(window.AP_POptions.$);
    function spLog(e, t, n) {
      var i = "IO",
        o = "DodgerBlue";
      "function" == typeof window.spLogCallback &&
        window.spLogCallback(i, e, t, n === !0 ? o : n);
      try {
        "on" === localStorage.getItem("spLog") && console.log([i, t, e]);
      } catch (r) {}
    }
    function safeJsonStringify(e) {
      var t = [],
        n = "";
      try {
        n = JSON.stringify(e, function (e, n) {
          if ("function" == typeof n) return "function(){}";
          if ("object" == typeof n && null !== n) {
            if (t.includes(n)) return "Circular object";
            t.push(n);
          }
          return n;
        });
      } catch (i) {
        console.error("Failed to constuct json string: ", i, e);
      }
      return (t = null), n;
    }
    function createTotalAdd(elemOptionAvisContainer, productId) {
      totalPriceAdd = 0;
      let priceAddElem = elemOptionAvisContainer.querySelector(
        ".avp-productoption-total-add"
      );
      let inputTotalAddCharge = elemOptionAvisContainer.querySelector(
        ".apo-total-addcharge"
      );

      if (priceModAll[productId].activeVariants) {
        for (const item in priceModAll[productId].activeVariants) {
          let priceAdd = priceMod.formatMoneyToNumber(
            priceModAll[productId].activeVariants[item].price
          );
          if (
            priceModAll[productId].activeVariants[item].isShow &&
            priceAdd != "0"
          )
            totalPriceAdd +=
              parseFloat(priceAdd) *
              parseInt(
                priceModAll[productId].activeVariants[item].quantity ?? 1
              );
        }

        if (priceAddElem) {
          if (totalPriceAdd > 0) {
            priceAddElem.classList.remove("apo-total-addcharge-hide");
            // totalPriceHtml.slideDown();
            let formatPrice = priceMod.formatMoney(totalPriceAdd * 100);
            priceAddElem.querySelector(
              ".avp-productoption-totalpriceadd"
            ).innerHTML = formatPrice;

            if (inputTotalAddCharge)
              inputTotalAddCharge.value = totalPriceAdd * 100;
            // $("#avp-productoption-totalpriceadd").html(formatPrice);
            // $(".avp-productoption-totalpriceadd").html(formatPrice);
          } else {
            // totalPriceHtml.slideUp();
            priceAddElem.classList.add("apo-total-addcharge-hide");
            let formatPrice = priceMod.formatMoney(totalPriceAdd * 100);
            priceAddElem.querySelector(
              ".avp-productoption-totalpriceadd"
            ).innerHTML = formatPrice;
            if (inputTotalAddCharge) inputTotalAddCharge.value = 0;
          }
        }
      }

      if (totalPriceAdd === 0 && priceAddElem) {
        priceAddElem.classList.add("apo-total-addcharge-hide");
        // totalPriceHtml.slideUp();
      }

      if (inputTotalAddCharge) inputTotalAddCharge.value = totalPriceAdd * 100;
    }

    const checkPosition = (t) => {
      return t.offsetWidth > 0 || t.offsetHeight > 0;
    };

    function getElementByKeys(keyElements, type) {
      let result = false;
      if (!keyElements) return result;
      if ("quickview" === type) {
        let e = document.querySelectorAll(keyElements);
        if (e.length)
          if (e.length > 1) {
            for (let t = 0; t < e.length; t++)
              if (checkPosition(e[t])) {
                result = e[t];
                break;
              }
          } else result = e[0];

        return result;
      }

      for (let e = 0; e < keyElements.length; e++) {
        let elm = document.querySelector(keyElements[e]);
        if (elm) {
          result = elm;
          break;
        }
      }

      return result;
    }
    

    const showPopupImageSwatch = (event) => {
      let apoSwatchPopupClass = "apo-swatch-popup";
      let apoSwatchBackdropClass = "apo-swatch-backdrop";

      const remove = () => {
        let t = document.querySelector(`.${apoSwatchPopupClass}`),
          e = document.querySelector(`.${apoSwatchBackdropClass}`);
        t && t.remove(), e && e.remove();
      };
      remove();
      const createPopup = () => {
          let n = document.createElement("div");
          return (
            n.classList.add(apoSwatchPopupClass),
            n.setAttribute("style", "display:none!important"),
            (n.innerHTML = `<div class="apo-swatch-popup-box">\n         <span class="apo-swatch-popup-close">&times;</span>\n <div class="apo-popup-image">  </div>    </div>`),
            n
          );
        },
        backDrop = () => {
          let t = document.createElement("div");
          return (
            t.classList.add(apoSwatchBackdropClass),
            t.setAttribute("style", "display:none!important"),
            t.addEventListener("click", remove.bind(this)),
            t
          );
        };

      let e = createPopup(),
        r = backDrop();
      document.body.appendChild(e),
        document.body.appendChild(r),
        e
          .querySelectorAll(".apo-swatch-popup-close")
          .forEach((t) => t.addEventListener("click", remove.bind(this)));

      let mainImg = event.currentTarget.querySelector(".apo-main-image");
      if (mainImg && mainImg.getAttribute("src")) {
        let imgSrc = mainImg.getAttribute("src");
        let fileName = imgSrc.split("/").pop();
        let newImgSrc = imgSrc.replace(fileName, "full_" + fileName);
        if (document.querySelector(".apo-popup-image"))
          document.querySelector(
            ".apo-popup-image"
          ).innerHTML = `<img style="width: 100%; height: 100%; object-fit: contain;" src="${newImgSrc}" />`;
        e.setAttribute("style", "display:flex!important");
        r.setAttribute("style", "display:block!important");
      }
    };

    // $(function () {
    var e = {
      _createTotalAdd: function (elemOptionAvisContainer, productId) {
        createTotalAdd(elemOptionAvisContainer, productId);
      },
      _handleChangeQuantity: async function (
        event,
        elemOptionAvisContainer,
        productId
      ) {
        let elm = event.target;
        let parents = $(elm).parents(".avp-value-grid");
        if (parents.length > 0) {
          let inputValue = parents.find("[field-name]");
          if (inputValue.length > 0) {
            let quantity = $(elm).val();
            if (!quantity) quantity = 1;
            if (elm.max > 0 && parseInt(quantity) > elm.max) {
              quantity = elm.max;
            }

            if (elm.min > 0 && parseInt(quantity) < elm.min) {
              quantity = elm.min;
            }
            $(elm).val(quantity);
            await createAvisContainerHidden(
              elemOptionAvisContainer,
              productId,
              inputValue.attr("field-name"),
              quantity,
              inputValue,
              "",
              true,
              elm
            );
          }

          e._createTotalAdd(elemOptionAvisContainer, productId);
        }
      },
      _createQuantity: function (
        elemOptionAvisContainer,
        productId,
        valueElement,
        min,
        max,
        quantityDefault = -1
      ) {
        if (!quantityDefault) quantityDefault = -1;
        let elemInput = document.createElement("INPUT");
        min = min ? min : 1;
        elemInput.setAttribute("type", "number");
        elemInput.setAttribute("disabled", "disabled");
        elemInput.classList.add("avp-qty-input");
        if (min) {
          min = parseInt(min);
          elemInput.setAttribute("min", min);
        }
        if (max) {
          max = parseInt(max);
          elemInput.setAttribute("max", max);
          if (quantityDefault > max) quantityDefault = max;
        }
        elemInput.setAttribute(
          "value",
          quantityDefault > min ? quantityDefault : min
        );

        elemInput.removeEventListener("input", (event) =>
          e._handleChangeQuantity(event, elemOptionAvisContainer, productId)
        );
        elemInput.addEventListener("input", (event) => {
          e._handleChangeQuantity(event, elemOptionAvisContainer, productId);
        });
        let elemInputJq = window.AP_POptions.$(elemInput);
        elemInputJq.on("keypress", function (e) {
          var t = String.fromCharCode(e.which);
          return Boolean(t.match(/[0-9]/));
        });

        let buttonCut = window.AP_POptions.$("<button></button>")
          .addClass("avp-qty-button")
          .addClass("avp-qty-cut")
          .attr({ disabled: "disabled" })
          .html(`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-minus" fill="none" viewBox="0 0 10 2">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z" fill="currentColor">
</path></svg>`);
        buttonCut.on("click", async function (event) {
          event.preventDefault();
          let parents = $(this).parents(".avp-value-grid");
          if (parents.length > 0) {
            let inputValue = parents.find("[field-name]");
            if (inputValue.length > 0) {
              let inputQuantity = parents.find(".avp-qty-input");
              if (inputQuantity.length > 0) {
                let quantity = inputQuantity.val();
                if (!quantity) quantity = 1;
                quantity = parseInt(quantity) - 1;
                if (quantity <= parseInt(min)) {
                  quantity = min;
                  $(this).attr({ disabled: "disabled" });
                }
                inputQuantity.val(quantity);
                await createAvisContainerHidden(
                  elemOptionAvisContainer,
                  productId,
                  inputValue.attr("field-name"),
                  quantity,
                  inputValue,
                  "",
                  true
                );
              }
            }

            e._createTotalAdd(elemOptionAvisContainer, productId);
          }
        });
        let buttonAdd = window.AP_POptions.$("<button></button>")
          .addClass("avp-qty-button")
          .addClass("avp-qty-add")
          .attr({ disabled: "disabled" })
          .html(`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-plus" fill="none" viewBox="0 0 10 10">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z" fill="currentColor">
</path></svg>`);

        buttonAdd.on("click", async function (event) {
          event.preventDefault();
          let parents = $(this).parents(".avp-value-grid");
          if (parents.length > 0) {
            let inputValue = parents.find("[field-name]");
            if (inputValue.length > 0) {
              let inputQuantity = parents.find(".avp-qty-input");
              if (inputQuantity.length > 0) {
                let quantity = inputQuantity.val();
                if (!quantity) quantity = 1;
                quantity = parseInt(quantity) + 1;
                if (max && quantity >= parseInt(max)) {
                  quantity = max;
                  $(this).attr({ disabled: "disabled" });
                }
                inputQuantity.val(quantity);
                await createAvisContainerHidden(
                  elemOptionAvisContainer,
                  productId,
                  inputValue.attr("field-name"),
                  quantity,
                  inputValue,
                  "",
                  true
                );
              }
            }

            e._createTotalAdd(elemOptionAvisContainer, productId);
          }
        });

        let qtyWrapper = window.AP_POptions.$("<div></div>")
          .addClass("avp-qty-wrapper")
          .append(buttonCut)
          .append(elemInputJq)
          .append(buttonAdd);
        let result = window.AP_POptions.$("<div></div>")
          .addClass("avp-value-grid")
          .append(
            window.AP_POptions.$("<div></div>")
              .addClass("avp-value-grid-item")
              .append(valueElement)
          )
          .append(
            window.AP_POptions.$("<div></div>")
              .addClass("avp-value-grid-item")
              .append(qtyWrapper)
          );
        return result;
      },
      _createRadioButton: function (
        productId,
        elemOptionAvisContainer,
        option,
        t,
        n,
        i,
        quantityDefault
      ) {
        function genVariantTitleHtml(a) {
          $(document).ready(function () {
            var label = $(a)
              .closest(".ap-options__swatch-container")
              .find(".avp-option-title");

            var variantTitleHtml = "";
            if ($(a).prop("checked")) {
              variantTitleHtml = $(a)
                .parent()
                .find(".swatch-variant-title")
                .clone()
                .prepend(isPremiumMerchant ? "" : "| ")
                .css(
                  isPremiumMerchant
                    ? {
                        fontStyle: "normal",
                        fontWeight: "normal",
                        display: "flex",
                        flexDirection: "column-reverse",
                        alignItems: "flex-end",
                      }
                    : {
                        fontStyle: "normal",
                        fontWeight: "normal",
                        display: "inline-block",
                      }
                )
                .prop("outerHTML");
            }

            label.html(
              `${option?.label_product}${
                (option?.required ? `<div class="avp-required">*</div>` : " ") +
                variantTitleHtml
              }`
            );
          });
        }

        var o = priceMod.getValueText(t, false, option?.hide_price),
          r = window.AP_POptions.$("<input/>")
            .attr("type", "radio")
            .attr("field-name", option.label_cart)
            .attr("name", option.label_cart)
            .attr("value", o.value)
            .attr("autocomplete","off")
            .addClass("avp-productoptiontextcolor")
            .addClass("avp-productoptionbackground")
            .on("click", async function (t, n) {
              if (
                priceModAll[productId].radioInput &&
                priceModAll[productId].radioInput[option.label_cart] &&
                priceModAll[productId].radioInput[option.label_cart].value ===
                  t.target.value
              ) {
                if (option?.not_deselect) {
                }else if (!isCustom149) {
                  $(this).prop("checked", false);
                }

                if (
                  option.type.indexOf("swatch") > -1 &&
                  (option.hidden_variant_title != null &&
                  option.hidden_variant_title !== undefined
                    ? option?.hidden_variant_title
                    : customizeryConfig?.customize_options?.swatch
                        ?.hidden_variant_title)
                ) {
                  genVariantTitleHtml(this);
                }

                await createAvisContainerHidden(
                  elemOptionAvisContainer,
                  productId,
                  option.label_cart,
                  "",
                  $(this)
                );
                priceModAll[productId].radioInput[option.label_cart].value = "";
                eventApi.fieldChange({
                  name: option.label_cart,
                  value: "",
                  element: $(this).closest("div"),
                });
                i(t);

                let spanRequired = $(this).closest(
                  "span[data-required='true']"
                );
                if (spanRequired && spanRequired.length) {
                  window.AP_POptions.apps.productoptions.toggleInputError(
                    spanRequired,
                    !0
                  );
                }

                e._createTotalAdd(elemOptionAvisContainer, productId);
              }

              findButtonAddCart(elemOptionAvisContainer, productId);
            })
            .on("change", async function (t, n) {
              n ||
                eventApi.fieldChange({
                  name: option.label_cart,
                  value: t.target.value,
                  element: $(this).closest("div"),
                }),
                i(t);

              if (
                option.type.indexOf("swatch") > -1 &&
                (option.hidden_variant_title != null &&
                option?.hidden_variant_title !== undefined
                  ? option?.hidden_variant_title
                  : customizeryConfig?.customize_options?.swatch
                      ?.hidden_variant_title)
              ) {
                genVariantTitleHtml(this);
              }
              if ($(this).prop("checked")) {
                if (
                  t.currentTarget.closest(".avp-productoptionswatchwrapper") &&
                  t.currentTarget.closest(".apo-custom-wrapper")
                ) {
                  let imgSelector = t.currentTarget
                    .closest(".avp-productoptionswatchwrapper")
                    .querySelector(".avp-productoptionswatch");
                  if (imgSelector && imgSelector.getAttribute("data-src")) {
                    let src = imgSelector.getAttribute("data-src");
                    let mainImageSelector = t.currentTarget
                      .closest(".apo-custom-wrapper")
                      .querySelector(".apo-main-image");
                    mainImageSelector.setAttribute("src", src);
                  }
                }
                priceModAll[productId].radioInput[option.label_cart] = {
                  value: t.target.value,
                };
                await createAvisContainerHidden(
                  elemOptionAvisContainer,
                  productId,
                  option.label_cart,
                  t.target.value,
                  $(this)
                );
              } else {
                priceModAll[productId].radioInput[option.label_cart] = {
                  value: "",
                };
                await createAvisContainerHidden(
                  elemOptionAvisContainer,
                  productId,
                  option.label_cart,
                  "",
                  $(this)
                );
              }

              let spanRequired = $(this).closest("span[data-required='true']");
              // let spanRequired = $(this)
              //   .parent()
              //   .parent("span[data-required='true']");
              if (spanRequired && spanRequired.length) {
                window.AP_POptions.apps.productoptions.toggleInputError(
                  spanRequired,
                  !0
                );
              }

              e._createTotalAdd(elemOptionAvisContainer, productId);
              findButtonAddCart(elemOptionAvisContainer, productId);
            });
          if (t?.soldout) r.attr("disabled", "disabled"); 

        let valueWrapper = null;
        if (n) {
          let valueElement = window.AP_POptions.$("<label></label>")
            .addClass("avp-productoptioncheckwrapper")
            .addClass(
              `avp-productoptioncheckwrapper${
                customizeryConfig?.customize_options?.radio_btn?.shape ===
                "pill"
                  ? " avp-pilloptioncheckwrapper"
                  : ""
              }`
            )
            .append(
              priceMod.attachData(r, option.label_cart, t, o.display, productId)
            )
            .append(o.display);
          if (option.show_option_value_qty) {
            valueWrapper = e._createQuantity(
              elemOptionAvisContainer,
              productId,
              valueElement,
              option.min_value_qty,
              option.max_value_qty,
              quantityDefault
            );
          } else valueWrapper = valueElement;
        }

        customizeryConfig?.customize_options?.radio_btn?.shape === "pill" &&
          r.css({ display: "none" });
        return (
          window.AP_POptions.apps.productoptions.themeAppExtensionId &&
            r.attr(
              "form",
              window.AP_POptions.apps.productoptions.themeAppExtensionId
            ),
          n ? valueWrapper : r
        );
      },
      _createCheckboxButton: function (
        productId,
        elemOptionAvisContainer,
        option,
        t,
        n,
        valueDefault,
        quantityDefault
      ) {
        var i = priceMod.getValueText(t),
          o = window.AP_POptions.$("<input/>")
            .attr("type", "checkbox")
            .attr("value", i.value)
            .attr("autocomplete","off")
            .attr("field-name", option.label_cart)
            .addClass("avp-productoptiontextcolor")
            .addClass("avp-productoptionbackground");

        customizeryConfig?.customize_options?.checkbox?.shape === "pill" &&
          o.css({ display: "none" });

        if (valueDefault) o.attr("checked", "checked");
        if (i?.soldout) o.attr("disabled", "disabled");

        let valueWrapper = null;
        if (n) {
          let valueElement = window.AP_POptions.$("<label></label>")
            .addClass("avp-productoptioncheckwrapper")
            .addClass(
              `avp-productoptioncheckwrapper${
                customizeryConfig?.customize_options?.checkbox?.shape === "pill"
                  ? " avp-pilloptioncheckwrapper"
                  : ""
              }`
            )
            .append(
              priceMod.attachData(o, option.label_cart, t, i.display, productId)
            )
            .append(i.display);
          if (option.show_option_value_qty) {
            valueWrapper = e._createQuantity(
              elemOptionAvisContainer,
              productId,
              valueElement,
              option.min_value_qty,
              option.max_value_qty,
              quantityDefault
            );
          } else valueWrapper = valueElement;
        }

        return (
          window.AP_POptions.apps.productoptions.themeAppExtensionId &&
            o.attr(
              "form",
              window.AP_POptions.apps.productoptions.themeAppExtensionId
            ),
          n ? valueWrapper : o
        );
      },
      _createSelectMenu: function (
        productId,
        elemOptionAvisContainer,
        t,
        n,
        i,
        o,
        r,
        optionDefaultValues,
        option
      ) {
        var a = window.AP_POptions.$('<div class="avp-select"></div>'),
          result = null,
          s = window.AP_POptions.$(
            '<select class="avp-productdescfont avp-productoptiontextcolor avp-productoptionbackground"></select>'
          )
            .attr("id", r)
            .attr("autocomplete","off")
            .attr("field-name", t);
        if (
          (o && s.attr("required", "required"),
          window.AP_POptions.apps.productoptions.themeAppExtensionId &&
            s.attr(
              "form",
              window.AP_POptions.apps.productoptions.themeAppExtensionId
            ),
          void 0 !== i && "" !== i)
        ) {
          if (
            navigator.userAgent.toLowerCase().indexOf("firefox") > -1 &&
            !e.ffCssFix
          ) {
            var p = ".avp-select select:invalid { box-shadow: none; }",
              c = document.head || document.getElementsByTagName("head")[0],
              l = document.createElement("style");
            (l.type = "text/css"),
              l.styleSheet
                ? (l.styleSheet.cssText = p)
                : l.appendChild(document.createTextNode(p)),
              c.appendChild(l),
              (e.ffCssFix = !0);
          }
          s.append(
            window.AP_POptions.$("<option>")
              .text(i)
              .attr("value", "")
              .attr("disabled", "true")
              .attr("selected", !0)
          );
        }
        return (
          n &&
            n.length &&
            (window.AP_POptions.$.each(n, function (e, n) {
              let valueDefault = false;
              if (
                optionDefaultValues &&
                optionDefaultValues.indexOf(n["value_id"]) > -1
              ) {
                valueDefault = true;
              }

              var i = priceMod.getValueText(n),
                o = window.AP_POptions.$("<option></option>")
                  .attr("value", i.value)
                  .html(i.display);
              if (n?.soldout) o.attr("disabled", "disabled");
              if (valueDefault) o.attr("selected", true);
              s.append(priceMod.attachData(o, t, n, i.display, productId));
            }),
            s.prop("field-name", t),
            s.prop("name", t),
            s.on("change", async function (event, n) {
              window.AP_POptions.apps.productoptions.toggleInputError(s, !0),
                n ||
                  eventApi.fieldChange({
                    name: t,
                    value: event.target.value,
                    element: $(this).closest("div:not(.avp-select)"),
                  });
              var i = $("option", s);
              priceMod.variantChange(t, i, productId);
              await createAvisContainerHidden(
                elemOptionAvisContainer,
                productId,
                t,
                event.target.value,
                s
              );
              e._createTotalAdd(elemOptionAvisContainer, productId);
              findButtonAddCart(elemOptionAvisContainer, productId);
            })),
          a.append(s),
          (result = option.show_option_value_qty
            ? e._createQuantity(
                elemOptionAvisContainer,
                productId,
                a,
                option.min_value_qty,
                option.max_value_qty
              )
            : a),
          s.trigger("change", ["onLoad"]),
          result
        );
      },
      _createHiddenInput: function (
        elemOptionAvisContainer,
        productId,
        e,
        isProperty = false
      ) {
        // Trim ở cả nơi TẠO lẫn nơi TÌM (createAvisContainerHidden) thì tên input
        // hidden luôn khớp nhau, dù caller nào truyền vào label còn khoảng trắng.
        if (typeof e === "string") e = e.trim();
        var t = window.AP_POptions.$("<input />")
          .attr("type", "hidden")
          .attr("name", isProperty ? "properties[" + e + "]" : e);
        if (!isProperty) {
          t.attr("field-name", e);
        }

        if (!isProperty) {
          createAvisContainerHidden(elemOptionAvisContainer, productId, e, "");
        }

        return (
          window.AP_POptions.apps.productoptions.themeAppExtensionId &&
            t.attr(
              "form",
              window.AP_POptions.apps.productoptions.themeAppExtensionId
            ),
          t
        );
      },
      handleChangeElement: function (
        elemOptionAvisContainer,
        productId,
        event,
        textLength,
        minLength,
        id
      ) {
        let elm = event.target;
        let config = window.AP_POptions.apps.productoptions;
        let allowValue = elm.getAttribute("data-allow-value");
        let labelCart = elm.getAttribute("field-name");
        let value = elm.value;
        textLength &&
          value.length > textLength &&
          ((value = value.substr(0, textLength)), (elm.value = value));
        if (allowValue && value) {
          if (
            allowValue == "only_letters" &&
            config.allowedValueLetterRegex.test(value)
          ) {
          } else if (
            allowValue == "only_letters_and_numbers" &&
            config.allowedValueLetterNumberRegex.test(value)
          ) {
          } else config.toggleInputError($(elm), !0);
        }

        elemInputJq = window.AP_POptions.$(elm);
        let counterLetter = window.AP_POptions.$(
          `input#${id} + .apo-counter-letter`
        );
       
        if (counterLetter && counterLetter?.length > 0) {
          elemInputJq.on("keyup", function () {
            let counterLetterVal = counterLetter.html();
            let letterRemaining = counterLetterVal.split("/")[0];

            let countText = value.length;
            if (countText > textLength) {
              let result = $(this)
                .val()
                .substring(0, $(this).val().length + countText);
              $(this).val(result);
              countText = textLength;
            }
            let newLetterRemaining = counterLetterVal.replace(
              letterRemaining,
              countText
            );
            counterLetter.html(newLetterRemaining);
          });
        }

        createAvisContainerHidden(
          elemOptionAvisContainer,
          productId,
          labelCart,
          value
        );

        findButtonAddCart(elemOptionAvisContainer, productId);
      },
      _createTextInput: function (
        elemOptionAvisContainer,
        productId,
        labelCart,
        valueDefault,
        placeholder,
        textLength,
        minLength,
        required,
        id,
        allowValue,
        textTransform
      ) {
        textLength =
          textLength && parseInt(textLength, 10) > 0
            ? parseInt(textLength, 10)
            : 0;
        minLength =
          minLength && parseInt(minLength, 10) > 0
            ? parseInt(minLength, 10)
            : 0;
        let elemInput = document.createElement("INPUT");
        elemInput.setAttribute("type", "text");
        elemInput.setAttribute("field-name", labelCart);
        elemInput.setAttribute("name", labelCart);
        elemInput.setAttribute("id", id);
        elemInput.setAttribute("autocomplete","off");

        elemInput.classList.add("avp-productdescfont");
        elemInput.classList.add("avp-productoptiontextcolor");
        elemInput.classList.add("avp-productoptionbackground");

        if (textTransform && textTransform === "Uppercase")
          elemInput.classList.add("avp-text-transform-uppercase");
        if (textTransform && textTransform === "Lowercase")
          elemInput.classList.add("avp-text-transform-lowercase");
        if (textTransform && textTransform === "Capitalize")
          elemInput.classList.add("avp-text-transform-capitalize");

        elemInput.removeEventListener("input", (event) =>
          e.handleChangeElement(
            elemOptionAvisContainer,
            productId,
            event,
            textLength,
            minLength,
            id
          )
        );
        elemInput.addEventListener("input", (event) => {
          e.handleChangeElement(
            elemOptionAvisContainer,
            productId,
            event,
            textLength,
            minLength,
            id
          );
        });

        let textField = null;
        if (textLength || minLength) {
          textField = document.createElement("span");
          textField.classList.add("apo-text-field");
          textField.appendChild(elemInput);

          if (textLength) {
            let counterLetter = document.createElement("span");
            counterLetter.classList.add("apo-counter-letter");
            let countText = valueDefault
              ? valueDefault.length
              : elemInput.value.length;
            const text = document.createTextNode(`${countText}/${textLength}`);
            counterLetter.appendChild(text);
            textField.appendChild(counterLetter);
            elemInput.style.paddingRight = "60px";
            // elemInput.style.marginTop = "9px";
          }

          if (minLength) {
            let minLetter = document.createElement("span");
            minLetter.classList.add("apo-min-letter");
            const text = document.createTextNode(
              `Type at least ${minLength} letters`
            );
            minLetter.appendChild(text);
            textField.appendChild(minLetter);
          }
        }

        let elemInputJq = window.AP_POptions.$(elemInput);
        return (
          void 0 !== placeholder &&
            "" !== placeholder &&
            elemInputJq.prop("placeholder", placeholder),
          textLength &&
            elemInputJq.prop({ maxlength: textLength, size: textLength }),
          required && elemInputJq.prop("required", required),
          allowValue &&
            allowValue != "default" &&
            elemInputJq.attr("data-allow-value", allowValue),
          void 0 !== valueDefault &&
            "" !== valueDefault &&
            elemInputJq.val(valueDefault),
          createAvisContainerHidden(
            elemOptionAvisContainer,
            productId,
            labelCart,
            valueDefault
          ),
          textField ? window.AP_POptions.$(textField) : elemInputJq
        );
      },

      _createTextArea: function (
        elemOptionAvisContainer,
        productId,
        e,
        t,
        n,
        i,
        o,
        r,
        textTransform,
        minLength
      ) {
        var a = window.AP_POptions.$("<textarea>")
          .attr("field-name", e)
          .attr("name", e)
          .attr("id", r)
          .attr("autocomplete","off")
          .addClass("avp-productdescfont")
          .addClass("avp-productoptiontextcolor")
          .addClass("avp-productoptionbackground")
          .on("keyup touchend", function (t) {
            eventApi.fieldChange({
              name: e,
              value: t.target.value,
              element: $(this).closest("div"),
            });
            createAvisContainerHidden(
              elemOptionAvisContainer,
              productId,
              e,
              t.target.value
            );
            // findButtonAddCart();
          });
        if (i) {
          a.attr("maxlength", i);
        }
        if (textTransform && textTransform === "Uppercase")
          a.addClass("avp-text-transform-uppercase");
        if (textTransform && textTransform === "Lowercase")
          a.addClass("avp-text-transform-lowercase");
        if (textTransform && textTransform === "Capitalize")
          a.addClass("avp-text-transform-capitalize");

        var textField = null;
        if (i || minLength) {
          textField = window.AP_POptions.$("<span>")
            .addClass("apo-text-field")
            .append(a);

          if (i) {
            var countText = t ? t.length : a.val().length;
            var counterLetter = window.AP_POptions.$("<span>")
              .addClass("apo-counter-letter")
              .addClass("avp-counter-letters-textarea")
              .text(`${countText}/${i}`)
              .appendTo(textField);
            a.css("margin-top", "9px")
              .css("margin-bottom", "-9px")
              .css("padding-right", "60px");
          }

          if (minLength) {
            var minLetter = window.AP_POptions.$("<span>")
              .addClass("apo-min-letter")
              .text(`Type at least ${minLength} letters`)
              .appendTo(textField);
          }
        }

        if (
          (window.AP_POptions.apps.productoptions.themeAppExtensionId &&
            a.attr(
              "form",
              window.AP_POptions.apps.productoptions.themeAppExtensionId
            ),
          void 0 !== t && "" !== t && a.val(t),
          void 0 !== n && "" !== n && a.prop("placeholder", n),
          i && parseInt(i, 10) > 0)
        ) {
          a.prop("max_length", i);
          var s = window.AP_POptions.$(
            "<p class='avp-productdescfont avp-productdesctextcolor'><span>" +
              (i - a.val().length) +
              "</span> " +
              window.AP_POptions.apps.productoptions.strings
                .charactersRemaining +
              "</p>"
          );
          a.on("keyup", function () {
            var x = parseInt(i, 10) - a.val().length;
            if (x < 0) {
              let result = $(this)
                .val()
                .substring(0, $(this).val().length + x);
              $(this).val(result);
              createAvisContainerHidden(
                elemOptionAvisContainer,
                productId,
                e,
                result
              );
              x = 0;
            }
            s.find("span").html(x);
            findButtonAddCart(elemOptionAvisContainer, productId);
          }),
            (a = a.add(s));
          a.on("keyup", function () {
            let counterLetter = window.AP_POptions.$(
              `textarea#${r} + .apo-counter-letter`
            );
            // var counterLetter = window.AP_POptions.$(`textarea#${r}`).prev();
            if (counterLetter && counterLetter.length) {
              let counterLetterVal = counterLetter.html();
              let letterRemaining = counterLetterVal.split("/")[0];

              let countText = $(this).val().length;
              if (countText > i) {
                let result = $(this)
                  .val()
                  .substring(0, $(this).val().length + countText);
                $(this).val(result);
                countText = i;
              }
              let newLetterRemaining = counterLetterVal.replace(
                letterRemaining,
                countText
              );
              counterLetter.html(newLetterRemaining);
            }
          });
        }
        return (
          a.on("blur", function () {
            window.AP_POptions.apps.productoptions.toggleInputError(a, !0);
            createAvisContainerHidden(
              elemOptionAvisContainer,
              productId,
              e,
              $(this).val()
            );
            findButtonAddCart(elemOptionAvisContainer, productId);
          }),
          o && a.prop("required", o),
          createAvisContainerHidden(
            elemOptionAvisContainer,
            productId,
            e,
            a.val()
          ),
          textField ? textField : a
        );
      },
      _createNumberInput: function (
        elemOptionAvisContainer,
        productId,
        e,
        t,
        n,
        i,
        o,
        r,
        a
      ) {
        var s = window.AP_POptions.$("<input/>")
          .attr("type", "number")
          .attr("step", "any")
          .attr("field-name", e)
          .attr("name", e)
          .attr("id", a)
          .attr("autocomplete","off")
          .addClass("avp-productdescfont")
          .addClass("avp-productoptiontextcolor")
          .addClass("avp-productoptionbackground")
          .on("keyup touchend", function (t) {
            eventApi.fieldChange({
              name: e,
              value: t.target.value,
              element: $(this).closest("div"),
            });
            createAvisContainerHidden(
              elemOptionAvisContainer,
              productId,
              e,
              t.target.value
            );
            // findButtonAddCart();
          });
        window.AP_POptions.apps.productoptions.themeAppExtensionId &&
          s.attr(
            "form",
            window.AP_POptions.apps.productoptions.themeAppExtensionId
          ),
          void 0 !== t && "" !== t && s.val(t),
          void 0 !== n && "" !== n && s.prop("placeholder", n),
          r && s.prop("required", r),
          s.on("keypress", function (e) {
            var t = String.fromCharCode(e.which);
            return Boolean(t.match(/[0-9\.-]/));
          });
        var p = function (e) {
          (i = parseFloat(i)),
            (o = parseFloat(o)),
            (input = parseFloat(s.val())),
            void 0 !== i &&
              "" !== i &&
              input < i &&
              "keyup" != e.type &&
              s.val(i),
            void 0 !== o && "" !== o && input > o && s.val(o);
        };
        return (
          s.on("keyup", function (x) {
            p(x);
            createAvisContainerHidden(
              elemOptionAvisContainer,
              productId,
              e,
              s.val()
            );
            findButtonAddCart(elemOptionAvisContainer, productId);
          }),
          s.on("blur", function (x) {
            p(x),
              createAvisContainerHidden(
                elemOptionAvisContainer,
                productId,
                e,
                s.val()
              ),
              window.AP_POptions.apps.productoptions.toggleInputError(s, !0);
            findButtonAddCart(elemOptionAvisContainer, productId);
          }),
          createAvisContainerHidden(
            elemOptionAvisContainer,
            productId,
            e,
            s.val()
          ),
          s
        );
      },
      _createDateInput: function (
        elemOptionAvisContainer,
        productId,
        labelCart,
        defaultValue,
        placeholder,
        isRequired,
        idInput
      ) {
        var inputDate = window.AP_POptions.$("<input/>")
          .attr("type", "text")
          .attr("avp-data", "date")
          .attr("step", "any")
          .attr("field-name", labelCart)
          .attr("name", labelCart)
          .attr("id", idInput)
          .attr("autocomplete","off")
          .attr("placeholder", `${placeholder ? placeholder : ""}`)
          .addClass("avp-productdescfont")
          .addClass("avp-productoptiontextcolor")
          .addClass("avp-productoptionbackground")
          .on("keyup touchend", function (t) {
            eventApi.fieldChange({
              name: labelCart,
              value: t.target.value,
              element: $(this).closest("div"),
            });
            createAvisContainerHidden(
              elemOptionAvisContainer,
              productId,
              labelCart,
              t.target.value
            );
          });
        inputDate.prop("readonly", true);
        defaultValue && inputDate.val(defaultValue),
          isRequired && inputDate.prop("required", isRequired),
          inputDate.on("keypress", function (e) {
            var t = String.fromCharCode(e.which);
            return Boolean(t.match(/[0-9\.-]/));
          });
        var eventInput = function (e) {};
        return (
          inputDate.on("change", function (e) {
            eventInput(e);
            createAvisContainerHidden(
              elemOptionAvisContainer,
              productId,
              labelCart,
              $(this).val()
            );
          }),
          inputDate.on("keyup", function (e) {
            eventInput(e);
            createAvisContainerHidden(
              elemOptionAvisContainer,
              productId,
              labelCart,
              $(this).val()
            );
            findButtonAddCart(elemOptionAvisContainer, productId);
          }),
          inputDate.on("blur", function (e) {
            eventInput(e),
              window.AP_POptions.apps.productoptions.toggleInputError(
                inputDate,
                !0
              );
            createAvisContainerHidden(
              elemOptionAvisContainer,
              productId,
              labelCart,
              $(this).val()
            );
            findButtonAddCart(elemOptionAvisContainer, productId);
          }),
          createAvisContainerHidden(
            elemOptionAvisContainer,
            productId,
            labelCart,
            inputDate.val()
          ),
          inputDate
        );
      },
      _createColorInput: function (elemOptionAvisContainer, e, t, i, o) {
        let inputColor = $("<input/>")
          .attr("type", "color")
          .attr("avp-data", "color")
          .attr("field-name", e)
          .attr("name", e)
          .attr("id", o)
          .attr("autocomplete","off")
          .addClass("avp-colorpicker");
        var a = window.AP_POptions.$(
          `<div class="apo-maincolorpicker">
              <label class="apo-colorlabel" for="${o}">
                <svg class="apo-icon__color" style="fill: ${t}" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                  <path d="M7 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                  <path d="M8 11.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                  <path d="M13 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                  <path fill-rule="evenodd" d="M10 3a7 7 0 0 0 0 14 1.75 1.75 0 0 0 1.75-1.75v-1.5a2 2 0 0 1 2-2h1.5a1.75 1.75 0 0 0 1.75-1.75 7 7 0 0 0-7-7Zm3.75 7.25h1.5a.25.25 0 0 0 .25-.25 5.5 5.5 0 1 0-5.5 5.5.25.25 0 0 0 .25-.25v-1.5a3.5 3.5 0 0 1 3.5-3.5Z" />
                </svg>
                <span class="apo-textvalue">${t ? t : "#000000"}</span>
              </label>
            </div>`
        ).append(inputColor);
        return (
          window.AP_POptions.apps.productoptions.themeAppExtensionId &&
            a.attr(
              "form",
              window.AP_POptions.apps.productoptions.themeAppExtensionId
            ),
          a.on("change", function () {
            createAvisContainerHidden(
              elemOptionAvisContainer,
              "",
              e,
              inputColor.val()
            );
          }),
          void 0 !== t && "" !== t && inputColor.val(t),
          a.on("blur", function () {
            window.AP_POptions.apps.productoptions.toggleInputError(a, !0);
            createAvisContainerHidden(
              elemOptionAvisContainer,
              "",
              e,
              inputColor.val()
            );
          }),
          i && a.prop("required", i),
          createAvisContainerHidden(
            elemOptionAvisContainer,
            "",
            e,
            inputColor.val()
          ),
          a
        );
      },
      _createFileInput: function (
        elemOptionAvisContainer,
        productId,
        e,
        isRequired,
        o
      ) {
        let inputFile = $("<input/>")
          .attr("type", "file")
          // .attr("field-name", e)
          .attr("name", e)
          .attr("id", o)
          .attr(
            "accept",
            ".jpeg, .jpg, .png, .gif, .webp, .tif, .tiff, .svg, .ico, .csv, .docx, .pdf, .xls, .xlsm, .xlsx, .txt, .ai, .eps, .psd"
          )
          .addClass("avp-file__input");

        let inputValue = $("<input/>")
          .attr("type", "hidden")
          .attr("field-name", e)
          // .attr("name", e)
          // .attr("id", o)
          // .attr(
          //   "accept",
          //   ".jpeg, .jpg, .png, .gif, .webp, .tif, .tiff, .svg, .ico, .csv, .docx, .pdf, .xls, .xlsm, .xlsx, .txt, .ai, .eps, .psd"
          // )
          .addClass("apo_value");

        if (isRequired) inputValue.prop("required", isRequired);
        var a = window.AP_POptions.$(
          `<div class="apo-file">
              <label class="apo-file__lable" for="${o}">
                <span class="apo-file__action">${
                  customizeryConfig.text_file_upload_button
                    ? customizeryConfig.text_file_upload_button
                    : "Choose File"
                }</span>
              </label>
            </div>`
        );

        inputFile.on("change", function () {
          window.AP_POptions.apps.productoptions.toggleInputError(a, !0);
          createAvisContainerHidden(
            elemOptionAvisContainer,
            productId,
            e,
            $(this).val()
          );
          findButtonAddCart(elemOptionAvisContainer, productId);
        });
        a.append(inputFile);
        a.append(inputValue);
        return (
          window.AP_POptions.apps.productoptions.themeAppExtensionId &&
            a.attr(
              "form",
              window.AP_POptions.apps.productoptions.themeAppExtensionId
            ),
          a.on("blur", function () {
            window.AP_POptions.apps.productoptions.toggleInputError(a, !0);
            createAvisContainerHidden(
              elemOptionAvisContainer,
              productId,
              e,
              $(this).val()
            );
            findButtonAddCart(elemOptionAvisContainer, productId);
          }),
          createAvisContainerHidden(elemOptionAvisContainer, productId, e, ""),
          // i && a.prop("required", i),
          a
        );
      },
      /* Xem chú thích cùng chỗ trong apo-product-options-v3.js. */
      _createParagraph: function (e) {
        var p = window.AP_POptions.$("<div></div>").addClass("avp-paragraph");
        window.apoSetHTML(p[0], e);
        return p;
      },
      _createSwitch: function (elemOptionAvisContainer, productId, option, id) {
        let elemInput = document.createElement("input");
        elemInput.setAttribute("type", "checkbox");
        elemInput.setAttribute("avp-data", "switch");
        elemInput.setAttribute("field-name", option?.label_cart);
        elemInput.setAttribute("name", option?.label_cart);
        elemInput.setAttribute("id", id);
        elemInput.setAttribute("autocomplete","off");

        elemInput.classList.add("avp-switch");

        let div = document.createElement("div");
        div.classList.add("apo-main__switch");

        let label = document.createElement("label");
        label.classList.add("apo-switch");
        label.setAttribute("for", id);

        let span = document.createElement("span");
        span.classList.add("apo-textvalue");
        span.innerHTML = option?.switch_label;

        div.append(elemInput);
        div.append(label);
        div.append(span);

        if (option?.default_status === "true") elemInput.checked = true;
        if (option?.required)
          elemInput.setAttribute("required", option?.required);
        createAvisContainerHidden(
          elemOptionAvisContainer,
          productId,
          option?.label_cart,
          ""
        );
        const handleChangeElement = function (event) {
          if (elemInput.checked) {
            elemInput.value = option?.switch_label;
            if (option?.required)
              window.AP_POptions.apps.productoptions.toggleInputError(
                $(div),
                !0
              );
          } else {
            elemInput.value = "";
          }

          createAvisContainerHidden(
            elemOptionAvisContainer,
            productId,
            option?.label_cart,
            $(elemInput).val()
          );
          findButtonAddCart(elemOptionAvisContainer, productId);
        };

        elemInput.removeEventListener("change", (event) =>
          handleChangeElement(event)
        );
        elemInput.addEventListener("change", handleChangeElement.bind());
        option?.default_status === "true" &&
          elemInput.dispatchEvent(new Event("change"));
        return $(div);
      },
      _createHeading: function (content, styles, color) {
        var h = window.AP_POptions.$(
          `<${styles} style="color: ${color};">` + content + `</${styles}>`
        ).addClass("avp-heading");
        return h;
      },
      _createDivider: function (borderStyles, dividerColor) {
        var thicknessDivider = borderStyles === "double" ? "3px" : "1px";
        var d = window.AP_POptions.$(
          `<div style="border-bottom: ${thicknessDivider} ${borderStyles} ${dividerColor};"></div>`
        ).addClass("avp-divider");
        return d;
      },
      _createModal: function (option) {
        let divButtonOnModal = document.createElement("div");
        divButtonOnModal.classList.add("avp-modal");
        divButtonOnModal.innerHTML = `<span class='apo-modal__title'>${
          option?.title_on_product ?? ""
        }</span>`;

        divButtonOnModal.addEventListener("click", function () {
          let modalPopup = AvisOptionsData.createModalPopup(option);
          let body = document.querySelector("body");
          body.append(modalPopup);
        });

        return $(divButtonOnModal);
      },
      _createSwatch: function (
        productId,
        elemOptionAvisContainer,
        t,
        n,
        i,
        o,
        quantityDefault
      ) {
        let isColor =
          t.is_color === true || t.is_color === false
            ? t.is_color
            : n.swatch.is_color;
        if (
          t.type === "swatch_single_image" ||
          t.type === "swatch_multi_image"
        ) {
          isColor = false;
        } else if (
          t.type === "swatch_single_color" ||
          t.type === "swatch_multi_color"
        ) {
          isColor = true;
        }

        var r = priceMod.getValueText(n, true),
          a = !isColor
            ? "background-image: url('" + n.swatch.file_image_url + "');"
            : `background:${n.swatch.color};`,
          swatchShape =
            t?.swatch_shape === "circle"
              ? "border-radius: 50% !important;"
              : "",
          s = window.AP_POptions.$(
            `<label class="avp-productoptionswatchwrapper${
              t?.type &&
              t.type.indexOf("swatch") > -1 &&
              (t?.hidden_variant_title != null &&
              t?.hidden_variant_title !== undefined
                ? t?.hidden_variant_title
                : customizeryConfig?.customize_options?.swatch
                    ?.hidden_variant_title)
                ? " avp-hiddenvarianttitleswatch"
                : ""
            }"></label>`
          ),
          addImg =
            !isColor && !isCustom149 && n.swatch.file_image_url
              ? `<img src="${n.swatch.file_image_url}" />`
              : "",
          addTooltip = isCustom149
            ? `<span class="apo-option-value-tooltip">${n.value}</span>`
            : "";
        (hiddenHoverImg = customizeryConfig?.hide_hover_img_swatches
          ? " hover-img-hidden-mobile"
          : ""),
          (p = window.AP_POptions.$(
          ((isColor || !t.allow_hover_img || t.allow_hover_img != "true") && !["62593958067"].includes(window.ap_front_settings.shop_id))
              ? `<span class="avp-productoptionswatch" style="${a}${swatchShape}"></span>`
              : `<div class="avp-productoptionswatch-box${hiddenHoverImg}"><span class="avp-productoptionswatch" data-src="${
                  isColor ? "" : n.swatch.file_image_url
                }" style="${a}${swatchShape}"></span>${addImg}${addTooltip}</div>`
          ));
        var c =
          t.allow_multiple == "true"
            ? e._createCheckboxButton(
                productId,
                elemOptionAvisContainer,
                t,
                n,
                !1,
                o,
                quantityDefault
              )
            : e._createRadioButton(
                productId,
                elemOptionAvisContainer,
                t,
                n,
                !1,
                o,
                quantityDefault
              );

        let valueWrapper = null;
        if (i) {
          let valueElement = s
            .append(
              priceMod.attachData(c, t.label_cart, n, r.display, productId)
            )
            .append(p)
            .append(
              t.type.indexOf("swatch") > -1 &&
                (t?.hidden_variant_title != null &&
                t?.hidden_variant_title !== undefined
                  ? t?.hidden_variant_title
                  : customizeryConfig?.customize_options?.swatch
                      ?.hidden_variant_title)
                ? window.AP_POptions.$(r.display)
                    .css({ display: "none" })
                    .prop("outerHTML")
                : r.display
            );
          if (t.show_option_value_qty) {
            valueWrapper = e._createQuantity(
              elemOptionAvisContainer,
              productId,
              valueElement,
              t.min_value_qty,
              t.max_value_qty,
              quantityDefault
            );
          } else valueWrapper = valueElement;
        }
        return i ? valueWrapper : c;
      },
      createRadioList: function (
        productId,
        elemOptionAvisContainer,
        e,
        t,
        n,
        optionDefaultValues,
        i
      ) {
        t.attr("id", n).removeAttr("for");
        var o = [];
        let indexValue = -1;
        let indexSetDefault = 0;
        let isSetDefault = false;
        let quantityDefault = -1;
        return (
          e.option_values &&
            window.AP_POptions.$.each(e.option_values, function () {
              let optionValue = this;
              indexValue += 1;
              if (
                optionDefaultValues &&
                optionDefaultValues.indexOf(optionValue["value_id"]) > -1
              ) {
                indexSetDefault = indexValue;
                isSetDefault = true;
              } else if (optionDefaultValues) {
                let arrValueDefault = optionDefaultValues.split(",");
                for (let value of arrValueDefault) {
                  let arrValue = value.split(" * ");
                  let newValue = arrValue[0].trim();
                  if (optionValue.value.trim() === newValue) {
                    indexSetDefault = indexValue;
                    isSetDefault = true;
                    if (arrValue.length > 1)
                      quantityDefault = parseInt(arrValue[1]);
                  }
                }
              }

              o.push(
                i(
                  productId,
                  elemOptionAvisContainer,
                  e,
                  this,
                  !0,
                  function (t) {
                    priceMod.variantChange(
                      e.label_cart,
                      $(o).map(function () {
                        return $(this).find("input").first();
                      }),
                      productId
                    );
                  },
                  quantityDefault
                )
              );
            }),
          o.length &&
            o[indexSetDefault].find("input").each(function () {
              if (isSetDefault) $(this).prop("checked", "checked");
              if (
                priceModAll[productId].radioInput &&
                priceModAll[productId].radioInput[e.label_cart]
              ) {
                priceModAll[productId].radioInput[e.label_cart].value = "";
              }
              $(this).trigger("change", ["onLoad"]);
            }),
          o
        );
      },
      createCheckboxList: function (
        productId,
        elemOptionAvisContainer,
        t,
        n,
        optionDefaultValues,
        i
      ) {
        var o = window.AP_POptions.$("<fieldset></fieldset>").append(
          window.AP_POptions.$("<legend></legend>")
            .attr(
              "style",
              "position: absolute !important;top: 0;clip: rect(1px, 1px, 1px, 1px) !important;overflow: hidden !important;height: 1px !important;width: 1px !important;padding: 0 !important;border: 0 !important;"
            )
            .text(t.label_product || "")
        );
        n.removeAttr("for"), t.required && o.attr("data-required", "true");
        var r = e._createHiddenInput(
          elemOptionAvisContainer,
          productId,
          t.label_cart
        );
        let isHasDefaultValue = false;

        let minTotalQuantity = 0;
        let maxTotalQuantity = 0;
        var desMinMax = null;
        if (t.show_option_value_qty && t.check_total_qty) {
          minTotalQuantity = parseInt(t.min_total_qty, 10);
          maxTotalQuantity = parseInt(t.max_total_qty, 10);

          if (minTotalQuantity > 0 || maxTotalQuantity > 0) {
            desMinMax = window.AP_POptions.$(
              "<p class='avp-productdescfont avp-productdesctextcolor avp-min-max-total'></p>"
            );
          }
        }

        return (
          o.append(r),
          t.option_values &&
            window.AP_POptions.$.each(t.option_values, function () {
              let valueDefault = false;
              let quantityDefault = -1;
              let optionValue = this;
              if (
                optionDefaultValues &&
                optionDefaultValues.indexOf(optionValue["value_id"]) > -1
              ) {
                valueDefault = true;
                isHasDefaultValue = true;
              } else if (optionDefaultValues) {
                let arrValueDefault = optionDefaultValues.split(",");
                for (let value of arrValueDefault) {
                  let arrValue = value.split(" * ");
                  let newValue = arrValue[0].trim();
                  if (optionValue.value.trim() === newValue) {
                    valueDefault = true;
                    isHasDefaultValue = true;
                    if (arrValue.length > 1)
                      quantityDefault = parseInt(arrValue[1]);
                  }
                }
              }
              o.append(
                i(
                  productId,
                  elemOptionAvisContainer,
                  t,
                  this,
                  !0,
                  valueDefault,
                  quantityDefault
                )
              );
            }),
          t.min_selections &&
            parseInt(t.min_selections, 10) > 0 &&
            o.data("min_selections", t.min_selections),
          minTotalQuantity > 0 && o.data("min_total_qty", minTotalQuantity),
          maxTotalQuantity > 0 && o.data("max_total_qty", maxTotalQuantity),
          desMinMax && (o = o.add(desMinMax)),
          o.on("change", async function () {
            let elemOnChange = this;
            if (elemOnChange.localName != "fieldset") return;
            var n = window.AP_POptions.$(this).find('input[type="checkbox"]');
            p_disabled(t, o, n),
              priceMod.variantChange(t.label_cart, n, productId),
              window.AP_POptions.apps.productoptions.toggleInputError(o, !0);

            function genVariantTitleHtml(thisObj) {
              $(document).ready(function () {
                var label = window.AP_POptions.$(thisObj)
                  .closest(".ap-options__swatch-container")
                  .find(".avp-option-title");

                var variantTitleHtml = n
                  .filter(":checked")
                  .map((_, data) =>
                    window.AP_POptions.$(
                      window.AP_POptions.$(data)
                        .parent()
                        .find(".swatch-variant-title")
                        .prop("outerHTML")
                    )
                      .css({
                        display: "inline-block",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        textTransform: "unset",
                      })
                      .prepend("| ")
                      .prop("outerHTML")
                  )
                  .toArray()
                  .join(" ");

                label.html(
                  `${t.label_product}${
                    n.required ? '<div class="avp-required">*</div>' : " "
                  }` + variantTitleHtml
                );
              });
            }
            if (
              t.type.indexOf("swatch") > -1 &&
              (t?.hidden_variant_title != null &&
              t?.hidden_variant_title !== undefined
                ? t?.hidden_variant_title
                : customizeryConfig?.customize_options?.swatch
                    ?.hidden_variant_title)
            ) {
              genVariantTitleHtml(elemOnChange);
            }
            var i = n
              .filter(":checked")
              .map(function () {
                return this.value;
              })
              .get()
              .join(",");
            r.val(i),
              await createAvisContainerHidden(
                elemOptionAvisContainer,
                productId,
                t.label_cart,
                i,
                $(elemOnChange),
                "fieldset"
              ),
              eventApi.fieldChange({
                name: t.label_cart,
                value: i,
                element: $(this).closest("div"),
              });

            e._createTotalAdd(elemOptionAvisContainer, productId);
            findButtonAddCart(elemOptionAvisContainer, productId);
          }),
          isHasDefaultValue && o.trigger("change"),
          o
        );
      },
      add: function (n, i, r, productInfo, s, elemOptionAvisContainer) {
        var p = [],
          c = "avp" + (n.option_id ?? n.label_cart) + "-" + r;
        "default" !== s && (c = c + "-" + s),
          ($formContainer = createAvisOptionContainer(
            productInfo,
            s,
            elemOptionAvisContainer
          ));
        if (!n.help_text_select) n.help_text_select = "tooltip";
        var l = window.AP_POptions.$("<label><label>")
            .attr("for", c)
            .addClass("avp-option-title")
            .addClass("avp-productdescfont")
            .addClass("avp-productdesctextcolor")
            .addClass(
              `${
                n?.title_style?.length
                  ? n.title_style
                      .map(
                        (style) => `avp-text${style !== "normal" ? style : ""}`
                      )
                      .join(" ")
                  : ""
              }`
            )
            .html(
              `${n.label_product}${
                n.required ? '<div class="avp-required">*</div>' : ""
              }` || ""
            );
          // d =
          //   n &&
          //   n.help_text_select &&
          //   "" !== n.help_text_select &&
          //   "uploadery" !== n.type
          //     ? n.help_text_select
          //     : "",
          // u =
          //   n && n.help_text && "" !== n.help_text && "uploadery" !== n.type
          //     ? n.help_text
          //     : "",
          // f = "";
          let helpTextSelect = n.help_text_select;
          let helpText = n.help_text;
          let helpTextSelector = null;
          let newHelpTextSelector = null;
          let newTooltipTextSelector = null;
          if (helpText && "below" === helpTextSelect)
            helpTextSelector = window.AP_POptions.$("<div><div>")
            .addClass("avp-productdescfont")
            .addClass("avp-productdesctextcolor")
            .addClass("ap-helptext")
            .html(helpText);
          else if (helpText&& "tooltip" === helpTextSelect)
          helpTextSelector = window.AP_POptions.$("<div><div>")
            .addClass("avp-productdescfont")
            .addClass("avp-productdesctextcolor")
            .addClass("ap-tooltip")
            .append(
              `<div class="apo-icons"><img src="${window.ap_front_settings.icon_tooltip}" style="width:15px" /></div><div class="ap-tooltip-inner"><p>${helpText}</p></div>`
            );
          else {
              helpTextSelect = "";
              if (n?.new_help_text) {
                newHelpTextSelector = document.createElement("div");
                newHelpTextSelector.classList.add("avp-productdescfont");
                newHelpTextSelector.classList.add("avp-productdesctextcolor");
                newHelpTextSelector.classList.add("ap-helptext");
                newHelpTextSelector.innerHTML = n?.new_help_text;
              }
              if (n?.tooltip_text) {
                newTooltipTextSelector = document.createElement("div");
                newTooltipTextSelector.classList.add("avp-productdescfont");
                newTooltipTextSelector.classList.add("avp-productdesctextcolor");
                newTooltipTextSelector.classList.add("ap-tooltip");
                newTooltipTextSelector.innerHTML = `<div><img src="${window.ap_front_settings.icon_tooltip}" style="width:15px; height:15px;" width="15" height="15" /></div><div class="ap-tooltip-inner">${n?.tooltip_text}</div>`;
              }
            }

        let optionDefaultValues = n["option_default_value"];
        if (!n["is_option_default_value"]) optionDefaultValues = null;
        switch (n.type) {
          case "text":
            p.push(
              e._createTextInput(
                elemOptionAvisContainer,
                s,
                n.label_cart,
                n["default_value"],
                n.placeholder,
                n.max_length,
                n.min_length,
                n.required,
                c,
                n["allow_value"],
                n["text_transform"]
              )
            );
            break;
          case "number":
            p.push(
              e._createNumberInput(
                elemOptionAvisContainer,
                s,
                n.label_cart,
                n["default_value"],
                n.placeholder,
                n.min,
                n.max,
                n.required,
                c
              )
            );
            break;
          case "date":
            var dateHtml = e._createDateInput(
              elemOptionAvisContainer,
              s,
              n.label_cart,
              n["default_value"],
              n.placeholder,
              n.required,
              c
            );
            n.element_id = c;
            p.push(dateHtml);
            break;
          case "textarea":
            p.push(
              e._createTextArea(
                elemOptionAvisContainer,
                s,
                n.label_cart,
                n["default_value"],
                n.placeholder,
                n.max_length,
                n.required,
                c,
                n.text_transform,
                n.min_length
              )
            );
            break;
          case "color":
            var colorHtml = e._createColorInput(
              elemOptionAvisContainer,
              n.label_cart,
              n["default_value"],
              n.required,
              c
            );
            n.element_id = c;
            p.push(colorHtml);
            break;
          case "file":
            var colorHtml = e._createFileInput(
              elemOptionAvisContainer,
              s,
              n.label_cart,
              n.required,
              c
            );
            n.element_id = c;
            p.push(colorHtml);
            break;
          case "paragraph":
            var paragraphHtml = e._createParagraph(n.rich_text_value);
            p.push(paragraphHtml);
            break;
          case "switch":
            var switchHtml = e._createSwitch(elemOptionAvisContainer, s, n, c);
            n.element_id = c;
            p.push(switchHtml);
            break;
          case "heading":
            var headingHtml = e._createHeading(
              n.content_heading,
              n.styles_heading,
              n.heading_color
            );
            p.push(headingHtml);
            break;
          case "divider":
            var dividerHtml = e._createDivider(
              n.border_styles,
              n.divider_color
            );
            p.push(dividerHtml);
            break;
          case "modal":
            var modalhHtml = e._createModal(n);
            p.push(modalhHtml);
            break;
          case "radio":
            var h = e.createRadioList(
              s,
              elemOptionAvisContainer,
              n,
              l,
              c,
              optionDefaultValues,
              e._createRadioButton
            );
            window.AP_POptions.$.merge(p, h);
            break;
          case "swatch":
          case "swatch_single_color":
          case "swatch_single_image":
          case "swatch_multi_color":
          case "swatch_multi_image":
            if (n.allow_multiple == "true") {
              var v = e.createCheckboxList(
                s,
                elemOptionAvisContainer,
                n,
                l,
                optionDefaultValues,
                e._createSwatch
              );
              p.push(v);
            } else {
              var h = e.createRadioList(
                s,
                elemOptionAvisContainer,
                n,
                l,
                c,
                optionDefaultValues,
                e._createSwatch
              );
              window.AP_POptions.$.merge(p, h);
            }
            break;
          case "checkbox":
            var v = e.createCheckboxList(
              s,
              elemOptionAvisContainer,
              n,
              l,
              optionDefaultValues,
              e._createCheckboxButton
            );
            p.push(v);
            break;
          case "select":
            var g = e._createSelectMenu(
              s,
              elemOptionAvisContainer,
              n.label_cart,
              n.option_values,
              n.placeholder,
              n.required,
              c,
              optionDefaultValues,
              n
            );
            p.push(g);
            break;
        }
        if (p.length) {
          var y = n["class_name"] || "",
            w = window.AP_POptions.$("<div></div>").addClass(y);
          var classOptions = "";
          var classOptionsSwatch = "";
          switch (n.type) {
            case "text":
              classOptions = "ap-options__text";
              break;
            case "number":
              classOptions = "ap-options__number";
              break;
            case "date":
              classOptions = "ap-options__date";
              break;
            case "color":
              classOptions = "ap-options__color";
              break;
            case "file":
              classOptions = "ap-options__file";
              break;
            case "textarea":
              classOptions = "ap-options__textarea";
              break;
            case "radio":
              classOptions = "ap-options__radio";
              break;
            case "swatch":
              classOptions = "ap-options__swatch";
              if (n.allow_multiple == "true")
              {
                classOptionsSwatch = "ap-swatch__multi";
              }
              break;
            case "swatch_single_color":
            case "swatch_single_image":
              classOptions = "ap-options__swatch";
              classOptionsSwatch = "ap-swatch__single";
              if (n.type === "swatch_single_image" && n?.not_deselect)
              {
                classOptions += " apo-not-deselect";
              }
              break;
            case "swatch_multi_color":
            case "swatch_multi_image":
              classOptions = "ap-options__swatch";
              classOptionsSwatch = "ap-swatch__multi";
              break;
            case "checkbox":
              classOptions = "ap-options__checkbox";
              break;
            case "switch":
              classOptions = "ap-options__switch";
              break;
            case "heading":
              classOptions = "ap-options__heading";
              break;
            case "select":
              classOptions = "ap-options__select";
          }
          if ("uploadery" !== n.type && n.label_product && !n?.hidden_label)
            if ("tooltip" === helpTextSelect  || newTooltipTextSelector) {
              var b = window.AP_POptions.$("<div></div>")
                .addClass("ap-label-tooltip")
                .append(l);
              if (helpTextSelector?.length) b.append(helpTextSelector);
              if (newTooltipTextSelector) b.append($(newTooltipTextSelector));
              w.append(b);
            } else w.append(l);

          w.addClass(
            `avp-option ${`${classOptions}-container`} ${
              isCustom149 ? "custom-149" : ""
            }`
          );
          n?.column_width && w.addClass(`avp-columnwidth-${n.column_width}`),
            ("radio" == n.type ||
              (n.type.indexOf("swatch") > -1 &&
                n.allow_multiple === "false")) &&
              w.attr("role", "group").attr("aria-labelledby", c);

          let spanSelector = document.createElement("span");
          if (classOptions) spanSelector.classList.add(...classOptions.split(" "));
          if (classOptionsSwatch)
            spanSelector.classList.add(classOptionsSwatch);
          if (
            n?.column_width_variant &&
            n?.column_width_variant !== "default"
          ) {
            spanSelector.classList.add(
              `ap-col__${
                n?.column_width_variant !== "default" && n?.column_width_variant
              }`
            );
            spanSelector.classList.remove("ap-col__22", "ap-col__30", "ap-col__46", "ap-col__100");
          } else if (n?.column_width_variant === "default") {
            spanSelector.classList.remove(
              `ap-col__${
                n?.column_width_variant !== "default" && n?.column_width_variant
              }`
            );
            spanSelector.classList.remove("ap-col__22", "ap-col__30", "ap-col__46", "ap-col__100");
          }
          if (
            n.required &&
            ("radio" == n.type ||
              (n.type.indexOf("swatch") > -1 && n.allow_multiple === "false"))
          ) {
            spanSelector.setAttribute("data-required", "true");
          }
          if ("below" === helpTextSelect || n?.new_help_text) {
            for (let item of p) {
              spanSelector.appendChild(item[0]);
            }
            if (helpTextSelector) spanSelector.appendChild(helpTextSelector[0]);
            if (newHelpTextSelector) spanSelector.appendChild(newHelpTextSelector);
          } else {
            for (let item of p) {
              spanSelector.appendChild(item[0]);
            }
          }

          if (
            isCustom149 &&
            n.type.indexOf("swatch") > -1 &&
            n.allow_multiple === "false"
          ) {
            let customWrapper = document.createElement("div");
            customWrapper.classList.add("apo-custom-wrapper");
            let colLeft = document.createElement("div");
            colLeft.classList.add("apo-col-left");
            let mainA = document.createElement("a");
            mainA.classList.add("apo-image-modal");

            let imageDefault =
              "assets/images/No-Image-bc4a89ed-3.png";
            let isSetDefault = false;
            if (optionDefaultValues) {
              let findOptionValueDefault = n.option_values.filter(
                (e) => e.value_id === optionDefaultValues
              );
              if (
                findOptionValueDefault.length > 0 &&
                findOptionValueDefault[0]?.swatch &&
                !n?.is_color &&
                !findOptionValueDefault[0]?.swatch?.is_color &&
                findOptionValueDefault[0]?.swatch?.file_image_url
              ) {
                isSetDefault = true;
                imageDefault =
                  findOptionValueDefault[0]?.swatch?.file_image_url;
              }
            }
            mainA.innerHTML = `<svg class="svg-inline--fa fa-search-plus fa-w-16 position-absolute text-primary" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="search-plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M304 192v32c0 6.6-5.4 12-12 12h-56v56c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-56h-56c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h56v-56c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v56h56c6.6 0 12 5.4 12 12zm201 284.7L476.7 505c-9.4 9.4-24.6 9.4-33.9 0L343 405.3c-4.5-4.5-7-10.6-7-17V372c-35.3 27.6-79.7 44-128 44C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 48.3-16.4 92.7-44 128h16.3c6.4 0 12.5 2.5 17 7l99.7 99.7c9.3 9.4 9.3 24.6 0 34zM344 208c0-75.2-60.8-136-136-136S72 132.8 72 208s60.8 136 136 136 136-60.8 136-136z"></path></svg>
                            <img class="apo-main-image" src="${imageDefault}">`;
            mainA.addEventListener("click", showPopupImageSwatch.bind(this));
            colLeft.appendChild(mainA);

            let colRight = document.createElement("div");
            colRight.classList.add("apo-col-right");
            let customInput = e._createTextInput(
              `Custom ${n.label_cart}`,
              "",
              `Custom ${n.label_cart}`,
              "",
              "",
              "",
              ""
            );
            colRight.appendChild(spanSelector);
            colRight.appendChild(customInput[0]);
            customWrapper.appendChild(colLeft);
            customWrapper.appendChild(colRight);
            w[0].appendChild(customWrapper);
          } else {
            w[0].appendChild(spanSelector);
          }
          conditionalLogicInstances[s].register(
            elemOptionAvisContainer,
            s,
            n,
            w,
            p
          ),
            appendOption(
              n,
              w,
              productInfo,
              s,
              $formContainer,
              elemOptionAvisContainer
            );
        }
      },
    };

    function createAvisOptionContainer(
      productInfo,
      productId,
      elemOptionAvisContainer
    ) {
      if (productId != apoProductDefault) {
        let container = elemOptionAvisContainer.querySelector(
          `.${container_AP_POptions}`
        );
        if (container) return $(container);

        let containerOptionAvis = $(
          "<div class=" + container_AP_POptions + "></div>"
        );

        let elementProductPageSelector = getFormAddToCart(
          elemOptionAvisContainer
        );
        appendOptionByWidget(
          customizeryConfig,
          $(elemOptionAvisContainer),
          containerOptionAvis,
          productInfo,
          true,
          elementProductPageSelector
        );

        return containerOptionAvis;
      }

      let editOptionPopup = document.querySelector(
        "[data-avis-cart-popup-form] .avis-popupBody"
      );
      if (editOptionPopup) {
        let containerPopup = editOptionPopup.querySelector(
          "#" + container_AP_POptions
        );
        if (containerPopup) return $(containerPopup);
      } else {
        if ($("#" + container_AP_POptions).length > 0) {
          return $("#" + container_AP_POptions);
        }
      }

      let isExistFormProduct = false;
      let containerOptionAvis = $(
        "<div id=" +
          container_AP_POptions +
          " class=" +
          container_AP_POptions +
          "></div>"
      );
      if (!isExistFormProduct) {
        let formAppendProductPage = null;
        let formAppendProductPageJS = null;
        let listKeyAppendOption = window.AP_POptions.listKeyAppendOptionPG;

         if (window.ap_front_settings.shop_id === "74326999343") {
           listKeyAppendOption = ["form[action*='/cart/add'][data-product-form]:not(.installment)"];
         }
         if (window.ap_front_settings.shop_id === "75836391770") {
          listKeyAppendOption = ["form[action*='/cart/add'][id^='AddToCartForm--']"].concat(listKeyAppendOption);
        }

        for (
          let indexKey = 0;
          indexKey < listKeyAppendOption.length;
          indexKey++
        ) {
          let element = document.querySelectorAll(
            listKeyAppendOption[indexKey]
          );
          if (element && element.length > 0) {
            for (let elm of element) {
              let buttonAddCart = elm.querySelector(
                window.AP_POptions.addToCartButton
              );
              if (buttonAddCart) {
                formAppendProductPage = $(elm);
                formAppendProductPageJS = elm;
                isExistFormProduct = true;
                break;
              } else {
                formAppendProductPage = $(elm);
                formAppendProductPageJS = elm;
                if (editOptionPopup) {
                  isExistFormProduct = true;
                }
              }
            }
          }

          if (isExistFormProduct) break;
        }

        if (formAppendProductPage) {
          priceMod.avisAddCartForm = formAppendProductPage;
          priceMod.avisAddCartFormActive = formAppendProductPage;
          priceMod.avisAddCartFormActiveJS = formAppendProductPageJS;
        }
      }

      appendOptionByWidget(
        customizeryConfig,
        priceMod.avisAddCartFormActive,
        containerOptionAvis,
        productInfo,
        false,
        priceMod.avisAddCartFormActiveJS
      );

      return containerOptionAvis;
    }

    // elemExistInContainer is avis container or quickview or featured product
    function getFormAddToCart(sectionPageSelector) {
      if (!sectionPageSelector) {
        sectionPageSelector = document;
      }

      let formAddCartsSelector = sectionPageSelector.querySelectorAll(
        window.AP_POptions.apps.productoptions.formAddOptionClassProductPage
      );
      if (formAddCartsSelector && formAddCartsSelector.length > 0) {
        for (let elm of formAddCartsSelector) {
          let buttonAddCart = elm.querySelector(
            window.AP_POptions.addToCartButton
          );
          if (buttonAddCart) {
            return elm;
          }
        }

        return formAddCartsSelector[0];
      }

      return null;
    }

    function appendOptionByWidget(
      customizeryConfig,
      avisAddCartFormActive,
      containerOptionAvis,
      productInfo,
      isMultiPage,
      elementProductPageSelector
    ) {
      let widget = customizeryConfig.widget;
      let position =
        !widget || !widget.position || widget.position == "default"
          ? "prepend"
          : widget.position.split("_")[0];
      let keyElement =
        !widget || !widget.position || widget.position == "default"
          ? "default"
          : widget.position.split("_")[1];
      let elementProductPage = null;
      switch (keyElement) {
        case "variant":
          let selectorAll = $(window.AP_POptions.variantWrapper);
          if (isMultiPage) {
            selectorAll = avisAddCartFormActive.find(
              window.AP_POptions.variantWrapper
            );
          }
          index = "before" == position ? 0 : selectorAll.length - 1;
          elementProductPage =
            !(!selectorAll.length || !selectorAll[index]) && selectorAll[index];
          break;
        case "atc":
          elementProductPage = avisAddCartFormActive.find(
            window.AP_POptions.addToCartButton
          );
          break;
        case "selector":
          if (widget && widget.selector) {
            let elementSelector = $(widget.selector);
            if (isMultiPage) {
              selectorAll = avisAddCartFormActive.find(widget.selector);
            }
            if (elementSelector.length > 0)
              elementProductPage = elementSelector;
          }
          break;

        case "default":
          elementProductPage =
            elementProductPageSelector &&
            (elementProductPageSelector.length === undefined ||
              elementProductPageSelector.length > 0)
              ? $(elementProductPageSelector)
              : avisAddCartFormActive;
          if (
            avisAddCartFormActive.find("div#ecom__avis-plus--product-options")
              .length
          ) {
            elementProductPage = avisAddCartFormActive
              .find("div#ecom__avis-plus--product-options")
              .first();
          }
      }

      switch (position) {
        case "before":
          elementProductPage &&
          (elementProductPage.length === undefined ||
            elementProductPage?.length > 0)
            ? containerOptionAvis.insertBefore(elementProductPage)
            : avisAddCartFormActive.prepend(containerOptionAvis);
          break;
        case "after":
          elementProductPage &&
          (elementProductPage.length === undefined ||
            elementProductPage?.length > 0)
            ? containerOptionAvis.insertAfter(elementProductPage)
            : avisAddCartFormActive.prepend(containerOptionAvis);
          break;
        case "prepend":
          elementProductPage &&
          (elementProductPage.length === undefined ||
            elementProductPage?.length > 0)
            ? elementProductPage.prepend(containerOptionAvis)
            : avisAddCartFormActive.prepend(containerOptionAvis);
          break;
        case "append":
          elementProductPage &&
          (elementProductPage.length === undefined ||
            elementProductPage?.length > 0)
            ? elementProductPage.append(containerOptionAvis)
            : avisAddCartFormActive.prepend(containerOptionAvis);
          break;
        default:
          avisAddCartFormActive.prepend(containerOptionAvis);
      }
      // Released from i_lasted once findButtonAddCart has bound the validation, not
      // here: createAvisOptionContainer memoises, so this runs on the first add() of
      // the option loop, with nothing rendered and nothing listening on the button.
    }

    async function createAvisContainerHidden(
      elemOptionAvisContainer,
      productId,
      fieldName,
      value,
      elem,
      elementName,
      isQuantity = false,
      elmQuantity
    ) {
      // Cùng lý do như trong _createHiddenInput: fieldName phải ở dạng đã trim
      // trước khi dựng selector, nếu không lần gọi sau (label đã bị trim ở nơi khác)
      // sẽ không thấy input cũ và tạo thêm một input hidden trùng lặp.
      if (typeof fieldName === "string") fieldName = fieldName.trim();
      let avisAddCartFormActive = null;
      let avisAddCartFormActiveJS = null;
      if (productId === apoProductDefault) {
        avisAddCartFormActive = priceMod.avisAddCartFormActive;
        avisAddCartFormActiveJS = priceMod.avisAddCartFormActiveJS;
      } else {
        let formAddToCart = getFormAddToCart(elemOptionAvisContainer);
        if (formAddToCart) {
          avisAddCartFormActive = $(formAddToCart);
          avisAddCartFormActiveJS = formAddToCart;
        }
      }

      if (!avisAddCartFormActive || avisAddCartFormActive.length == 0) {
        console.log("Not Found Form Product");
        return;
      }

      let containerOptionHiddenAvis = avisAddCartFormActiveJS.querySelector(
        `.${window.AP_POptions.classContainerHidden}`
      );
      if (containerOptionHiddenAvis)
        containerOptionHiddenAvis = $(containerOptionHiddenAvis);

      if (containerOptionHiddenAvis && containerOptionHiddenAvis.length > 0) {
      } else {
        containerOptionHiddenAvis = $(
          `<div class='${window.AP_POptions.classContainerHidden}'></div>`
        );
        avisAddCartFormActive.append(containerOptionHiddenAvis);
      }

      let findInput = containerOptionHiddenAvis.find(
        `input[name="properties[${fieldName}]"]`
      );

      if (elem) {
        let elementBoxOption = null;
        // When checked option value for checkbox
        if (elementName == "fieldset") {
          elementBoxOption = elem;
        } else {
          let parents = elem.parents(".avp-value-grid");
          if (parents.length > 0) {
            elementBoxOption =
              parents.parent().length > 0 ? parents.parent() : parents;
          }
        }
        if (!elementBoxOption) elementBoxOption = elem;

        if (!isQuantity) {
          elementBoxOption.find("input.avp-qty-input").each(function () {
            $(this).attr("disabled", "disabled");
          });

          elementBoxOption.find("button.avp-qty-button").each(function () {
            $(this).attr("disabled", "disabled");
          });
        }

        let totalQuantity = 0;
        elementBoxOption.find(":checked").map(function () {
          let quantityInput = $(this)
            .parents(".avp-value-grid")
            .find("input.avp-qty-input");
          if (quantityInput && quantityInput.length > 0) {
            let quantity = quantityInput.val();
            if (!quantity) quantity = 1;
            if ($(this).val()) {
              if (!isQuantity) {
                quantityInput.removeAttr("disabled");
              }

              let min = quantityInput.attr("min");
              let max = quantityInput.attr("max");
              let quantityButtonCut = $(this)
                .parents(".avp-value-grid")
                .find("button.avp-qty-cut");
              quantityButtonCut.each(function () {
                if (min && parseInt(quantity) > parseInt(min)) {
                  $(this).removeAttr("disabled");
                } else {
                  $(this).attr({ disabled: "disabled" });
                }
              });

              let quantityButtonAdd = $(this)
                .parents(".avp-value-grid")
                .find("button.avp-qty-add");
              quantityButtonAdd.each(function () {
                if (!max || (max && parseInt(quantity) < parseInt(max))) {
                  $(this).removeAttr("disabled");
                } else {
                  $(this).attr({ disabled: "disabled" });
                }
              });

              totalQuantity += parseInt(quantity);
              return `${$(this).val()} * ${parseInt(quantity)}`;
            }
          }
          totalQuantity += 1;
          return this.value;
        });

        // Reset input quantity to min when unchecked
        elementBoxOption
          .find("input[type=checkbox]:not(:checked)")
          .each(function () {
            let inputQuantityElm = $(this)
              .closest(".avp-value-grid")
              .find("input.avp-qty-input");
            if (inputQuantityElm)
              inputQuantityElm.val(inputQuantityElm.attr("min"));
          });

        if (elementBoxOption && elementBoxOption.data("min_total_qty")) {
          window.AP_POptions.apps.productoptions.toggleInputError(
            elementBoxOption,
            !0
          );
          if (
            elementBoxOption.parent("span") &&
            elementBoxOption.parent("span").find(".avp-min-max-total")
          ) {
            if (totalQuantity < elementBoxOption.data("min_total_qty")) {
              let notify =
                window.AP_POptions.apps.productoptions.strings.totalQuantityMin;
              if (
                customizeryConfig.text_customization_notification_min_quantity
              ) {
                notify =
                  customizeryConfig.text_customization_notification_min_quantity;
              }
              elementBoxOption
                .parent("span")
                .find(".avp-min-max-total")
                .html(
                  notify
                    .replace("{selected_quantity}", totalQuantity)
                    .replace(
                      "{min_total_quantity}",
                      elementBoxOption.data("min_total_qty")
                    )
                );
            }
          }
        }
        if (elementBoxOption && elementBoxOption.data("max_total_qty")) {
          window.AP_POptions.apps.productoptions.toggleInputError(
            elementBoxOption,
            !0
          );
          if (totalQuantity >= elementBoxOption.data("max_total_qty")) {
            // Reset input quantity when total quantity > max total quantity
            if (
              elmQuantity &&
              totalQuantity > elementBoxOption.data("max_total_qty")
            ) {
              let tempQuantity =
                totalQuantity - elementBoxOption.data("max_total_qty");
              let newQuantity = parseInt($(elmQuantity).val()) - tempQuantity;
              $(elmQuantity).val(newQuantity);
            }

            elementBoxOption.find(":checked").map(function () {
              let quantityButtonCut = $(this)
                .parents(".avp-value-grid")
                .find("button.avp-qty-add");
              quantityButtonCut.each(function () {
                $(this).attr({ disabled: "disabled" });
              });
            });
          }

          // Remove disable checkbox has min quantity add to quantity <= total max quantity
          elementBoxOption
            .find("input[type=checkbox]:not(:checked)")
            .each(function () {
              let inputQuantityElm = $(this)
                .closest(".avp-value-grid")
                .find("input.avp-qty-input");
              if (inputQuantityElm) {
                if (
                  totalQuantity + parseInt(inputQuantityElm.attr("min")) <=
                  elementBoxOption.data("max_total_qty")
                ) {
                  this.removeAttribute("disabled");
                } else {
                  this.disabled = "disabled";
                }
              }
            });
          if (
            !elementBoxOption.data("min_total_qty") ||
            (elementBoxOption.data("min_total_qty") &&
              totalQuantity >= elementBoxOption.data("min_total_qty"))
          ) {
            let notify =
              window.AP_POptions.apps.productoptions.strings.totalQuantityMax;
            if (
              customizeryConfig.text_customization_notification_max_quantity
            ) {
              notify =
                customizeryConfig.text_customization_notification_max_quantity;
            }
            elementBoxOption
              .parent("span")
              .find(".avp-min-max-total")
              .html(
                notify
                  .replace("{selected_quantity}", totalQuantity)
                  .replace(
                    "{max_total_quantity}",
                    elementBoxOption.data("max_total_qty")
                  )
              );
          }
        }

        let tempValueArr = elementBoxOption.find(":checked").map(function () {
          let quantityInput = $(this)
            .parents(".avp-value-grid")
            .find("input.avp-qty-input");
          if (quantityInput && quantityInput.length > 0) {
            let quantity = quantityInput.val();
            if (!quantity) quantity = 1;
            if ($(this).val()) {
              var variantString = $(this).data("variant-string");
              if (priceModAll[productId].activeVariants[variantString]) {
                priceModAll[productId].activeVariants[variantString][
                  "quantity"
                ] = parseInt(quantity);
              }

              return `${$(this).val()} * ${parseInt(quantity)}`;
            }
          }
          return this.value;
        });
        let tempValue = tempValueArr.get().join(",");
        if (tempValue) value = tempValue;

        if (
          !tempValue &&
          elementBoxOption.parent("span").find(".avp-min-max-total")
        ) {
          elementBoxOption.parent("span").find(".avp-min-max-total").html("");
        }
      }

      if (findInput && findInput.length > 0) {
        if (!findInput.attr("name-disabled"))
        {
          if (value)
          {
            if (findInput.attr("disabled")) findInput.removeAttr("disabled");
          }
          else findInput.attr("disabled","disabled");
        }
        findInput.val(value);
      } else {
        let inputHidden = e._createHiddenInput(
          avisAddCartFormActive,
          productId,
          fieldName,
          true
        );
        if (value) inputHidden.val(value);
        if (!inputHidden.attr("name-disabled"))
        {
          if (value)
          {
            if (inputHidden.attr("disabled")) inputHidden.removeAttr("disabled");
          }
          else inputHidden.attr("disabled","disabled");
        }
        containerOptionHiddenAvis.append(inputHidden);
      }

      if (!customizeryConfig?.cart_page?.edit_options) return;
      let isHasApo = false;
      avisAddCartFormActive
        .find("input[name*=properties]")
        .each(function (e, t) {
          if (
            t.name &&
            t.name.indexOf("properties[") > -1 &&
            t.value &&
            t.name !== "properties[_has_apo]"
          ) {
            isHasApo = true;
          }
        });

      if (
        isHasApo &&
        !avisAddCartFormActiveJS.querySelector(
          "input[name='properties[_has_apo]']"
        )
      ) {
        let inputHidden = e._createHiddenInput(
          avisAddCartFormActive,
          productId,
          "_has_apo",
          true
        );
        inputHidden.val(true);
        containerOptionHiddenAvis.append(inputHidden);
      } else if (
        !isHasApo &&
        avisAddCartFormActiveJS.querySelector(
          "input[name='properties[_has_apo]']"
        )
      ) {
        avisAddCartFormActiveJS
          .querySelector("input[name='properties[_has_apo]']")
          .remove();
      }
    }

    function hideConditionLogic(
      e,
      productInfo,
      productId,
      elemOptionAvisContainer
    ) {
      var o = conditionalLogicInstances[productId];
      if (
        ((e =
          e ||
          createAvisOptionContainer(
            productInfo,
            productId,
            elemOptionAvisContainer
          )),
        o.active && !e.hasClass("io-inputs-loading"))
      ) {
        window.AP_POptions.apps.productoptions.containerCssDisplay =
          e.css("display");
        var r = e[0];
        r.style.setProperty("display", "none", "important"),
          e.addClass("io-inputs-loading");
      }
    }
    function i_lasted(productInfo, productId, elemOptionAvisContainer) {
      var formContainer = createAvisOptionContainer(
        productInfo,
        productId,
        elemOptionAvisContainer
      );
      var i = conditionalLogicInstances[productId];
      i.active &&
        i.runAfterTimeouts(async function () {
          var i = formContainer[0];
          i.style.removeProperty("display"),
            "none" !==
              window.AP_POptions.apps.productoptions.containerCssDisplay &&
              i.style.setProperty(
                "display",
                window.AP_POptions.apps.productoptions.containerCssDisplay ||
                  "block",
                ""
              ),
            formContainer.removeClass("io-inputs-loading");
        });

      createTotalAdd(elemOptionAvisContainer, productId);
      let btnsAddToCartDisabled = window.ap_front_settings.btn_add_to_cart_disabled;
      if(btnsAddToCartDisabled && btnsAddToCartDisabled.length) {
        for(let btnAddTocart of btnsAddToCartDisabled) {
          btnAddTocart.disabled = false;
        }
      }
      // Bind before freeing the button. findButtonAddCart was otherwise only reached
      // by the setInterval(..., 300) in mainCheckAllRules, so the release above beat
      // it and the theme's own submit owned the click for that gap.
      findButtonAddCart(elemOptionAvisContainer, productId);
      // apo-atc-lock.js also holds the payment buttons, which clearing `disabled`
      // does not touch, so its release still has to run. Same 200ms as before: the
      // per option appends are async and still finishing here.
      if (typeof window.removeDisabledBtnAddCart === "function") {
        setTimeout(window.removeDisabledBtnAddCart, 200);
      }
    }
    function appendOption(
      optionInfo,
      boxOption,
      productInfo,
      productId,
      formContainer,
      elemOptionAvisContainer
    ) {
      var formContainer = formContainer, //|| t(o, r),
        conditionlogic = conditionalLogicInstances[productId];
      formContainer &&
        (hideConditionLogic(
          formContainer,
          productInfo,
          productId,
          elemOptionAvisContainer
        ),
        formContainer.append(boxOption),
        eventApi.fieldLoad({
          productId: productId,
          name: optionInfo.label_cart,
          element: boxOption,
          fieldConfig: optionInfo,
          hasConditionalLogic:
            !!conditionlogic.reactions[optionInfo.label_cart],
        }));

      if (optionInfo.type == "color") {
        let inputColor = $("input[field-name='" + optionInfo.label_cart + "']");
        if (inputColor) {
          createAvisContainerHidden(
            elemOptionAvisContainer,
            productId,
            optionInfo.label_cart,
            inputColor.val()
          );
        }
      }

      if (optionInfo.type === "date") {
        var options = {
          theme: {
            bgcolor: "#275efe",
            color: "#ffffff",
            pnColor: "#53c0d9",
          },
          isToday: false,
          onClose: false,
          trigger: "click",
          language: {
            name: "en",
            month: [
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
              "12",
            ],
            weeks: ["SU", "MO", "TU", "WE", "TH", "FR", "SA"],
            times: ["Hour", "Minute", "Second"],
            timetxt: ["Time", "Start Time", "End Time"],
            backtxt: "Back",
            clear: "Clear",
            today: "Now",
            yes: "Confirm",
            close: "Close",
          },
          format: optionInfo.date_format,
          donefun: function (t) {
            $(`#${optionInfo.element_id}`).change();
          },
        };

        // Set mindate
        switch (optionInfo.min_date_type) {
          case "today":
            options.minDate = formatDate(new Date(), "yyyy-MM-dd") + " ";
            break;

          case "designated":
            if (optionInfo.min_date_value) {
              options.minDate = optionInfo.min_date_value;
            }
        }
        // Set maxdate
        switch (optionInfo.max_date_type) {
          case "today":
            options.maxDate = formatDate(new Date(), "yyyy-MM-dd") + " ";
            break;

          case "designated":
            if (optionInfo.max_date_value) {
              options.maxDate = optionInfo.max_date_value;
            }
        }
        window.ap_front_settings.jeDate(`#${optionInfo.element_id}`, options);
      }

      if (optionInfo.type === "color") {
        window.ap_front_settings.jeColor(`#${optionInfo.element_id}`, options);
      }
      if (optionInfo.type === "file") {
        const fileFlag = {
          is_multi_files: false,
          is_cropper: false,
        };
        window.ap_front_settings.file(
          elemOptionAvisContainer,
          productId,
          productInfo,
          `#${optionInfo.element_id}`,
          options,
          $,
          createAvisContainerHidden,
          null,
          optionInfo.default_value,
          fileFlag
        );
      }
    }

    function formatDate(date, format) {
      var t = format;
      var i = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
      };
      for (var e in (/(y+)/.test(t) &&
        (t = t.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        )),
      i))
        new RegExp("(" + e + ")").test(t) &&
          (t = t.replace(
            RegExp.$1,
            1 == RegExp.$1.length
              ? i[e]
              : ("00" + i[e]).substr(("" + i[e]).length)
          ));
      return t;
    }
    function createLinkCss(href) {
      if (!href) return;

      let mainCssSelector = document.createElement("link");
      mainCssSelector.setAttribute("href", href);
      mainCssSelector.setAttribute("rel", "stylesheet");
      mainCssSelector.setAttribute("type", "text/css");
      document.head.appendChild(mainCssSelector);
    }
    async function mainRenderOptions(
      t,
      productInfo,
      o,
      elemOptionAvisContainer
    ) {
      //   var r = elemOptionAvisContainer.querySelector(`.${container_AP_POptions}`);
      let productHandles = [];
      for (let optionSet of t) {
        if (optionSet.options && optionSet.options.length > 0) {
          for (let option of optionSet.options) {
            if (option && option.option_values) {
              for (let optionValue of option.option_values.filter(
                (x) =>
                  x.handle &&
                  (x.type == "useexistingvariant" || x.type == "chargeorbundle")
              )) {
                if (!productHandles.includes(optionValue.handle))
                  productHandles.push(optionValue.handle);
              }
            }
          }
        }
      }
      // !elemOptionAvisContainer && r.length > 1 && spLog(!0, "multiple containers", !0), r.empty();
      if (productHandles.length > 0)
        await priceMod.getAllProductVariantBundles(productHandles);

      if (
        window.ap_front_settings?.url_css_date &&
        t &&
        t.filter((x) => x.options.filter((y) => y?.type === "date").length > 0)
          .length > 0
      ) {
        createLinkCss(window.ap_front_settings?.url_css_date);
      }
      var l = conditionalLogicInstances[o];
      var d = t
        .filter(function (e, t) {
          return (
            !(!e.options || !e.options.length) && (l.init(e.options, !t), !0)
          );
        })
        .map(async function (t, i) {
          return (
            $.each(t.options, async function (t, r) {
              if (priceMod.cartItemEdit && priceMod.cartItemEdit.properties) {
                if (
                  priceMod.cartItemEdit.properties.hasOwnProperty(r.label_cart)
                ) {
                  let valueOptionInCart =
                    priceMod.cartItemEdit.properties[r.label_cart];
                  r.default_value = valueOptionInCart;

                  if (valueOptionInCart && r.option_values) {
                    r.is_option_default_value = true;
                    r.option_default_value = valueOptionInCart;
                  }
                }
              }

              if (
                r.option_values &&
                r.option_values.filter(
                  (x) =>
                    x.type == "useexistingvariant" || x.type == "chargeorbundle"
                ).length > 0
              ) {
                for (let optionValue of r.option_values.filter(
                  (x) =>
                    x.type == "useexistingvariant" || x.type == "chargeorbundle"
                )) {
                  if (optionValue.productVariationId && optionValue.productId) {
                    let productBundle = priceMod.productVariantBundles.filter(
                      (x) => x.id == optionValue.productId
                    );
                    if (
                      productBundle.length > 0 &&
                      productBundle[0].variants &&
                      productBundle[0].variants.length > 0
                    ) {
                      let productVariantBundle =
                        productBundle[0].variants.filter(
                          (x) => x.id == optionValue.productVariationId
                        );
                      if (productVariantBundle.length > 0) {
                        optionValue["is_exist"] = true;
                        optionValue["soldout"] = !productVariantBundle[0].available ?? true;
                        optionValue.price = productVariantBundle[0].price ?? 0;
                        optionValue["compare_at_price"] =
                          productVariantBundle[0].compare_at_price
                            ? productVariantBundle[0].compare_at_price
                            : 0;
                      } else {
                        optionValue["is_exist"] = false;
                        optionValue["soldout"] = true;
                        optionValue.price = 0;
                      }
                    } else {
                      optionValue["is_exist"] = false;
                      optionValue["soldout"] = true;
                      optionValue.price = 0;
                    }
                  } else if (optionValue.productId) {
                    let productBundle = priceMod.productVariantBundles.filter(
                      (x) => x.id == optionValue.productId
                    );
                    if (
                      productBundle.length > 0 &&
                      productBundle[0].variants &&
                      productBundle[0].variants.length > 0
                    ) {
                      let productVariantBundle = productBundle[0].variants[0];
                      optionValue["is_exist"] = true;
                      optionValue["soldout"] = !productVariantBundle.available ?? true;
                      optionValue.price = productVariantBundle.price ?? 0;
                      optionValue["compare_at_price"] =
                        productVariantBundle.compare_at_price
                          ? productVariantBundle.compare_at_price
                          : 0;
                    } else {
                      optionValue["is_exist"] = false;
                      optionValue["soldout"] = true;
                      optionValue.price = 0;
                    }
                  } else {
                    optionValue["is_exist"] = false;
                    optionValue["soldout"] = true;
                    optionValue.price = 0;
                  }

                  if (optionValue.type == "chargeorbundle") {
                    optionValue.type = "useexistingvariant";
                  }
                }
              }

              e.add(
                this,
                { uuid: UUID },
                i + "-" + t,
                productInfo,
                o,
                elemOptionAvisContainer
              ),
                r &&
                  r.help_text_select &&
                  "" !== r.help_text_select &&
                  r.help_text &&
                  "" !== r.help_text &&
                  (c = !0),
                r.type.indexOf("swatch") > -1 && (p = !0);
            }),
            t.options
          );
        });
      subfixLabelCart(),
        (window.AP_POptions.apps.productoptions._fieldsReady = !0),
        i_lasted(productInfo, o, elemOptionAvisContainer),
        x(),
        "function" == typeof window.AP_POptions.apps.productoptions.ready &&
          (window.AP_POptions.apps.productoptions.ready.call(
            $(`.${container_AP_POptions}`),
            Array.prototype.concat.apply([], d)
          ),
          datePicker.hasDatePicker(d) && datePicker.fixLegacyHandlers()),
        "function" ==
          typeof window.AP_POptions.apps.productoptions.uploaderyReady &&
          window.AP_POptions.apps.productoptions.uploaderyReady.call(
            $(`.${container_AP_POptions}`),
            Array.prototype.concat.apply([], d)
          ),
        addStyleCss(),
        eventApi.appLoad({
          fields: d,
          hasConditionalLogic: l.active,
          hasBundledProducts: !!priceModAll[o].activeVariants.length,
        });
    }
    function addStyleCss() {
      $("head").append(
        "<style>" +
          (customizeryConfig.css ?? "") +
          ` </style>`
      ),
        $("head").append(
          '<style>.avp-productoptionswatchwrapper { vertical-align: middle; } .avp-productoptionswatchwrapper input[type="radio"] {\tposition: fixed; opacity: 0; } .avp-productoptionswatchwrapper input[type="radio"]:checked + .avp-productoptionswatch { border: 1px solid #fff; box-shadow: 0px 0px 0px 2px #ad0000; } .avp-productoptionswatchwrapper input[type="checkbox"] { position: fixed; opacity: 0; } .avp-productoptionswatchwrapper input[type="checkbox"]:checked + .avp-productoptionswatch { border: 1px solid #fff; box-shadow: 0px 0px 0px 2px #ad0000; }</style>'
        );
    }
    function subfixLabelCart() {
      var e = $(`.${container_AP_POptions}`);
      e.length > 0 &&
        $.each(e, function (e, t) {
          var n = $(t).closest("form"),
            i = [],
            o = [];
          $(n)
            .find(":input")
            .each(function (e, t) {
              t.name &&
                t.name.indexOf("properties[") > -1 &&
                !$(t).parents(`.${container_AP_POptions}`).length > 0 &&
                t.name &&
                (o[t.name] = [t.name]);
            });
          var r = "",
            a = !1,
            s = !0;
          $(t)
            .find(":input")
            .each(function (e, t) {
              if (t.name.indexOf("properties[") > -1) {
                var n = t.name,
                  p = !1;
                if ("checkbox" !== t.type) {
                  if ("radio" === t.type) {
                    var c = $(t)
                      .closest('[role="group"]')
                      .attr("aria-labelledby");
                    (p = c === r), p || (a = !1), (r = c);
                  } else (a = !1), (r = "");
                  if ((p && a) || !p)
                    if (
                      (o[n]
                        ? ((s = !1), (a = !0))
                        : i[n] && ((s = !0), (a = !0)),
                      a)
                    ) {
                      if (i[n]) var l = i[n];
                      else var l = { existing_entries: [], is_io_duplicate: s };
                      p || l.existing_entries.push(n);
                      var d = s ? "_io_duplicate" : "_third_party_duplicate",
                        u = s
                          ? l.existing_entries.length
                          : l.existing_entries.length + 1,
                        f =
                          "properties[" +
                          n
                            .replace("properties[", "")
                            .replace("]", "")
                            .replace("properties[", "")
                            .replace("]", "") +
                          "-" +
                          u +
                          "" +
                          //d +
                          "]";
                      spLog(
                        !0,
                        (s ? "IO" : "Third party") +
                          " field already exists with name " +
                          n +
                          ". Renaming IO field with name:" +
                          f,
                        !0
                      ),
                        (i[n] = l),
                        (t.name = f);
                    } else i[n] = { existing_entries: [n], is_io_duplicate: s };
                }
              }
            });

          let formatPrice = priceMod.formatNewMoney(totalPriceAdd);
          let priceString = formatPrice;
          let defaultTextSelection =
            customizeryConfig && customizeryConfig.text_price_add
              ? customizeryConfig.text_price_add
              : "Selection will add {price_add} to the price";
          let priceOvewrite = `<span class='avp-productoption-totalpriceadd'>${priceString}</span>`;
          defaultTextSelection = defaultTextSelection.replaceAll(
            "{price_add}",
            priceOvewrite
          );
          if (
            !customizeryConfig.product_page ||
            customizeryConfig.product_page.show_extra_charge ||
            ["5350916189"].includes(window?.ap_front_settings?.shop_id)
          ) {
            if (t.querySelector(".avp-productoption-total-add")) {
            } else {
              $(t).append(
                `<div ${
                  t.id === "avpoptions-container__v2" ||
                  t.id === "avpoptions-container"
                    ? "id='avp-productoption-total-add'"
                    : ""
                } class='avp-productoption-total-add apo-total-addcharge-hide'>${defaultTextSelection}</div>`
              );
            }
          }
          if (t.querySelector(".apo-total-addcharge")) {
          } else {
            $(t).append(
              `<input type="hidden" value="0" class="apo-total-addcharge" />`
            );
          }
        });
    }
    function p_disabled(e, t, n) {
      if (n && n.length) {
        var i = e.max_selections;
        i &&
          parseInt(i, 10) > 0 &&
          (n.filter(":checked").length >= i
            ? n.filter(":not(:checked)").each(function () {
                this.disabled = "disabled";
              })
            : n.filter(":disabled").each(function () {
                this.removeAttribute("disabled");
              }));
      }
    }
    function checkExistButtonAddCart(e) {
      var countEventAddCart = 0,
        n = true,
        buttonAddCart = e(
          window.AP_POptions.apps.productoptions.addToCartButton
        ),
        eventAddCart = {};
      buttonAddCart.length &&
        (eventAddCart = getEventData(e, buttonAddCart[0])),
        eventAddCart &&
          eventAddCart.click &&
          (countEventAddCart = eventAddCart.click.length);
      for (var r = 0; r < countEventAddCart; r++)
        if (
          (n =
            eventAddCart.click[r].handler
              .toString()
              .indexOf(
                "window.AP_POptions.apps.customizery.overrideDeprecatedValidation"
              ) >= 0)
        )
          return true;
      return false;
    }
    function toggleStyleErrorForInput(e, t) {
      if (window.AP_POptions.apps.productoptions.checkExistInputInvalid) return;
      t
        ? e.css({ background: "", color: "", border: "" })
        : e.css({
            background:
              window.AP_POptions.apps.productoptions.errorStyles.background,
            color: window.AP_POptions.apps.productoptions.errorStyles.color,
            border:
              "1px solid " +
              window.AP_POptions.apps.productoptions.errorStyles[
                "border-color"
              ],
          });
    }
    function validateDataInput(e, t) {
      var n,
        i = e.tagName.toLowerCase();
      n =
        "input" === i
          ? e.type + ":" + t
          : "fieldset" === i
          ? "checkboxes:" + t
          : "span" === i
          ? "radiobuttons:" + t
          : i + ":" + t;
      var o = window.AP_POptions.apps.productoptions,
        r = $(e);
      let message = "";
      switch (n) {
        case "textarea:required":
        case "text:required":
        case "number:required":
          message =
            "" === r.val()?.trim()
              ? (o.toggleInputError(r, !1),
                "number" === e.type
                  ? customizeryConfig.text_alert_number_input
                    ? customizeryConfig.text_alert_number_input
                    : o.strings.errorMessages.forNumberInputs
                  : customizeryConfig.text_alert_text_input
                  ? customizeryConfig.text_alert_text_input
                  : o.strings.errorMessages.forTextInputs)
              : "";
          break;
        case "hidden:required":
          let apoFile = r.parent();

          message =
            "" === r.val()?.trim()
              ? (o.toggleInputError(apoFile ? apoFile : r, !1),
                customizeryConfig.text_alert_file_upload
                  ? customizeryConfig.text_alert_file_upload
                  : o.strings.errorMessages.forFileInputs)
              : "";
          break;
        case "select:required":
          message = $("option:selected:disabled", r).length
            ? (o.toggleInputError(r, !1), customizeryConfig.text_alert_text_select ? customizeryConfig.text_alert_text_select : o.strings.errorMessages.forDropdowns)
            : "";
          break;
        case "radiobuttons:required":
          message =
            0 === $("input[type=radio]", r).length
              ? ""
              : 0 === $('input[type="radio"]:checked', r).length
              ? (o.toggleInputError(r, !1),
                customizeryConfig.text_alert_checkbox_radio_swatches_input
                  ? customizeryConfig.text_alert_checkbox_radio_swatches_input
                  : o.strings.errorMessages.forCheckboxes)
              : "";
          break;
        case "checkboxes:required":
          message =
            0 === $("input[type=checkbox]", r).length
              ? ""
              : 0 === $('input[type="checkbox"]:checked', r).length
              ? (o.toggleInputError(r, !1),
                customizeryConfig.text_alert_checkbox_radio_swatches_input
                  ? customizeryConfig.text_alert_checkbox_radio_swatches_input
                  : o.strings.errorMessages.forCheckboxes)
              : "";
          break;
        case "checkbox:required":
          message =
            r.length > 0 && !r[0].checked
              ? (o.toggleInputError(r.parent(), !1),
                o.strings.errorMessages.forSwitch)
              : "";
          break;
        case "checkboxes:minvalue":
          if (0 === $("input[type=checkbox]", r).length) message = "";
          var a =
            r.data("min_selections") && parseInt(r.data("min_selections"), 10);
          if (!a) message = !1;
          var s = $('input[type="checkbox"]:checked', r).length;
          message =
            s > 0 && s < a
              ? customizeryConfig.customize_alert_required_min_selections
                ? (o.toggleInputError(r, !1),
                  customizeryConfig.customize_alert_required_min_selections.replace(
                    "{min_selections}",
                    a
                  ))
                : (o.toggleInputError(r, !1),
                  o.strings.errorMessages.forMinimumValues.replace(
                    "{min_selections}",
                    a
                  ))
              : "";
          break;
        case "checkboxes:minquantity":
          var a =
            r.data("min_total_qty") && parseInt(r.data("min_total_qty"), 10);
          if (!a) message = !1;
          let totalQuantity = 0;
          $('input[type="checkbox"]:checked', r).map(function () {
            let quantityInput = $(this)
              .parents(".avp-value-grid")
              .find("input.avp-qty-input");
            if (quantityInput && quantityInput.length > 0) {
              let quantity = quantityInput.val();
              if (!quantity) quantity = 1;
              totalQuantity += parseInt(quantity);
            }
            return true;
          });

          message =
            totalQuantity > 0 && totalQuantity < a
              ? customizeryConfig.customize_alert_required_min_quantity
                ? (o.toggleInputError(r, !1),
                  customizeryConfig.customize_alert_required_min_quantity.replace(
                    "{min_quantity}",
                    a
                  ))
                : (o.toggleInputError(r, !1),
                  o.strings.errorMessages.forMinQuantity.replace(
                    "{min_quantity}",
                    a
                  ))
              : "";
          break;

        case "text:data-allow-value":
          let allowValue = r.attr("data-allow-value");
          if (allowValue) {
            if (
              allowValue == "only_letters" &&
              o.allowedValueLetterRegex.test(r.val())
            ) {
              o.toggleInputError(r, !1);
              return o.strings.errorMessages.forTextLettersValid;
            } else if (
              allowValue == "only_letters_and_numbers" &&
              o.allowedValueLetterNumberRegex.test(r.val())
            ) {
              o.toggleInputError(r, !1);
              return o.strings.errorMessages.forTextLettersAndNumbersValid;
            }
          }
          break;
      }
      if (message) return message;

      return "";
    }
    function templateClassButtonAddCart() {
      return (
        ($selectors = [
          '.seven.columns.omega form[action$="/cart/add"] .ajax-submit.action_button.add_to_cart',
          '.seven.columns.omega form[action$="/cart/add"] .action_button.add_to_cart',
          'form[action$="/cart/add"] .atc-btn-container .add_to_cart',
          ".shopify-product-form .add_to_cart",
          '.product-form-container form[action$="/cart/add"] .button.ajax-submit.action_button',
          '.seven.columns.omega form[action$="/cart/add"] .action_button.add_to_cart',
          '.six.columns.omega form[action$="/cart/add"] .action_button.add_to_cart',
          'form[action$="/cart/add"] .btn-addtocart',
          ".product-form form .product-form__submit",
          ".product-form form .product-form__add-button",
          'form[action$="/cart/add"] .product-form--add-to-cart',
          'form[action$="/cart/add"] .btn--subtle-hover',
          'form[action$="/cart/add"] #product-add-to-cart',
          'form[action$="/cart/add"] #AddToCart',
          'form[action$="/cart/add"] .button--large',
          'form[action$="/cart/add"] .AddtoCart',
        ]),
        spLog(
          $selectors,
          "retrieved " +
            $selectors.length +
            " cart submit button alternate selectors",
          !0
        ),
        $selectors.join()
      );
    }

    function submitEditOption(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      p_check_validate(e, document, apoProductDefault);
    }
    function isJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }
    function p_check_validate(e, elemOptionAvisContainer, productId) {
      if (
        window.ap_front_settings.check_on.add_to_cart &&
        window.ap_front_settings.custom_error_message
      ) {
        return (
          alert(window.ap_front_settings.custom_error_message),
          e.stopImmediatePropagation(),
          !1
        );
      }

      if (priceMod.isCloneButtonAddCart) priceMod.addLoadingAddCart(e.target);

      if ("function" == typeof window.AP_POptions.apps.productoptions.validate)
        return (
          spLog(
            !0,
            "theme has custom validation, conditional logic may not work as expected",
            !0
          ),
          window.AP_POptions.apps.productoptions.validate(e)
        );
      var n = "";
      const i = function (e) {
        var t = "";
        return (
          $(
            "input[type=text][required], textarea[required], input[type=number][required], input[type=hidden][required], fieldset[data-required], select[required], span[data-required],input[type=checkbox][avp-data=switch][required]",
            e
          )
            .not("[disabled]")
            .each(function (e, n) {
              t ||
                (t = window.AP_POptions.apps.productoptions.validateInput(
                  n,
                  "required",
                  t
                ));
            }),
          !t &&
            $("input[type=text][data-allow-value]", e)
              .not("[disabled]")
              .each(function (e, n) {
                t ||
                  (t = window.AP_POptions.apps.productoptions.validateInput(
                    n,
                    "data-allow-value",
                    t
                  ));
              }),
          !t &&
            $("fieldset", e)
              .not("[disabled]")
              .each(function (e, n) {
                t ||
                  (t = window.AP_POptions.apps.productoptions.validateInput(
                    n,
                    "minvalue",
                    t
                  )) ||
                  (t = window.AP_POptions.apps.productoptions.validateInput(
                    n,
                    "minquantity",
                    t
                  ));
              }),
          t
        );
      };
      if (
        (($io = $(`#${container_AP_POptions}`)),
        (n = i(
          elemOptionAvisContainer &&
            elemOptionAvisContainer.querySelector(`.${container_AP_POptions}`)
            ? $(
                elemOptionAvisContainer.querySelector(
                  `.${container_AP_POptions}`
                )
              )
            : $io
        )),
        $("div[data-product-options]").each(function () {
          if (["62216929525"].includes(window.ap_front_settings.shop_id)) return;
          var e = $(this).attr("data-product-options");
          if (!isJsonString(e)) {
            ($container = $("div[data-product-options=" + e + "]")),
              (n = i($container));
          }
        }),
        n && n.length)
      ) {
        var o = eventApi.validationFail({ error: n });
        priceMod.removeLoadingAddCart(e.target);
        return (
          o || alert(n), e.preventDefault(), e.stopImmediatePropagation(), !1
        );
      }
      return (
        eventApi.validationSuccess(),
        priceMod.isEditOptionCart
          ? editOptionsToCart(e, productId)
          : addProductBundleToCart(e, productId),
        priceMod.isCloneButtonAddCart ||
          (!priceMod.isCloneButtonAddCart &&
            (priceModCart.isReloadCartByAdd = true))
      );
    }
    function r(e, t) {
      if (t)
        return (
          console.log(
            "Avis dynamic checkout: button clicked + price mods selected, preventing submission"
          ),
          window.alert(
            window.AP_POptions.apps.productoptions.strings.errorMessages
              .forDynamicCheckout
          ),
          e.stopImmediatePropagation(),
          !1
        );
      var n = $(
        ".sp-dynamic-checkout-button-" + e.data["io-dynamic-checkout-type"]
      );
      return n.data("uploadery-dynamic-bound")
        ? (spLog(
            !0,
            "dynamic checkout: form fields are valid and uploadery is present, allowing uploadery to run it's validation",
            !0
          ),
          !0)
        : (a(e), !0);
    }
    function a(e) {
      if ("secondary" === e.data["io-dynamic-checkout-type"])
        return (
          spLog(
            !0,
            'dynamic checkout: clicking "more payment options" button.',
            !0
          ),
          $(".shopify-payment-button__more-options").click(),
          !0
        );
      if ("primary" === e.data["io-dynamic-checkout-type"]) {
        var t = $(".shopify-payment-button__button"),
          n = {
            paypal: '[role="button"]',
            amazon: "form > button",
            google: "iframe",
            shopify: "",
          };
        $.each(n, function (e, n) {
          if (!n)
            return (
              spLog(
                !0,
                "dynamic checkout: clicking native shopify button.",
                !0
              ),
              priceMod.buyItNow(),
              // t.click(), // Continue buy it now
              !0
            );
          if ("google" === e) {
            spLog(!0, "dynamic checkout: clicking google pay button.", !0);
            var i = $(t.find(n).contents());
            return i.find("button").click(), !0;
          }
          return t.find(n).length
            ? (spLog(!0, "dynamic checkout: clicking " + e + " button.", !0),
              t.find(n).click(),
              !0)
            : void 0;
        });
      }
    }

    function addProductBundleToCart(e, productId) {
      if (e.data && e.data["io-dynamic-checkout-type"]) {
        priceMod.options.skipPriceModIfVisible = "";
        var i = r(e, priceMod.checkUseAddchargeBundle(productId).length);
        priceMod.removeLoadingAddCart(e.target);
        return (
          i &&
            window.AP_POptions.apps.productoptions.themeAppExtensionId &&
            ($($io)
              .css("display", "none")
              .prependTo(
                "form#" +
                  window.AP_POptions.apps.productoptions.themeAppExtensionId
              ),
            console.log(
              "Avis Buy now button clicked in Shopify Theme 2.0.  Moving IO div to be within the Add to Cart form."
            )),
          !0
        );
      }

      if (priceMod.isCloneButtonAddCart) {
        return (
          (priceMod.orderId = new Date().getTime()),
          priceMod.removeBundleInputs(),
          priceMod.addToCart(
            productId,
            e,
            function (i) {
              let productForm = e.target.closest("product-form");
              if (i && i.status) {
                console.log(
                  "Avis: price variants: add variant to cart error ",
                  i.description
                );
                priceMod.removeLoadingAddCart(e.target);

                if (productForm) {
                  productForm.error = true;
                  if (typeof productForm.handleErrorMessage === "function") {
                    productForm.handleErrorMessage(i.description);
                  }
                } else if (i.description) alert(i.description);
                else alert("Error!");
                return;
              }
              if (i?.items?.length > 0) {
                let mainProductCart = i.items.find(
                  (x) =>
                    Object.keys(x.properties).length > 0 &&
                    x.properties.hasOwnProperty("_apo_variants")
                );
                if (mainProductCart) i.key = mainProductCart.key;
              }
              if (productForm) {
                productForm.error = false;
              }

              if (window.ap_front_settings.shop_id === "76484182349")
              {
                if (priceMod.cartSection)
                {
                  let cartItems = priceMod.cartSection.querySelector("cart-items");
                  if (cartItems?.cart) {
                    cartItems?.getCart();  
                    priceMod.removeLoadingAddCart(e.target);
                    return;
                  }
                }
              }

              try {
                if (priceMod.cartSection) {
                  function finalAddCart() {
                    if (priceMod.cartSection.classList.contains("is-empty"))
                      priceMod.cartSection.classList.remove("is-empty");
                  }
                  const quickAddModal = e.target.closest("quick-add-modal");
                  if (quickAddModal) {
                    document.body.addEventListener(
                      "modalClosed",
                      () => {
                        setTimeout(() => {
                          if (
                            priceMod.cartSection?.renderContents &&
                            typeof priceMod.cartSection?.renderContents ===
                              "function"
                          )
                            priceMod.cartSection.renderContents(i);
                        });
                      },
                      { once: true }
                    );
                    quickAddModal.hide(true);
                    priceMod.removeLoadingAddCart(e.target);
                    finalAddCart();
                    return;
                  } else {
                    if (
                      priceMod.cartSection?.renderContents &&
                      typeof priceMod.cartSection?.renderContents === "function"
                    ) {
                      priceMod.removeLoadingAddCart(e.target);
                      priceMod.cartSection.renderContents(i);
                      finalAddCart();
                      return;
                    }
                  }
                }
              } catch (ex) {
                console.log("Render cart error: ", ex);
              }

              if (window?.routes?.cart_url)
                window.location = window.routes.cart_url;
              else window.location.href = "/cart";
              priceMod.removeLoadingAddCart(e.target);
            },
            o
          )
        );
      } else {
        var o = priceMod.getVariantSubmissions(productId);
        if (!o || !o.length)
          return (
            // Falls through to the theme's own add to cart, so any hidden bundle
            // input left over from an earlier click has to go with it.
            priceMod.removeBundleInputs(),
            $(window.AP_POptions.apps.productoptions.skipPriceModIfVisible).is(
              ":visible"
            )
              ? spLog(!0, "price variants: skip price mod if visible", !0)
              : spLog(!0, "price variants: no variants selected", !0),
            !0
          );
        var a = !0,
          s = getEventData($, priceMod.buttonAddCart[0]);
        // priceModCart.isReloadCartByAdd = true;
        return (
          s &&
            s.click &&
            s.click.length > 1 &&
            t.each(s.click, function (t, i) {
              i.handler != p_check_validate &&
                i.data &&
                i.data["AP_POptions-validate"] &&
                (spLog(
                  i.handler,
                  "price variants: calling other AP_POptions validation",
                  !0
                ),
                (a = i.handler.call(priceMod.buttonAddCart[0], e)));
            }),
          a
            ? (spLog(
                safeJsonStringify(o),
                "price variants: submitting with variants",
                !0
              ),
              (priceMod.orderId = new Date().getTime()),
              priceMod.removeBundleInputs(),
              priceMod.addToCart(
                productId,
                e,
                function (i) {
                  if (i)
                    return void spLog(
                      i,
                      "price variants: add variant to cart error",
                      "red"
                    );
                  priceModCart.isReloadCartByAdd = true;
                  if (e.data["io-AP_POptions-overlay"])
                    return (
                      spLog(
                        !0,
                        "AP_POptions product bundle completed via overlay: triggering click event on add to cart button",
                        !0
                      ),
                      void priceMod.buttonAddCart.trigger("click", [
                        "spTrigger",
                      ])
                    );
                  if (
                    window.AP_POptions.apps.productoptions
                      .submitPriceModCartAnyways
                  ) {
                    return void priceMod.buttonAddCart.trigger("click", [
                      "spTrigger",
                    ]);
                  }
                  var r = !0;
                  s &&
                    s.click &&
                    s.click.length > 1 &&
                    t.each(s.click, function (t, i) {
                      !(t > 0) ||
                        (i.data && i.data["AP_POptions-validate"]) ||
                        (spLog(
                          i.handler,
                          "price variants: calling non-AP_POptions submit event",
                          !0
                        ),
                        (r = !1),
                        i.handler.call(priceMod.buttonAddCart[0], e));
                    });
                  var a = eventApi.productBundleCartSubmit({
                    submittedProducts: o,
                  });
                  return (
                    !a &&
                    void (r ||
                    window.AP_POptions.apps.productoptions
                      .submitPriceModCartAnyways
                      ? priceMod.buttonAddCart.parents("form").trigger("submit")
                      : spLog(
                          !0,
                          "price variants: complete but relying on other events to submit",
                          !0
                        ))
                  );
                },
                o
              ))
            : (spLog(
                !0,
                "price variants: other AP_POptions validation failed",
                !0
              ),
              !1)
        );
      }
    }
    async function editOptionsToCart(e, productId) {
      priceMod.orderId = new Date().getTime();
      priceMod.removeBundleInputs();
      let keyLineItemEdit = priceMod.cartItemEdit.key;
      let postDataCart = [];
      let newItemCart = {
        id: !1,
        quantity: priceMod.cartItemEdit.quantity,
        properties: {},
      };
      let addItemsCart = {
        items: [],
      };
      if (!$('[name="properties[_apo_order]"]').length) {
        let variants = priceMod.getVariantSubmissions(productId);
        if (variants && variants.length > 0) {
          priceMod.listInputAddBundle.push("properties[_apo_order]");
          var i = $("<input />")
            .attr("type", "hidden")
            .attr("name", "properties[_apo_order]")
            .val(priceMod.orderId);
          $(e.target).before(i);
        }

        for (var optionIndex in variants) {
          let variantItem = variants[optionIndex];
          priceMod.listInputAddBundle.push(
            `properties[_apo_variant_${variantItem.name}_${optionIndex}]`
          );
          var variant = $("<input />")
            .attr("type", "hidden")
            .attr(
              "name",
              `properties[_apo_variant_${variantItem.name}_${optionIndex}]`
            )
            .val(`${variantItem.variantId} * ${variantItem.quantity}`);
          $(e.target).before(variant);
          addItemsCart.items.push({
            id: parseInt(variantItem.variantId),
            quantity: newItemCart.quantity * (variantItem.quantity ?? 1),
            properties: {
              _apo_parent_order: priceMod.orderId,
              _apo_quantity: variantItem.quantity ?? 1,
              _apo_field_name: variantItem.name,
            },
          });
          // }
        }
      }

      let elemFormPopup = document.querySelector(".avis-cart-popup-form");
      let formData = new FormData(elemFormPopup);
      formData.forEach((e, t) => {
        if (
          ("id" == t && (newItemCart.id = parseInt(e)),
          t.indexOf("properties") > -1)
        ) {
          let property = t.replace("properties[", "").replace("]", "");
          newItemCart.properties[property] = e;
        }
      });

      if (addItemsCart.items.length > 0) {
        addItemsCart.items.push(newItemCart);
      }

      let postDelOrAddCart = [];
      let cartItemRemoveInput = {};
      if (addItemsCart.items.length > 0) {
        cartItemRemoveInput[keyLineItemEdit] = 0;
      }

      if (
        priceMod.cartItemEdit.properties &&
        priceMod.cartItemEdit.properties.hasOwnProperty("_apo_order")
      ) {
        let oldApoOrder = priceMod.cartItemEdit.properties._apo_order;
        let cartItemRemoves = priceMod.cartCurrent.items.filter(
          (x) =>
            x.properties &&
            x.properties.hasOwnProperty("_apo_parent_order") &&
            String(x.properties._apo_parent_order) == String(oldApoOrder)
        );
        if (cartItemRemoves.length > 0) {
          for (let cartItem of cartItemRemoves) {
            cartItemRemoveInput[cartItem.key] = 0;
          }
        }
      }
      if (Object.keys(cartItemRemoveInput).length > 0) {
        postDelOrAddCart.push(priceModCart.postUpdateCart(cartItemRemoveInput));
      }

      // Line item (old, new) has product bundle
      if (postDelOrAddCart.length > 0) {
        await Promise.all(postDelOrAddCart).then(async (values) => {
          if (
            values.filter(
              (x) =>
                x.res &&
                (!x.res.status ||
                  (x.res.status != "bad_request" &&
                    x.res.status != "too_many_requests" &&
                    x.res.status != 404 &&
                    x.res.status != 422))
            ).length > 0
          ) {
            console.log("Res Del or Add Bundle when edit option", values);
            let newCart = await priceModCart.getCartV2();
            priceMod.cartCurrent = newCart;
            if (addItemsCart.items.length > 0) {
              postDataCart.push(priceModCart.postAddsCart(addItemsCart));
              await Promise.all(postDataCart).then(async (resData) => {
                console.log("Res Del or Add Bundle when edit option", resData);
                location.reload();
              });
            } else {
              location.reload();
            }
          } else {
            priceMod.removeLoadingAddCart(e.target);
            console.log("Error: Edit options to cart");
          }
        });
      }

      if (addItemsCart.items.length === 0) {
        let cartItemChange = {
          id: keyLineItemEdit,
          properties: newItemCart.properties,
        };

        await Promise.all([priceModCart.postChangeCart(cartItemChange)]).then(
          (values) => {
            if (
              values.filter(
                (x) =>
                  x.res &&
                  (!x.res.status ||
                    (x.res.status != "bad_request" &&
                      x.res.status != "too_many_requests" &&
                      x.res.status != 404 &&
                      x.res.status != 422))
              ).length > 0
            ) {
              location.reload();
            } else {
              console.log(
                "Error: Edit options to cart for change main line item"
              );
            }
          }
        );
      }
    }
    function findButtonAddCart(elemOptionAvisContainer, productId) {
      isUpdateButtonAddCart = false;
      var e = window.AP_POptions.apps.productoptions.jQueryKey || "jQuery",
        t =
          window[e] && window[e].fn && (window[e]._data || window[e].data)
            ? window[e]
            : $;

      var buttonAddCart = null;
      if (priceMod.isCloneButtonAddCart || UUID === "62586192103" || UUID === "61025681641" || UUID === "100510892330") {
        let avisAddCartFormActiveJS = priceMod.avisAddCartFormActiveJS;
        if (elemOptionAvisContainer && elemOptionAvisContainer?.nodeName !== "#document") {
          let findFormProduct = getFormAddToCart(elemOptionAvisContainer);
          if (findFormProduct) {
            avisAddCartFormActiveJS = findFormProduct;
          }
        }
        let buttonAddCart = avisAddCartFormActiveJS.querySelector(
          window.AP_POptions.addToCartButton
        );

        let isCloneButtonAddCart = isExistOptionHasDataInputInvalid(
          elemOptionAvisContainer
        );
        let hasProductBundle = false;
        for (let item in priceModAll[productId].activeVariants) {
          if (
            priceModAll[productId].activeVariants[item].isShow &&
            (priceModAll[productId].activeVariants[item].productId ||
              priceModAll[productId].activeVariants[item].variantId)
          ) {
            hasProductBundle = true;
            break;
          }
        }
        if (UUID === "62723916027")
        {
          let checkShowAvis = elemOptionAvisContainer.querySelector(".avpoptions-container__v2");
          if (checkShowAvis)
          {
            isCloneButtonAddCart = true;
          }
        }
        if (isCloneButtonAddCart || hasProductBundle) {
          let newClassNameAvisButtonAddCart =
            window.AP_POptions.apps.productoptions.avisNewAddCartButtonClass;
          let oldClassNameAvisButtonAddCart =
            window.AP_POptions.apps.productoptions.avisOrgAddCartButtonClass;
          if (
            buttonAddCart &&
            buttonAddCart.className &&
            buttonAddCart.className.indexOf(newClassNameAvisButtonAddCart) > -1
          )
            return;

          let cloneButtonAddCart = buttonAddCart
            ? buttonAddCart.cloneNode(true)
            : false;
          if (cloneButtonAddCart) {
            switch (
              (cloneButtonAddCart.classList.add(newClassNameAvisButtonAddCart),
              cloneButtonAddCart.tagName)
            ) {
              case "BUTTON":
              case "INPUT":
              case "A":
                cloneButtonAddCart.addEventListener(
                  "click",
                  (event) => {
                    p_check_validate(event, elemOptionAvisContainer, productId);
                  },
                  false
                );
                break;
              case "DIV":
              case "SPAN":
                cloneButtonAddCart.querySelectorAll("button").forEach((e) =>
                  cloneButtonAddCart.addEventListener(
                    "click",
                    (event) => {
                      p_check_validate(
                        event,
                        elemOptionAvisContainer,
                        productId
                      );
                    },
                    false
                  )
                );
            }

            buttonAddCart.classList.add(oldClassNameAvisButtonAddCart);
            buttonAddCart.parentNode.insertBefore(
              cloneButtonAddCart,
              buttonAddCart
            );
            var eventButtonAddCart = getEventData(t, buttonAddCart);
            eventButtonAddCart &&
              eventButtonAddCart.click &&
              eventButtonAddCart.click.length > 1 &&
              (console.log("Avis add to cart has other bound events"),
              eventButtonAddCart.click.unshift(eventButtonAddCart.click.pop())),
              g((e) => {
                p_check_validate(e, elemOptionAvisContainer, productId);
              }); // Check validate options of avisplus
          }
        } else {
          if (avisAddCartFormActiveJS)
            RemoveCloneButtonAddCart($(avisAddCartFormActiveJS));
        }
      } else {
        if (priceModAll[productId]?.isAppendEventclickAddCartV1) {
          return;
        }
        priceModAll[productId].isAppendEventclickAddCartV1 = true;
        buttonAddCart =
          t(window.AP_POptions.apps.productoptions.addToCartButtonAPO).length >
          0
            ? t(window.AP_POptions.apps.productoptions.addToCartButtonAPO)
            : t(window.AP_POptions.apps.productoptions.addToCartButton);
        if (0 === buttonAddCart.length) {
          console.log(
            "Avis cart submit button does not exist, trying with alternate selectors"
          );
          var classTempButtonAddCart = templateClassButtonAddCart();
          if (
            ((buttonAddCart = t(classTempButtonAddCart)),
            0 === buttonAddCart.length)
          )
            return console.log(
              "Avis unable to find cart submit button with alternate selectors"
            );
          (window.AP_POptions.apps.productoptions.addToCartButton =
            buttonAddCart),
            console.log(
              "Avis found cart submit button with alternate selectors: ",
              window.AP_POptions.apps.productoptions.addToCartButton
            );
        }
        ("overlay" === customizeryConfig.validate &&
          "bound" !== window.AP_POptions.apps.productoptions.validateType) ||
        "overlay" === window.AP_POptions.apps.productoptions.validateType
          ? (console.log("Validating with overlay"),
            genOverlayForButtonAddCart(buttonAddCart, (event) => {
              p_check_validate(event, elemOptionAvisContainer, productId);
            }))
          : console.log("Validating with bound handler"),
          onBindEvent(
            t,
            buttonAddCart,
            window.AP_POptions.apps.productoptions.validationEventName,
            { "AP_POptions-validate": !0 },
            (event) => {
              p_check_validate(event, elemOptionAvisContainer, productId);
            }
          ),
          buttonAddCart.data("io-bound", !0);
        priceMod.buttonAddCart = buttonAddCart;
        var eventButtonAddCart = getEventData(t, buttonAddCart[0]);
        eventButtonAddCart &&
          eventButtonAddCart.click &&
          eventButtonAddCart.click.length > 1 &&
          (console.log("Avis add to cart has other bound events"),
          eventButtonAddCart.click.unshift(eventButtonAddCart.click.pop())),
          g((event) => {
            p_check_validate(event, elemOptionAvisContainer, productId);
          }); // Check validate options of avisplus
      }

      function RemoveCloneButtonAddCart(avisAddCartFormActive) {
        avisAddCartFormActive
          .find(
            `.${window.AP_POptions.apps.productoptions.avisNewAddCartButtonClass}`
          )
          .each(function () {
            $(this).remove();
          });
        avisAddCartFormActive
          .find(
            `.${window.AP_POptions.apps.productoptions.avisOrgAddCartButtonClass}`
          )
          .each(function () {
            $(this).removeClass(
              window.AP_POptions.apps.productoptions.avisOrgAddCartButtonClass
            );
          });
      }
      function isExistOptionHasDataInputInvalid(elemOptionAvisContainer) {
        window.AP_POptions.apps.productoptions.checkExistInputInvalid = true;
        var messageError = "";
        const checkValidateDataInput = function (e) {
          var t = "";
          return (
            $(
              "input[type=text][required], textarea[required], input[type=number][required], input[type=hidden][required], fieldset[data-required], select[required], span[data-required],input[type=checkbox][avp-data=switch][required]",
              e
            )
              .not("[disabled]")
              .each(function (e, n) {
                t ||
                  (t = window.AP_POptions.apps.productoptions.validateInput(
                    n,
                    "required",
                    t
                  ));
              }),
            !t &&
              $("input[type=text][data-allow-value]", e)
                .not("[disabled]")
                .each(function (e, n) {
                  t ||
                    (t = window.AP_POptions.apps.productoptions.validateInput(
                      n,
                      "data-allow-value",
                      t
                    ));
                }),
            !t &&
              $("fieldset", e)
                .not("[disabled]")
                .each(function (e, n) {
                  t ||
                    (t = window.AP_POptions.apps.productoptions.validateInput(
                      n,
                      "minvalue",
                      t
                    )) ||
                    (t = window.AP_POptions.apps.productoptions.validateInput(
                      n,
                      "minquantity",
                      t
                    ));
                }),
            t
          );
        };
        if (
          (($io = $(`#${container_AP_POptions}`)),
          (messageError = checkValidateDataInput(
            elemOptionAvisContainer &&
              elemOptionAvisContainer.querySelector(`.${container_AP_POptions}`)
              ? $(
                  elemOptionAvisContainer.querySelector(
                    `.${container_AP_POptions}`
                  )
                )
              : $io
          )),
          $("div[data-product-options]").each(function () {
            if (["62216929525"].includes(window.ap_front_settings.shop_id)) return;
            var e = $(this).attr("data-product-options");
            if (!isJsonString(e)) {
              ($container = $("div[data-product-options=" + e + "]")),
                (messageError = i($container));
            }
          }),
          messageError && messageError.length)
        ) {
          window.AP_POptions.apps.productoptions.checkExistInputInvalid = false;
          return true;
        }
        window.AP_POptions.apps.productoptions.checkExistInputInvalid = false;
        return false;
      }
    }

    function h(e, t) {
      return "undefined" != typeof e.shopifyPriceSynced
        ? t(e)
        : void $.ajax({
            url: "/products.json?id=" + e.productId,
            success: function (n) {
              if (n && n.products && n.products[0])
                for (var i = n.products[0].variants, o = 0; o < i.length; o++)
                  i[o].id == e.variantId &&
                    ((e.price = i[o].price),
                    spLog(
                      e,
                      "Successfully fetched latest price from Shopify product",
                      !0
                    ));
              return t(e);
            },
            error: function (n) {
              return t(e);
            },
          });
    }
    function genOverlayForButtonAddCart(buttonAddCart, eventForButtonAddCart) {
      var div = genDivVForButtonAddCart("sp-validate-overlay", true);
      onBindEvent(
        $,
        div,
        window.AP_POptions.apps.productoptions.validationEventName,
        { "io-AP_POptions-validate": !0, "io-AP_POptions-overlay": !0 },
        eventForButtonAddCart
      ),
        div.css({
          position: "absolute",
          display: "block",
          "z-index": "100000",
          cursor: "pointer",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        }),
        buttonAddCart.css({ position: "relative" }).append(div);
    }
    function g(e) {
      var t = 0;
      if (window.AP_POptions.apps.productoptions.hideDynamicCheckout)
        return (
          spLog(
            !0,
            "hideDynamicCheckout runtime config is set, hiding dynamic checkout buttons.",
            !0
          ),
          $(".shopify-payment-button").hide(),
          !0
        );
      function n(n) {
        var r, a;
        switch (n) {
          case "primary":
            (r = ".shopify-payment-button__button"), (a = i);
            break;
          case "secondary":
            (r = ".shopify-payment-button__more-options"), (a = o);
        }
        if ($(r).length) {
          spLog(
            !0,
            "dynamic checkout: " +
              n +
              " button found, preventing submission until our options pass validation.",
            !0
          ),
            clearInterval(a),
            m(e, n, r);
          var s = new MutationObserver(function (t) {
            (t[0].addedNodes.length ||
              (t[0].removedNodes.length && !$(r).length)) &&
              m(e, n, r);
          });
          s.observe($(".shopify-payment-button")[0], {
            childList: !0,
            subtree: !0,
          });
        }
        t >= 9 &&
          (spLog(
            !1,
            "dynamic checkout: unable to locate " +
              n +
              " dynamic checkout button after polling for 5 seconds.",
            !0
          ),
          clearInterval(a)),
          t++;
      }
      var i = setInterval(function () {
          n("primary");
        }, 500),
        o = setInterval(function () {
          n("secondary");
        }, 500);
    }
    function m(e, t, n) {
      var i, o;
      if ($(".sp-dynamic-checkout-button-" + t).length) {
        if (
          ((o = $(".sp-dynamic-checkout-button-" + t)),
          (overlayEvents = getEventData($, o[0])),
          overlayEvents && overlayEvents.click)
        )
          for (var r = 0; r < overlayEvents.click.length; r++)
            if (overlayEvents.click[r].data["io-AP_POptions-validate"])
              return !0;
      } else
        (o = genDivVForButtonAddCart("sp-dynamic-checkout-button-" + t, !0)),
          (i = !0);
      onBindEvent(
        $,
        o,
        window.AP_POptions.apps.productoptions.validationEventName,
        { "io-AP_POptions-validate": !0, "io-dynamic-checkout-type": t },
        e
      ),
        i && $(n).css({ position: "relative" }).append(o),
        o.data("io-dynamic-bound", !0);
      var a = getEventData($, o[0]);
      a && a.click && a.click.length > 1 && a.click.unshift(a.click.pop());
    }
    // y
    function genDivVForButtonAddCart(className, status) {
      if ((($overlay = $('<div class="' + className + '"></div>')), status)) {
        var n = {
          all: {
            position: "absolute",
            display: "block",
            "z-index": "100",
            cursor: "pointer",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
          },
        };
        $.each(n, function (e, t) {
          $overlay.css(t);
        });
      }
      return $overlay;
    }
    // w
    function onBindEvent(e, t, n, i, o) {
      e.fn.on ? t.on(n, i, o) : t.bind(n, i, o);
    }

    // async function checkButtonAddCart(elemOptionAvisContainer, productId) {
    //   setTimeout(function () {
    //     var e = !1;
    //     "function" == typeof window.$ &&
    //       (e = checkExistButtonAddCart(window.$)),
    //       e ||
    //       "undefined" == typeof window.AP_POptions ||
    //       "undefined" == typeof window.AP_POptions.$ ||
    //       (e = checkExistButtonAddCart(window.AP_POptions.$)),
    //       e
    //         ? spLog(e, "theme has custom validation", !0)
    //         : findButtonAddCart(elemOptionAvisContainer, productId, true);
    //   }, 100);
    // }
    function x() {
      $(`.${container_AP_POptions} select[required="required"]`)
        .find('option[disabled="disabled"][selected="selected"]')
        .prop("selected", "selected");
    }

    function actionCheckout(btn) {
      if (
        window.ap_front_settings.check_on.check_out &&
        window.ap_front_settings.custom_error_message
      ) {
        if (btn) btn.classList.remove("apo-loading");
        return alert(window.ap_front_settings.custom_error_message), !1;
      }

      priceModCart.getCart(function (response) {
        // let shop_id = window.ap_front_settings.shop_id;
        let textCustomizationCostFor = "Customization Cost for";
        try {
          textCustomizationCostFor =
            customizeryConfig && customizeryConfig.text_customization_cost_for
              ? customizeryConfig.text_customization_cost_for
              : "Customization Cost for";
        } catch (e) {
          textCustomizationCostFor = "Customization Cost for";
        }

        let options = [];
        if (
          customizeryConfig &&
          customizeryConfig.optionSets &&
          customizeryConfig.optionSets.length
        ) {
          customizeryConfig.optionSets.forEach((optionSetItem) => {
            if (optionSetItem.options)
              options = options.concat(optionSetItem.options);
          });
        }

        let lineItems = [];
        let lineItemsCustom = [];
        response.items.forEach((e) => {
          let properties = [];
          if (e.properties) {
            var avisOrder = {
              avis_order: "",
              quantity: e.quantity,
              variant_bundles: [],
            };
            for (const property in e.properties) {
              let value = e.properties[property];
              let tempPro = {
                name: property,
                value: value,
              };

              if (property == "_apo_order") {
                avisOrder.avis_order = value;
              }
              if (property.indexOf("_apo_variant_") != -1 && value) {
                avisOrder.variant_bundles.push(value);
              }

              let customPr = null;
              let priceAddChargeAvis = 0;
              let valuePropertyIncart = value;
              if (valuePropertyIncart) {
                let isExist = false;
                for (let valueItem of valuePropertyIncart.split("],")) {
                  if (valueItem) {
                    if (!valueItem.endsWith("]")) valueItem = valueItem + "]";
                    var placeholderRegex = /\[.*\]/;
                    let regex = valueItem.match(placeholderRegex);
                    if (regex) {
                      isExist = true;
                      let textMoney = regex[0].slice(1, -1);
                      let priceValue = priceMod.convertMoneyToNumber(textMoney);
                      priceAddChargeAvis += parseFloat(priceValue);
                    }
                  }
                }

                if (isExist) {
                  customPr = {
                    name: `${property}`,
                    value: value,
                  };

                  lineItemsCustom.push({
                    title: `${textCustomizationCostFor} ${e.title}`,
                    price: priceAddChargeAvis,
                    quantity: e.quantity,
                    requires_shipping: false,
                    properties: [customPr],
                    key: e.key,
                  });
                }
              }

              properties.push(tempPro);
            }
          }

          lineItems.push({
            variant_id: e.variant_id,
            quantity: e.quantity,
            requires_shipping: e.requires_shipping,
            sku: e.sku,
            properties: properties,
            key: e.key,
          });
        });
        // Group by properties
        for (let i = 0; i < lineItemsCustom.length; i++) {
          for (let j = i + 1; j < lineItemsCustom.length; j++) {
            if (
              JSON.stringify(lineItemsCustom[i]) ===
              JSON.stringify(lineItemsCustom[j])
            ) {
              lineItemsCustom[i].quantity += lineItemsCustom[j].quantity;
              lineItemsCustom.splice(j, 1);
            }
          }
        }
        let allLineItem = lineItems.concat(lineItemsCustom);
        // Append attributes into tags
        let tags = "";
        try {
          for (let key in response.attributes) {
            if (key.indexOf("Delivery") > -1) {
              tags += key + ": " + response.attributes[key] + ",";
            }
          }
        } catch (e) {
          console.log("AvisPlus log: ", e);
        }

        if (priceModCart.avisCartInput && priceModCart.avisCartInput.cartJson) {
          priceMod.discountMoney(
            priceModCart.avisCartInput.cartJson.total_price
          );
          priceModCart.avisCartInput.cartJson.non_fractional =
            priceMod.precisionPrice === 0; // if = 0 non-fractional currencies
        }

        let cartInput = {
          line_items: allLineItem,
          tags,
          cart: priceModCart.avisCartInput,
        };

        let shop_id = window.ap_front_settings.shop_id;
        const fetchOptions = {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "shop-id": shop_id,
          },
          body: JSON.stringify(cartInput),
        };

        fetch(`${priceModCart.avisUrl}draft-order`, fetchOptions).then(
          function (responseData) {
            if (btn) btn.classList.remove("apo-loading");
            if (responseData.status == "200") {
              console.log("AvisPlus redirect to checkout page 1");
              
              return responseData.json().then(function (res) {
                window.location.href =
                  "string" == typeof res.data ? res.data : "/checkout";
              });
            } else {
              console.log("AvisPlus redirect to checkout page 2");
              window.location.href = "/checkout";
            }
          }
        );
      });
    };

    // function callApiCreateOrder =
    window.AP_POptions &&
      window.AP_POptions.apps &&
      window.AP_POptions.apps.customizery &&
      ((window.AP_POptions.apps.productoptions =
        window.AP_POptions.apps.customizery),
      delete window.AP_POptions.apps.customizery);

    // Check all option set by condition product
    // e: product info
    // t: default
    function mainCheckAllRules(
      e,
      t,
      isPopup = false,
      elemOptionAvisContainer = null
    ) {
      if (!t) t = apoProductDefault;
      priceModAll[t] = {
        variantSubmissionAlters: [],
        variantOrdering: [],
        activeVariants: {},
        productVariantBundles: [],
        radioInput: {},
        isAppendEventclickAddCartV1: false,
      };
      if (elemOptionAvisContainer) {
        let containerAvisOption = elemOptionAvisContainer.querySelector(
          `.${container_AP_POptions}`
        );
        if (containerAvisOption) containerAvisOption.remove();
      } else elemOptionAvisContainer = document;

      customizeryRules.checkAllRules(
        customizeryConfig,
        "optionSets",
        e,
        async function (optionSets, productInfo) {
          //n: option set valid
          //i: product
          if (optionSets && optionSets.length > 0) {
            // Shop có set mang `sort` khác 0 (dữ liệu do endpoint v1 sinh ra) thì
            // `sort` vẫn quyết định thứ tự. Chỉ khi MỌI set có sort=0 mới sắp
            // theo `display_order`.
            //
            // `display_order` khớp thứ tự trong admin app; fallback sang
            // created_at cho metafield cũ chưa có field này. Nó cũng làm
            // tie-break khi hai set trùng `sort`.
            const apoDisplayOrder = (o) =>
              typeof o.display_order === "number"
                ? o.display_order
                : new Date(o.created_at).getTime();

            if (!optionSets.find((x) => x.sort !== 0)) {
              optionSets.sort(function (a, b) {
                return apoDisplayOrder(a) - apoDisplayOrder(b);
              });
            } else {
              // `sort` thiếu/không phải số -> NaN, mà NaN falsy nên tự rơi sang
              // tie-break display_order thay vì đẩy phần tử đi lung tung.
              optionSets.sort(function (a, b) {
                return (
                  Number(a.sort) - Number(b.sort) ||
                  apoDisplayOrder(a) - apoDisplayOrder(b)
                );
              });
            }

            // --- [Tracking] capture the option sets actually rendered for this product (validated list, render order) ---
            // so getOptionSetId() reports the real rendered set instead of config.optionset[0] (= all sets of the shop)
            if (!window.apo_ph_option_set_ids) window.apo_ph_option_set_ids = [];
            optionSets.forEach(function (os) {
              var osId = String(os.id || os._id || "");
              if (osId && window.apo_ph_option_set_ids.indexOf(osId) === -1) {
                window.apo_ph_option_set_ids.push(osId);
              }
            });

            // Chuẩn hoá label_cart NGAY tại đây, trước khi render bất cứ thứ gì.
            // Lý do: conditionalLogic.register() (chạy SAU khi option đã render xong)
            // vẫn tự trim label_cart trên chính object option này. Nếu label lưu trong
            // admin có khoảng trắng thừa ("LEATHER    "), input hidden được tạo lúc
            // render mang name="properties[LEATHER    ]", nhưng handler change đọc lại
            // option.label_cart - lúc đó đã bị register() trim thành "LEATHER" - nên
            // createAvisContainerHidden tìm input[name="properties[LEATHER]"] không thấy
            // và đẻ thêm một input hidden thứ hai. Trim từ gốc thì cả hai đường đều
            // dùng chung một tên, đồng thời label hiện trên cart cũng hết khoảng trắng.
            // Field trong condition_items phải trim cùng lúc, nếu không phép so
            // oldLabelCart (đã trim) với field (chưa trim) ở bước đổi tên trùng bên dưới
            // sẽ trượt và rule conditional logic mất liên kết.
            for (let optionSet of optionSets) {
              if (!optionSet.options || !optionSet.options.length) continue;
              for (let option of optionSet.options) {
                if (typeof option.label_cart === "string")
                  option.label_cart = option.label_cart.trim();
                let conditionItems =
                  option["conditional_logic"] &&
                  option["conditional_logic"]["condition_items"];
                if (conditionItems && conditionItems.length) {
                  for (let conditionLogicItem of conditionItems) {
                    if (typeof conditionLogicItem["field"] === "string")
                      conditionLogicItem["field"] =
                        conditionLogicItem["field"].trim();
                  }
                }
              }
            }

            let checkExistLabelCart = {};
            for (let optionSet of optionSets) {
              if (optionSet.options && optionSet.options.length > 0) {
                for (let option of optionSet.options) {
                  if (checkExistLabelCart.hasOwnProperty(option.label_cart)) {
                    checkExistLabelCart[option.label_cart] += 1;

                    let oldLabelCart = option.label_cart;
                    let newLabelCart = `${option.label_cart}-${
                      checkExistLabelCart[option.label_cart]
                    }`;
                    option.label_cart = newLabelCart;

                    for (let optionForConditionLogic of optionSet.options.filter(
                      (e) =>
                        e["conditional_logic"] &&
                        e["conditional_logic"]["condition_items"] &&
                        e["conditional_logic"]["condition_items"].length > 0
                    )) {
                      for (let conditionLogicItem of optionForConditionLogic[
                        "conditional_logic"
                      ]["condition_items"]) {
                        if (conditionLogicItem["field"] == oldLabelCart) {
                          conditionLogicItem["field"] = newLabelCart;
                        }
                      }
                    }
                  } else checkExistLabelCart[option.label_cart] = 0;

                  if (
                    option["option_values"] &&
                    option["option_values"].length > 0
                  ) {
                    for (let optionValue of option["option_values"]) {
                      if (optionValue["type"] == "percentagecharge") {
                        optionValue["type"] = "createcharge";
                        let priceProduct = productInfo["price"] ?? 0;
                        let priceCharge =
                          (parseFloat(priceProduct) *
                            parseFloat(optionValue["percentageCharge"] ?? 0)) /
                          100;
                        optionValue["price"] = priceCharge; // priceMod.convertMoney(priceCharge);
                      } else if (optionValue["price"]) {
                        optionValue["price"] = optionValue["price"] * 100;
                      }
                    }
                  }
                }
              }
            }

            priceMod.init({
              skipPriceModIfVisible:
                window.AP_POptions.apps.productoptions.skipPriceModIfVisible,
            }),
              (conditionalLogicInstances[t] = new conditionalLogicFactory(
                window.AP_POptions.$
              )),
              await mainRenderOptions(
                optionSets,
                productInfo,
                t,
                elemOptionAvisContainer
              );

            if (elemOptionAvisContainer) {
              setInterval(function () {
                findButtonAddCart(elemOptionAvisContainer, t);
              }, 300);
            }
          } else {
            if (typeof window.removeDisabledBtnAddCart === "function") {
              setTimeout(window.removeDisabledBtnAddCart, 200);
            }
            spLog(!0, "this page does not match options", !0),
              (window &&
                window.Shopify &&
                window.Shopify.designMode &&
                window.Shopify.designMode === !0 &&
                $(`#${container_AP_POptions}`).text(
                  "[Your AvisPlus Options fields will appear here]"
                ),
              "function" ==
                typeof window.AP_POptions.apps.productoptions.uploaderyReady &&
                window.AP_POptions.apps.productoptions.uploaderyReady.call(
                  $(`#${container_AP_POptions}`),
                  []
                ));
          }

          if (!isPopup)
            priceModCart.init(function () {
              return true;
            });
        }
      );
    }

    // Cart page
    var cartPage = {
      cartData: window.ap_front_settings.cart,
      handleCartEditPopup: async function (cartItem, indexCartItem, e) {
        e.preventDefault();

        let avisCartOptionPopupClass = "avis-cartOptionsPopup";
        let avisCartOptionBackdropClass = "avis-cartOptionsBackdrop";

        const o = e.target;
        priceMod.addLoadingAddCart(o);
        const i = () => {
          let t = document.querySelector(`.${avisCartOptionPopupClass}`),
            e = document.querySelector(`.${avisCartOptionBackdropClass}`);
          t && t.remove(), e && e.remove();
        };
        i();
        const a = () => {
            const e = window.ap_front_settings.config.config_app[
                "text_cancel_edit_options_cart"
              ]
                ? window.ap_front_settings.config.config_app[
                    "text_cancel_edit_options_cart"
                  ]
                : "Cancel",
              o = window.ap_front_settings.config.config_app[
                "text_save_changes_edit_options_cart"
              ]
                ? window.ap_front_settings.config.config_app[
                    "text_save_changes_edit_options_cart"
                  ]
                : "Save Changes";
            let n = document.createElement("div");
            return (
              n.classList.add(avisCartOptionPopupClass),
              n.setAttribute("style", "display:none!important"),
              (n.innerHTML = `<div class="avis-popupBox">\n        <form method="post" data-action="/cart/add" enctype="multipart/form-data" class="avis-cart-popup-form" data-avis-cart-popup-form>\n          <div class="avis-popupHeader">\n            <span class="avis-popupHeader-title">${cartItem.title}</span>\n            <span class="avis-popupHeader-close">&times;</span>\n          </div>\n          <div class="avis-popupBody">\n            <input type="hidden" name="id" value=${cartItem.id}>\n            <div class="avis-product-variants"></div>\n          </div>\n          <div class="avis-popupFooter">\n            <button class="avis-popupFooter-cancel">\n              <span>${e}</span>\n            </button>\n            <button class="avis-popupFooter-submit" data-avis-product-atc>\n              <span>${o}</span>\n            </button>\n          </div>\n        </form>\n      </div>`),
              n
            );
          },
          p = () => {
            let t = document.createElement("div");
            return (
              t.classList.add(avisCartOptionBackdropClass),
              t.setAttribute("style", "display:none!important"),
              t.addEventListener("click", i.bind(this)),
              t
            );
          };
        let productInfo = await pluginAction.getProduct(cartItem.handle);
        if (productInfo) {
          let e = a(),
            r = p();
          document.body.appendChild(e),
            document.body.appendChild(r),
            e
              .querySelectorAll(
                ".avis-popupHeader-close, .avis-popupFooter-cancel"
              )
              .forEach((t) => t.addEventListener("click", i.bind(this)));
          priceMod.isEditOptionCart = true;
          e.querySelector(".avis-popupFooter-submit").addEventListener(
            "click",
            submitEditOption
          );
          let s = getElementByKeys("[data-avis-cart-popup-form]", "quickview");
          if (s) {
            console.log("RenderOption");
            priceMod.cartItemEdit = cartItem;
            priceMod.cartItemLineEdit = indexCartItem;
            mainCheckAllRules(productInfo, apoProductDefault, true);
            priceMod.removeLoadingAddCart(o);
            e.setAttribute("style", "display:flex!important");
            r.setAttribute("style", "display:block!important");
          }
        }
      },
      handleChangeQuantity: function (t) {
        let e = t.value,
          o = t.getAttribute("apo-product-group"),
          n = document.querySelectorAll(
            '[apo-parent-product-group="' + o + '"]'
          );
        n.length &&
          n.forEach((t) => {
            let quantity = t.getAttribute("apo-quantity-product-group");
            if (!quantity) quantity = 1;
            t.value = parseInt(quantity) * parseInt(e);
          });
      },
      handleCartUpdate: async function (lineItemKey) {
        let cartInit = this;
        let cart = await priceModCart.getCartV2();
        this.cartData = cart;
        priceMod.cartCurrent = cart;
        let editOptions =
          customizeryConfig.cart_page &&
          customizeryConfig.cart_page.edit_options;
        let txtEditOptions = window.ap_front_settings.config.config_app[
          "text_edit_options_cart"
        ]
          ? window.ap_front_settings.config.config_app["text_edit_options_cart"]
          : "Edit Options";
        let classEditOption = "avis-edit-options";
        const disable_quantity_and_remove = true;

        let cartItems = this.cartData && this.cartData.items;
        let lineItemElems = document.querySelectorAll(lineItemKey.key);

        const addHandleEditCart = (o, r, indexCartItem) => {
          setTimeout(function () {
            if (
              r.properties &&
              r.properties.hasOwnProperty("_has_apo") &&
              !o.querySelector(`.${classEditOption}`)
            ) {
              let i = document.createElement("button");
              i.classList.add(classEditOption),
                (i.innerHTML = `<span>${txtEditOptions}</span>`),
                i &&
                  i.addEventListener(
                    "click",
                    cartInit.handleCartEditPopup.bind(this, r, indexCartItem)
                  );
              let a = o.querySelector(lineItemKey.details);
              if (a) a.appendChild(i);
            }
          }, 500);
        };

        if (cartItems.length > 0 && lineItemElems.length > 0) {
          lineItemElems.forEach((n, r) => {
            let p = cartItems[r];
            p &&
              (disable_quantity_and_remove &&
                ((o, n) => {
                  let r = !1,
                    a = !1,
                    p = !1,
                    quantity = !1;
                  Object.keys(n.properties).length === 0 ||
                    (n.properties.hasOwnProperty("_apo_order")
                      ? ((r = !0), (p = n.properties._apo_order))
                      : n.properties.hasOwnProperty("_apo_parent_order") &&
                        ((a = !0),
                        (p = n.properties._apo_parent_order),
                        n.properties.hasOwnProperty("_apo_quantity") &&
                          (quantity = n.properties._apo_quantity)));
                  let s = o.querySelectorAll(lineItemKey.quantity.wrapper),
                    d = lineItemKey.quantity.input
                      ? o.querySelectorAll(lineItemKey.quantity.input)
                      : [],
                    c = lineItemKey.quantity.decrease
                      ? o.querySelectorAll(lineItemKey.quantity.decrease)
                      : [],
                    l = lineItemKey.quantity.increase
                      ? o.querySelectorAll(lineItemKey.quantity.increase)
                      : [],
                    u = lineItemKey.removeButton
                      ? o.querySelectorAll(lineItemKey.removeButton)
                      : [],
                    editCartSelector = lineItemKey.editButton
                      ? o.querySelectorAll(lineItemKey.editButton)
                      : false;
                  r
                    ? d.length &&
                      (d.forEach((t) => {
                        t.setAttribute("apo-product-group", p),
                          t.addEventListener("change", (t) => {
                            cartInit.handleChangeQuantity(t.target);
                          });
                      }),
                      c.length &&
                        c.forEach((t) => {
                          t.addEventListener("click", () => {
                            setTimeout(() => {
                              cartInit.handleChangeQuantity(d[0]);
                            }, 500);
                          });
                        }),
                      l.length &&
                        l.forEach((t) => {
                          t.addEventListener("click", () => {
                            setTimeout(() => {
                              cartInit.handleChangeQuantity(d[0]);
                            }, 500);
                          });
                        }))
                    : a
                    ? (d.length &&
                        d.forEach((t) => {
                          t.setAttribute("apo-parent-product-group", p),
                            quantity &&
                              t.setAttribute(
                                "apo-quantity-product-group",
                                quantity
                              );
                        }),
                      s.length &&
                        s.forEach((t) => t.classList.add("apo-hidden")),
                      d.length &&
                        d.forEach((t) => t.classList.add("apo-hidden")),
                      c.length &&
                        c.forEach((t) => t.classList.add("apo-hidden")),
                      l.length &&
                        l.forEach((t) => t.classList.add("apo-hidden")),
                      u.length &&
                        u.forEach((t) => t.classList.add("apo-hidden")),
                      editCartSelector &&
                        editCartSelector.length > 0 &&
                        editCartSelector.forEach((t) =>
                          t.classList.add("apo-hidden")
                        ))
                    : (n.isMainProduct = r);
                })(n, p),
              p && r.properties && r.properties.hasOwnProperty("_has_apo"),
              p && editOptions && addHandleEditCart(n, p, r));
          });

          disable_quantity_and_remove &&
            ((t) => {
              let e = t.map((t) => t.variant_id);
              if (e.some((t, o) => e.indexOf(t) != o)) {
                let e = [];
                t.forEach((o, n) => {
                  if (
                    !(Object.keys(o.properties).length === 0) &&
                    o.properties.hasOwnProperty("_apo_parent_order")
                  ) {
                    let quantity = 1;
                    o.properties.hasOwnProperty("_apo_quantity") &&
                      (quantity = o.properties._apo_quantity);
                    let n = t.find(
                      (t) =>
                        !(Object.keys(t.properties).length === 0) &&
                        t.properties.hasOwnProperty("_apo_order") &&
                        t.properties._apo_order ==
                          o.properties._apo_parent_order
                    );
                    n
                      ? o.quantity != n.quantity * parseInt(quantity) &&
                        e.push({
                          id: o.key,
                          quantity: n.quantity * parseInt(quantity),
                        })
                      : e.push({
                          id: o.key,
                          quantity: 0,
                        });
                  }
                }),
                  e.length &&
                    priceModCart.changesCart(e, () => {
                      window.location.reload();
                    });
              } else {
                let e = {
                  updates: {},
                };
                t.forEach((o, n) => {
                  if (
                    o.properties &&
                    o.properties.hasOwnProperty("_apo_parent_order")
                  ) {
                    let quantity = 1;
                    o.properties.hasOwnProperty("_apo_quantity") &&
                      (quantity = o.properties._apo_quantity);
                    let n = t.find(
                      (t) =>
                        !(Object.keys(t.properties).length === 0) &&
                        t.properties.hasOwnProperty("_apo_order") &&
                        t.properties._apo_order ==
                          o.properties._apo_parent_order
                    );
                    if (n) {
                      if (o.quantity != n.quantity * parseInt(quantity)) {
                        e.updates[o.key] = n.quantity * parseInt(quantity);
                      }
                    } else {
                      e.updates[o.key] = 0;
                    }
                  }
                }),
                  Object.keys(e.updates).length === 0 ||
                    priceModCart.updateCart(e, () => {
                      window.location.reload();
                    });
              }
            })(cartItems);
        }
      },
      onCartPageUpdated: function (lineItemKeys) {
        let isOk = false;
        for (let lineItemInfo of lineItemKeys) {
          let lineItemKey = lineItemInfo.key;
          if (!lineItemKey.details) lineItemKey = lineItemInfo;
          let lineItemElems = document.querySelectorAll(lineItemKey.key);
          if (lineItemElems && lineItemElems.length > 0) {
            for (let lineItem of lineItemElems) {
              let d = lineItemKey.quantity.input
                  ? lineItem.querySelectorAll(lineItemKey.quantity.input)
                  : [],
                c = lineItemKey.quantity.decrease
                  ? lineItem.querySelectorAll(lineItemKey.quantity.decrease)
                  : [],
                l = lineItemKey.quantity.increase
                  ? lineItem.querySelectorAll(lineItemKey.quantity.increase)
                  : [],
                g = lineItem.querySelectorAll(lineItemKey.details);

              if (
                (!lineItemKey.quantity.input || d.length > 0) &&
                (!lineItemKey.quantity.decrease || c.length > 0) &&
                (!lineItemKey.quantity.increase || l.length > 0) &&
                g.length > 0
              ) {
                isOk = true;
                cartPage.handleCartUpdate(lineItemKey);
                priceMod.isHandleCartUpdate = true;
                break;
              }

              if (isOk) break;
            }
          }
        }

        if (!isOk) {
          console.log("APO Not Found Key Item Cart List");
        }
      },
      initCartPage: function () {
        if (!AvisOptionsConfig.them_key)
          AvisOptionsConfig.them_key = {
            cart: {
              page: {
                form: false,
                lineitem: false,
              },
            },
          };

        let cartForm = getElementByKeys(
          AvisOptionsConfig.them_key.cart.page.form
        );
        if (window.BOOMR?.themeName === "Testament") {
          cartForm = document.querySelector(
            ".cart-page .ajax-cart__form-wrapper"
          );
        }
        if (customizeryConfig?.shop_id === "10515480627")
        {
          cartForm = document.querySelector("body.template-cart #PageContainer");

        }
        if (!cartForm) {
          if (window?.ap_front_settings?.page_type === "cart")
            console.log("APO Not found form cart");
          return;
        }
        priceModCart.isExistForm = true;

        if ((Shopify.theme && Shopify.theme.name) || window.BOOMR?.themeName) {
          let filterData = AvisOptionsConfig.them_key.cart.page.lineitem.filter(
            (e) =>
              !e.theme_name ||
              (Shopify?.theme?.name &&
                Shopify.theme.name.indexOf(e.theme_name) > -1) ||
              (window.BOOMR?.themeName &&
                e.theme_name.indexOf(window.BOOMR?.themeName) > -1) ||
              e?.theme_name === Shopify?.theme?.schema_name
          );
          if (filterData.length > 0)
            AvisOptionsConfig.them_key.cart.page.lineitem = filterData;
        }
        if (customizeryConfig?.shop_id === "10515480627")
        {
          AvisOptionsConfig.them_key.cart.page.lineitem = [{key:{key:"[data-section-type='cart-template'] tbody .cart__row:not(:has(.cart__removed-product-details))",details:".cart__product-information .cart__remove",quantity:{wrapper:".cart__qty",input:"input.cart__qty-input",decrease:"",increase:""},removeButton:".cart__remove > a"},theme_name:""}];
        }
        this.onCartPageUpdated(AvisOptionsConfig.them_key.cart.page.lineitem);
        new MutationObserver(
          this.onCartPageUpdated.bind(
            this,
            AvisOptionsConfig.them_key.cart.page.lineitem
          )
        ).observe(cartForm, {
          childList: !0,
          subtree: !0,
        });
      },
    };

    let listKeyButtonAddCart = [
      'button[type="submit"].smi-button-add-cart',
      'button[id*="AddToCart"]',
      'button[id*="add-to-cart"]',
      'button[id*="addToCart"]',
      'a[id*="AddToCart"]',
      'a[id*="addToCart"]',
      ".product__add-to-cart-button",
      ".product-submit",
      ".product-form--atc-button",
      ".product-form__cart-submit",
      ".product-buy-buttons--cta",
      ".btn--add-to-cart",
      ".button-cart",
      "button.add-to-cart-btn",
      ".add-to-cart-button",
      "button--addToCart",
      "[data-product-add]",
      'button[data-pf-type*="ProductATC"]',
      "[name=add]:not([type=normal])",
      "[type=submit]:not(.spr-button):not(.apo-exclude)",
      ".lh-buy-now",
      ".qview-btn-addtocart",
      ".ajax-submit.action_button.add_to_cart",
      ".action_button.add_to_cart",
      ".atc-btn-container .add_to_cart",
      ".add_to_cart",
      ".button.ajax-submit.action_button",
      ".action_button.add_to_cart",
      ".action_button.add_to_cart",
      ".btn-addtocart",
      ".product-form__submit",
      ".product-form__add-button",
      ".product-form--add-to-cart",
      ".btn--subtle-hover",
      "#product-add-to-cart",
      "#AddToCart",
      ".button--large",
      ".AddtoCart",
      "button[type='submit'].overlay-tertiary",
      "input[data-btn-addtocart][type='submit'][name='add']"
    ];

    window.AP_POptions = $.extend(
      !0,
      {
        listKeyAppendOptionPG: [
          "[data-avis-cart-popup-form] .avis-popupBody",
          "form[action*='/cart/add'].apo-form-cart:not(.installment)",
          ".home-product form[action*='/cart/add']:not(.installment)",
          ".shop-product form[action*='/cart/add']:not(.installment)",
          "#shopify-section-featured-product form[action*='/cart/add']:not(.installment)",
          "[data-block-type=\"buy-buttons\"] form[action*='cart/add']:not(.installment)",
          ".product-form__buy-buttons form[action*='cart/add']:not(.installment)",
          "product-form form[action*='cart/add']:not(.installment)",
          ".product-form form[action*='cart/add']:not(.installment)",
          ".product-page form[action*='cart/add']:not(.installment)",
          ".product-add form[action*='cart/add']:not(.installment)",
          "[id*='ProductSection--'] form[action*='cart/add']:not(.installment)",
          "form#add-to-cart-form:not(.installment)",
          "form.sf-cart__form:not(.installment)",
          "form.productForm:not(.installment)",
          "form.product-form:not(.installment)",
          "form.product-single__form:not(.installment)",
          "form.shopify-product-form:not(.installment)",
          "form.atc-form:not(.installment)",
          "form.atc-form-mobile:not(.installment)",
          "form[action*='/cart/add']:not([hidden]):not(.installment)",
          "form[action*='/cart/add']:not(.installment)",
        ],
        variantWrapper:
          '.avis-variant-wrapper, [id*="MainProduct-"] variant-selects, [id*="MainProduct-"] variant-radios, .sp-swatches-container, .t4s-swatch, .inline-field-wrapper.js-required, select[id*="product-select-"], variant-radios, variant-selects, .variant-wrapper.variant-wrapper--button.js, .avis-swatch-product-container, variant-picker',
        addToCartButton: listKeyButtonAddCart.join(":not(.gPreorderHidden),") + ":not(.gPreorderHidden)",
        classContainerHidden: "avis-input-hiddens",
        apps: {
          productoptions: {
            _initialized: !0,
            _fieldsReady: !1,
            validate: null,
            validateType: null,
            jQueryKey: "jQuery",
            formAddOptionClassProductPage: "form[action$='/cart/add']",
            formAddOptionProductPage: null,
            avisOrgAddCartButtonClass: "avis-org-addcart-button",
            avisNewAddCartButtonClass: "avis-new-addcart-button",
            addToCartButton: "form[action$='/cart/add'] [type=submit]",
            addToCartButtonAPO:
              "form[action$='/cart/add'].apo-form-cart [type=submit]",
            validationEventName: "click",
            insertContainerAfter: null,
            themeAppExtensionActive: !1,
            themeAppExtensionId: null,
            activeProductId: null,
            checkExistInputInvalid: false,
            toggleInputError: toggleStyleErrorForInput,
            allowedValueLetterRegex:
              /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]+/,
            allowedValueLetterNumberRegex:
              /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
            validateInput: validateDataInput,
            getLatestVariantPrice: h,
            submitPriceModCartAnyways:
              window.ap_front_settings?.shop_id == "9291762",
            hideDynamicCheckout: !1,
            skipPriceModIfVisible:
              'form[action$="/cart/add"] [type=submit] .secondary-text',
            errorStyles: {
              "background-color": "#fef6f5",
              color: "#666",
              "border-color": "#ff5d5d",
            },
            strings: {
              charactersRemaining: "Characters remaining",
              totalQuantityMin:
                "Selected {selected_quantity} item(s). Please select at least {min_total_quantity} item(s)",
              totalQuantityMax:
                "Selected {selected_quantity} out of {max_total_quantity} item(s)",
              errorMessages: {
                forTextInputs:
                  "Please fill out this field before adding this item to cart",
                forNumberInputs:
                  "Please fill out this field before adding this item to cart",
                forCheckboxes:
                  "Please select your options before adding this item to cart",
                forSwitch:
                  "Please confirm your options status before adding this item to cart",
                forMinimumValues:
                  "Please select at least {min_selections} option(s) before adding this item to cart",
                forDropdowns:
                  "Please select an option before adding this item to cart",
                forDynamicCheckout:
                  "This product cannot be purchased using this checkout method. Please add the item to cart, then proceed to checkout from the cart.",
                forColorInputs:
                  "Please add your personalized color before adding this item to cart",
                forFileInputs:
                  "Please upload file before adding this item to cart",
                forTextLettersValid:
                  "Please enter only letters before adding this item to cart",
                forTextLettersAndNumbersValid:
                  "Please enter only letters and numbers before adding this item to cart",
                forMinQuantity:
                  "Please select at least {min_quantity} item(s) before adding this item to cart",
              },
            },
            debug:
              window.AP_POptions &&
              window.AP_POptions.Cookies &&
              "undefined" !=
                typeof window.AP_POptions.Cookies("avisplus_options_debug"),
          },
        },
      },
      window.AP_POptions
    );
    AvisOptionsData = AvisOptionsData || {};
    AvisOptionsData.mainCheckAllRules = mainCheckAllRules;
    AvisOptionsData.pluginAction = pluginAction;
    AvisOptionsData.formProductQuickview = "";
    window.AP_POptions.apps.productoptions.priceMod = priceMod;
    window.AP_POptions.apps.productoptions.init = mainCheckAllRules;
    //window.AP_POptions.apps.productoptions.reInitEvents = checkButtonAddCart;
    mainCheckAllRules();

    if (window.BOOMR && window.BOOMR.themeName === "Testament") {
      let setIntervalCheckCart = setInterval(function () {
        if (!priceModCart.isExistForm) {
          cartPage.initCartPage();
        } else {
          clearInterval(setIntervalCheckCart);
        }
      }, 300);
    } else {
      cartPage.initCartPage();
    }
    return;
    // });
  }),
  (doesFileExist = function (urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open("HEAD", urlToFile, false);
    xhr.send();

    return xhr.status !== 404;
  }),
  (ap_loadConfig = function ($) {
    var shop_id = window.ap_front_settings.shop_id;
    if (shop_id && shop_id != "") {
      if (
        window.ap_front_settings.config &&
        window.ap_front_settings.config.hasOwnProperty("config_app") &&
        window.ap_front_settings.config.hasOwnProperty("optionset")
      ) {
        var optionsConfigData =
          window.ap_front_settings.config.config_app ?? {};
        optionsConfigData.css =
          window.ap_front_settings.config["config_css"] ?? "";
        optionsConfigData.optionSets =
          window.ap_front_settings.config.optionset;
        if (typeof optionsConfigData.enabled == "string") {
          optionsConfigData.enabled = optionsConfigData.enabled == "true";
        }

        if (typeof optionsConfigData["show_cart_discount"] == "string") {
          optionsConfigData.show_cart_discount =
            optionsConfigData.show_cart_discount == "true";
        }

        if (optionsConfigData && optionsConfigData.enabled) {
          ap_addOptions($, optionsConfigData);
        }
      } else {
        var urlConfig = `https://product-options-js.avisplus.io/${shop_id}.js`;
        doesFileExist(urlConfig) &&
          ap_loadScript(urlConfig, function () {
            if (optionsConfig && optionsConfig.enabled) {
              ap_addOptions($, optionsConfig);
            }
          });
      }
    }
  });
"undefined" == typeof window ? this : window,
  (window.ApOptions = window.ApOptions || {});

"undefined" == typeof jQuery ||
window.ap_front_settings?.shop_id == "9291762" ||
(3 == parseInt(jQuery.fn.jquery) &&
  parseFloat(jQuery.fn.jquery.replace(/^1\./, "")) < 2.1)
  ? ap_loadScript(window.ap_front_settings.url_jquery, function () {
      (ap_jQuery = jQuery.noConflict(!0)), ap_loadConfig(ap_jQuery);
    })
  : ((ap_jQuery = jQuery), ap_loadConfig(ap_jQuery));

;/* [Tracking] tracking-selected — first-option interaction / ATC, gated by a 7-day cycle (apo_tracking_selected) */
(function () {
  try {
    if (window.__apoTrackingSelectedInit) return;
    window.__apoTrackingSelectedInit = true;

    var CYCLE_DAYS = 7;
    var MS_PER_DAY = 86400000;
    var SESSION_KEY = 'apo_tracking_selected_called';

    function getConfig() {
      return (window.ap_front_settings && window.ap_front_settings.config) || {};
    }

    function getCycleInfo() {
      var tracking = getConfig().apo_tracking_selected;
      if (!tracking || !tracking.first_date) return { eligible: true, marker: 'init' };
      var firstDate = new Date(tracking.first_date);
      if (isNaN(firstDate.getTime())) return { eligible: true, marker: 'init' };
      var currentDate = tracking.current_date ? new Date(tracking.current_date) : firstDate;
      if (isNaN(currentDate.getTime())) currentDate = firstDate;
      var elapsed = Date.now() - firstDate.getTime();
      if (elapsed < 0) return { eligible: false, marker: 'pre' };
      var cycleStart = firstDate.getTime() + Math.floor(elapsed / (CYCLE_DAYS * MS_PER_DAY)) * CYCLE_DAYS * MS_PER_DAY;
      return { eligible: currentDate.getTime() < cycleStart, marker: String(cycleStart) };
    }

    function getOptionSetId() {
      // apo_ph_option_set_ids holds the option sets actually rendered for this product (populated in checkAllRules callback)
      if (window.apo_ph_option_set_ids && window.apo_ph_option_set_ids.length) {
        return String(window.apo_ph_option_set_ids[0]);
      }
      // Last resort only: config.optionset is ALL sets of the shop, not necessarily the rendered one
      var os = getConfig().optionset;
      if (os && os.length) return String(os[0]._id || os[0].id || '');
      return '';
    }

    function getFirstOption() {
      // CSS v2 customers use .avpoptions-container__v2, CSS v1 customers use .avpoptions-container
      var container = document.querySelector('.avpoptions-container__v2')
        || document.querySelector('.avpoptions-container')
        || document.querySelector('.avis-input-hiddens');
      if (!container) return document.querySelector('.avp-option');
      return container.querySelector('.avp-option') || document.querySelector('.avp-option');
    }

    function firstOptionHasDefaultValue(firstOption) {
      if (!firstOption) return false;
      if (firstOption.querySelector('input:checked, .apo-custom-swatch-item.active, option:checked')) return true;
      var sel = firstOption.querySelector('select');
      if (sel && sel.value) return true;
      var valEl = firstOption.querySelector('input[field-name], textarea[field-name]');
      if (valEl && valEl.value) return true;
      return false;
    }

    function buildPayload(firstOption, selectionSource) {
      var cfg = getConfig();
      var optionType = '';
      var hasPriceAddon = false;
      if (firstOption) {
        optionType = firstOption.getAttribute('key') || (firstOption.dataset && firstOption.dataset.optionType) || '';
        var checkedEl = firstOption.querySelector('input:checked, option:checked, .apo-custom-swatch-item.active');
        if (checkedEl) {
          var priceAttr = checkedEl.getAttribute('data-price-charge') || checkedEl.getAttribute('data-price');
          if (!priceAttr) {
            var labelWrap = checkedEl.closest('label');
            if (labelWrap) priceAttr = labelWrap.getAttribute('data-price-charge');
          }
          if (priceAttr && parseFloat(priceAttr) > 0) hasPriceAddon = true;
        }
      }
      return {
        shop_id: String((window.ap_front_settings && window.ap_front_settings.shop_id) || ''),
        shop_domain: (window.Shopify && window.Shopify.shop) || (window.ap_front_settings && window.ap_front_settings.shop_domain) || "",
        actor_type: 'shopper',
        layer: 'storefront',
        option_type: String(optionType),
        option_set_id: getOptionSetId(),
        selection_source: selectionSource,
        has_price_addon: hasPriceAddon,
        app_version: (window.AvisOptionsData && window.AvisOptionsData.use_productbundle) ? 'v3' : 'v1',
        option_source: 'apo'
      };
    }

    function callTrackingSelected(firstOption, selectionSource) {
      var info = getCycleInfo();
      if (!info.eligible) return;
      var sessKey = SESSION_KEY + '_' + info.marker;
      try { if (sessionStorage.getItem(sessKey)) return; } catch (e) {}
      try { sessionStorage.setItem(sessKey, 'true'); } catch (e) {}
      var payload = buildPayload(firstOption, selectionSource);
      try {
        if (window.posthog && typeof window.posthog.capture === 'function') {
          window.posthog.capture('option.selected', payload);
        }
      } catch (e) {}
      var rootApi = (window.ap_front_settings && window.ap_front_settings.root_api) || 'https://apo-api.avisplus.io/';
      fetch(rootApi + 'api/tracking-app/tracking-selected', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(function (err) {
        console.log('tracking-selected error', err);
        try { sessionStorage.removeItem(sessKey); } catch (e) {}
      });
    }

    function setup() {
      var firstOption = getFirstOption();
      if (!firstOption) return false;
      // selection_source semantics:
      //  - "user"    -> shopper takes an action on the first option
      //  - "default" -> option pre-filled, shopper does nothing to it, then Add-to-Cart
      var hadDefault = firstOptionHasDefaultValue(firstOption);
      var interacted = false;
      var onInteract = function (e) {
        var fo = getFirstOption();
        if (fo && fo.contains(e.target)) { interacted = true; callTrackingSelected(fo, 'user'); }
      };
      document.addEventListener('change', onInteract, true);
      document.addEventListener('input', onInteract, true);
      document.addEventListener('click', onInteract, true);
      // AP_POptions.addToCartButton is populated in every build (base from its local list,
      // v3/v3.2 from AvisOptionsData). AvisOptionsData.listKeyButtonAddCart is only a fallback
      // since it is NOT defined in the base build.
      var ap = window.AP_POptions || {};
      var avd = window.AvisOptionsData || {};
      var atcSelector = []
        .concat(ap.addToCartButton || [])
        .concat(ap.addToCartButton_v2 || [])
        .concat(avd.listKeyButtonAddCart || [])
        .concat(avd.listKeyButtonAddCart_2 || [])
        .filter(Boolean)
        .join(',');
      document.addEventListener('click', function (e) {
        if (!atcSelector || interacted || !hadDefault) return;
        try {
          if (e.target.closest(atcSelector)) callTrackingSelected(getFirstOption(), 'default');
        } catch (err) {}
      }, true);
      return true;
    }

    var tries = 0;
    var poll = setInterval(function () {
      if (setup() || ++tries > 100) clearInterval(poll);
    }, 200);
  } catch (err) {
    console.log('tracking-selected init error', err);
  }
})();
