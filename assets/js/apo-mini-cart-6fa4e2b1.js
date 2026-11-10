AvisOptionsConfig.mini_carts = [
  {
    cart_item: {
      key: "form[action*=\"/cart\"].mini-cart cart-items ul li",
      details: ".product-description > dl",
      quantity: {
          wrapper: "quantity-input.quantity",
          input: "quantity-input .quantity__input",
          decrease: ".quantity__button[name=\"minus\"]",
          increase: ".quantity__button[name=\"plus\"]"
      },
      removeButton: "a.delete-product"
  }
  },
  {
    theme: "Dawn",
    cart_item: {
          key: "cart-drawer form[action*=\"/cart\"] .cart-items .cart-item",
          details: ".cart-item__details",
          quantity: {
              wrapper: "quantity-input.quantity",
              input: "quantity-input .quantity__input",
              decrease: ".quantity__button[name=\"minus\"]",
              increase: ".quantity__button[name=\"plus\"]"
          },
          removeButton: "cart-remove-button"
      }
  },
  {
    cart_item: {
          key: "form[action*=\"/cart\"] .ajax-cart__cart-items > ul",
          details: "li.ajax-cart__item-details",
          quantity: {
              wrapper: "li.ajax-cart__item-qty .ajax-cart__item-quantity",
              input: ".ajax-cart__qty-input",
              decrease: ".ajax-cart__qty-control--down",
              increase: ".ajax-cart__qty-control--up"
          },
          removeButton: "li.ajax-cart__item-remove"
      }
  },
  {
      cart_item: {
          key: "form[action*=\"/cart\"] .cart-items .cart-item",
          details: "",
          quantity: {
              wrapper: "",
              input: "",
              decrease: "",
              increase: ""
          },
          removeButton: "cart-remove-button"
      }
  },
  {
    cart_item: {
          key: "form[action*=\"/cart\"]#mini-cart .mini-cart__line-item",
          details: ".mini-cart__product-info",
          quantity: {
              wrapper: ".mini-cart__quantity .quantity-selector",
              input: "input.quantity-selector__value",
              decrease: ".quantity-selector__button[data-action=\"decrease-quantity\"]",
              increase: ".quantity-selector__button[data-action=\"increase-quantity\"]"
          },
          removeButton: "a.mini-cart__quantity-remove"
      }
  },
  {
    theme: "Spark v2.6.2", 
    cart_item: {
          key: ".quick-cart .quick-cart__items .quick-cart__item",
          details: ".quick-cart__item-middle",
          quantity: {
              wrapper: ".quick-cart__control .quick-cart__control-top",
              input: "",
              decrease: "button.quick-cart__button",
              increase: ""
          },
          removeButton: ""
      }
  },
  {
    theme: "", 
    cart_item: {
          key: "form[action*=\"/cart\"]#cart-drawer-form .cart-item",
          details: ".cart-item__details",
          quantity: {
              wrapper: ".qty-input.qty-input--combined",
              input: ".qty-input__input.input",
              decrease: ".qty-input__btn.btn.btn--minus",
              increase: ".qty-input__btn.btn.btn--plus"
          },
          removeButton: "a.cart-item__remove"
      }
  },
  {
    theme: "", 
    cart_item: {
          key: ".cart-drawer__items line-item.line-item",
          details: ".line-item-info",
          "quantity": {
          "wrapper": 'quantity-selector.quantity-selector',
          "input": 'input.quantity-selector__input',
          "decrease": '.quantity-selector__button',
          "increase": '.quantity-selector__button'
      },
      "removeButton": 'line-item-quantity a.link'
      }
  },
  {
    theme_name: "Stiletto 2.1.0",
    cart_item: {
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
  },
  {
    theme_name: "Bullet 2.4.6",
    cart_item: {
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
  },
  {
    theme: "Pipeline 7.1.3", 
    cart_item: {
      key: "[data-section-type='cart-drawer'] .cart__items .cart__items__row",
      details: ".cart__items__title",
      "quantity": {
          "wrapper": '.quantity__wrapper',
          "input": 'input.quantity__input',
          "decrease": '.quantity__button--plus',
          "increase": '.quantity__button--minus'
      },
      "removeButton": '.cart__items__remove a'
    },
  },
  {
    theme: "Ella 6.5.4",
    cart_item: {
      key: ".previewCart-wrapper .previewCartItem",
      details: ".card-properties.cart-item-properties",
      "quantity": {
          "wrapper": 'cart-update-quantity.previewCartItem-qty',
          "input": 'input.form-input.quantity',
          "decrease": 'a.minus.btn-quantity',
          "increase": 'a.plus.btn-quantity'
      },
      "removeButton": 'button.previewCartItem-remove'
    },
  },
  {
    theme_name: "Abode 2.0.2",
    cart_item: {
      "key": 'form[action*=\"/cart\"].cart__contents cart-notification-item',
      "details": '.cart-notification-item__details',
      "quantity": {
          "wrapper": '.quantity-input',
          "input": 'input.quantity__input',
          "decrease": 'button.quantity__button[name=\"minus\"]',
          "increase": 'button.quantity__button[name=\"plus\"]'
      },
      "removeButton": 'cart-remove-button a.link'
    },
  },
  {
    theme_name: "Local 2.0.0",
    cart_item: {
      "key": 'form[action*=\"/cart\"]#cart .cart-item',
      "details": '.cart-item__content',
      "quantity": {
          "wrapper": 'cart-product-quantity',
          "input": 'input.quantity__input',
          "decrease": 'button.qty-button.qty-minus',
          "increase": 'button.qty-button.qty-plus'
      },
      "removeButton": 'a.remove'
    },
  },
  {
    theme_name: "Local 2.0.0",
    cart_item: {
      "key": '.slidecarthq .items .item',
      "details": '',
      "quantity": {
          "wrapper": '.quantity-selector',
          "input": 'input[type="text"]',
          "decrease": '.quantity-selector button[aria-label*="decrease"]',
          "increase": '.quantity-selector button[aria-label*="increase"]'
      },
      "removeButton": 'button.remove'
    }
  },
  {
    theme_name: "Broadcast 5.5.0",
    cart_item: {
      "key": 'cart-items .cart__item',
      "details": '.cart__item__content-inner',
      "quantity": {
          "wrapper": 'quantity-counter.cart__quantity-counter',
          "input": 'input.cart__quantity-field',
          "decrease": 'button.cart__quantity-minus',
          "increase": 'button.cart__quantity-plus'
      },
      "removeButton": 'a.cart__item__remove'
    }
  },
  {
    theme_name: "Impulse 7.4.1", //monster_upsell app
    cart_item: {
      "key": '#monster-cart-wrapper .mu-cart-item',
      "details": '.mu-item-properties',
      "quantity": {
          "wrapper": '.mu-item-quantity',
          "input": '',
          "decrease": 'button.mu-rounded-l',
          "increase": 'button.mu-rounded-r'
      },
      "removeButton": 'button.mu-rounded-l'
    }
  },
  {
    theme_name: "Impact 4.3.3",
    cart_item: {
      "key": 'cart-drawer#cart-drawer .cart-drawer__line-items .cart-itembox line-item.cart-itembox-item',
      "details": '.cart-itembox-item-details',
      "quantity": {
          "wrapper": 'line-item-quantity .ajaxcart__qty',
          "input": 'input.quantity-input',
          "decrease": 'button.ajaxcart__qty-adjust.ajaxcart__qty--minus',
          "increase": 'button.ajaxcart__qty-adjust.ajaxcart__qty--plus'
      },
      "removeButton": 'a.delete-qty.ajaxcart__qty-remove'
    }
  },
  {
    theme_name: "Palo Alto 5.4.1",
    cart_item: {
      "key": '#cart-drawer .cart__item',
      "details": '.cart__item__info',
      "quantity": {
          "wrapper": '.cart__item__quantity',
          "input": 'input.cart__item__quantity-field',
          "decrease": 'button.cart__item__quantity-minus',
          "increase": 'button.cart__item__quantity-plus'
      },
      "removeButton": 'a.cart__item__remove'
    }
  },
  {
    theme_name: "Focal 11.1.0",
    cart_item: {
      "key": 'form[action*=\"/cart\"]#mini-cart-form line-item',
      "details": '.product-item-meta__property-list',
      "quantity": {
          "wrapper": 'line-item-quantity.line-item__quantity',
          "input": 'input.quantity-selector__input',
          "decrease": '.quantity-selector__button[aria-label=\"Decrease quantity\"]',
          "increase": '.quantity-selector__button[aria-label=\"Increase quantity\"]'
      },
      "removeButton": 'a.line-item__remove-button'
    }
  },
  {
    theme_name: "Expanse 4.3.4",
    cart_item: {
      "key": '.rebuy-cart__flyout li.rebuy-cart__flyout-item',
      "details": '.rebuy-cart__flyout-item-properties',
      "quantity": {
          "wrapper": '.rebuy-cart__flyout-item-quantity-widget',
          "input": '',
          "decrease": 'button',
          "increase": 'button'
      },
      "removeButton": 'button.rebuy-cart__flyout-item-remove'
    }
  },
  {
    theme_name: "Athens 2.2.0",
    cart_item: {
      "key": 'form[action*=\"/cart\"].mini-cart-inner .mini-cart-item',
      "details": '.mini-cart-item-info',
      "quantity": {
          "wrapper": '.quantity-input.quantity-input',
          "input": 'input.quantity-input-field',
          "decrease": 'button.quantity-input-button.quantity-input-minus',
          "increase": 'button.quantity-input-button.quantity-input-plus'
      },
      "removeButton": 'cart-remove-button a'
    }
  },
  {
    theme_name: "Ella 6.4.1",
    cart_item: {
      "key": '.halo-sidebar-wrapper .previewCartItem',
      "details": '.card-properties',
      "quantity": {
          "wrapper": 'cart-update-quantity.previewCartItem-qty',
          "input": 'input.form-input.quantity',
          "decrease": 'a.minus.btn-quantity',
          "increase": 'a.plus.btn-quantity'
      },
      "removeButton": 'a.previewCartItem-remove'
    }
  },
  {
    theme_name: "People Village 11.0.5",
    cart_item: {
      "key": '#spro-cart-sidebar .spro-sidebar-wrapper .previewCart .previewCartList .previewCartItem',
      "details": '.previewCartItem-content',
      "quantity": {
          "wrapper": '.previewCartItem-qty ',
          "input": 'input.form-input.quantity',
          "decrease": 'a.minus.btn-quantity',
          "increase": 'a.plus.btn-quantity'
      },
      "removeButton": 'a.previewCartItem-remove'
    }
  },
  {
    theme_name: "Electro",
    cart_item: {
      "key": 'form[action*=\"/cart\"].cart-drawer__form .cart-drawer__product',
      "details": '.cart-drawer__product-info',
      "quantity": {
          "wrapper": 'sht-cart-drwr-qty-inp',
          "input": 'input.js-cart-drawer-quantity-input',
          "decrease": 'button.js-cart-drawer-quantity-btn-minus',
          "increase": 'button.js-cart-drawer-quantity-btn-plus'
      },
      "removeButton": 'button.js-cart-drawer-delete-btn'
    }
  },
  {
    theme_name: "Debutify",
    cart_item: {
      "key": 'form[action*=\"/cart\"]#ajaxCartForm .ajaxcart_row.cart-item',
      "details": '.grid__item.eight-twelfths .spacer-auto-xs',
      "quantity": {
          "wrapper": '.qty-container',
          "input": 'input.qty-input.cart__product-qty',
          "decrease": 'button.qty-minus',
          "increase": 'button.qty-plus'
      },
      "removeButton": 'button.cart__product-remove'
    }
  },
  {
    theme_name: "Pipeline",
    cart_item: {
      "key": '.drawer__content .cart__items__row[data-cart-item]',
      "details": '.cart__items__title',
      "quantity": {
          "wrapper": '.quantity__wrapper',
          "input": 'input.quantity__input',
          "decrease": 'button.quantity__button--minus',
          "increase": 'button.quantity__button--plus'
      },
      "removeButton": '.cart__items__remove a'
    }
  },
  {
    theme_name: "",
    cart_item: {
      "key": 'form#CartDrawerForm .drawer__inner .cart__items .cart__item',
      "details": '.cart__item-details .cart__item-title',
      "quantity": {
          "wrapper": '.js-qty__wrapper',
          "input": 'input.js-qty__num',
          "decrease": 'button.js-qty__adjust--minus',
          "increase": 'button.js-qty__adjust--plus'
      },
      "removeButton": '.cart__remove'
    }
  },
  {
    theme_name: "Halo",
    cart_item: {
      "key": "quick-cart-items .previewCart ul li.previewCartItem",
      "details": ".previewCartItem-content",
      "quantity": {
        "wrapper": ".previewCartItem-qty",
        "input": "input.form-input.quantity",
        "decrease": "",
        "increase": "",
      },
      "removeButton": "a.previewCartItem-remove",
    },
  },
  {
    theme_name: "Brooklyn",
    cart_item: {
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
  },
   {
    theme_name: "Optimal",
    cart_item: {
      "key": ".mini_pr_list > li",
      "details": ".pr_details",
      "quantity": {
        "wrapper": "div.qtyField",
        "input": "",
        "decrease": "div.qtyField a:first-child",
        "increase": "div.qtyField a:last-child",
      }, 
      "removeButton": "a.remove[data-cart-remove]",
    },
  },
];
function apoMiniCart() {
  var apoMiniCartSelector = document.querySelector('mini-cart') || document.querySelector('cart-drawer') || document.querySelector('#CartDrawer') || document.querySelector('#drawer-cart') || document.querySelector('#halo-cart-sidebar') || document.querySelector('#cartDrawer'); 
  var listCartUpdate = {};
  if (!apoMiniCartSelector)
  {
    apoMiniCartSelector = document.querySelector('#mini-cart');
  }
  if (["73131721038"].includes(window?.ap_front_settings?.shop_id) && window?.ap_front_settings?.page_type === "cart") {
    apoMiniCartSelector = null;
  }
  const getCartV2 = async () => fetch("/cart.json?avis=minicart").then((t) => t.json()).then((t) => t);

  const updateCart = (t) => {
    fetch("/cart/update.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(t),
    })
      .then((t) => t.json())
      .then((t) => {
        if (t)
        {
          console.log("update carts", t);
          if (typeof apoMiniCartSelector.renderContents === "function") {
            apoMiniCartSelector.renderContents(t);
            apoMiniCartSelector.classList.toggle('is-empty', t.item_count === 0);
          }
          else 
          {
            if (window?.routes?.cart_url) {
              window.location = window.routes.cart_url;
            } else window.location.href = "/cart";
          }
        }
      })
      .catch((t) => {
        console.log("Error:", t);
      });
  };
  const handleCartUpdate = async (lineItemKey) => {
    let cart = await getCartV2();
    let cartItems = cart?.items;
    let lineItemElems = apoMiniCartSelector.querySelectorAll(lineItemKey.key);
    if (cartItems && cartItems.length > 0 && lineItemElems.length > 0) {
      lineItemElems.forEach((lineItemSelector, index) => {
        let cartItem = cartItems[index];
        cartItem && ((o, n) => {
          let a = !1,
            quantity = !1;
          Object.keys(n.properties).length === 0 ||
            (n.properties.hasOwnProperty("_apo_order")
              ? true
              : n.properties.hasOwnProperty("_apo_parent_order") &&
              ((a = !0),
                n.properties.hasOwnProperty("_apo_quantity") &&
                (quantity = n.properties._apo_quantity)));
          let s = lineItemKey.quantity.wrapper ? o.querySelectorAll(lineItemKey.quantity.wrapper) : [],
            d = lineItemKey.quantity.input ? o.querySelectorAll(lineItemKey.quantity.input) : [],
            c = lineItemKey.quantity.decrease ? o.querySelectorAll(lineItemKey.quantity.decrease) : [],
            l = lineItemKey.quantity.increase ? o.querySelectorAll(lineItemKey.quantity.increase) : [],
            u = lineItemKey.removeButton ? o.querySelectorAll(lineItemKey.removeButton) : [];
          if (a) {
            (
              s.length &&
              s.forEach((t) => t.classList.add("apo-opacity-05")),
              d.length &&
              d.forEach((t) => t.setAttribute("disabled", "disabled")),
              c.length &&
              c.forEach((t) => t.classList.add("apo-hidden")),
              l.length &&
              l.forEach((t) => t.classList.add("apo-hidden")),
              u.length &&
              u.forEach((t) => t.classList.add("apo-hidden")))
          }
        })(lineItemSelector, cartItem)
      });

      ((t) => {
        let e = t.map((t) => t.variant_id);
        if (e.length > 0) {
          let sections = (typeof apoMiniCartSelector.getSectionsToRender === "function") ? apoMiniCartSelector.getSectionsToRender().map((section) => section.id) : [];
          let e = {sections: sections, updates:{}};
          t.forEach((o) => {
            if (
              !(Object.keys(o.properties).length === 0) &&
              o.properties.hasOwnProperty("_apo_parent_order")
            ) {
              let quantity = 0;
              let quantityUnit = 1;
              o.properties.hasOwnProperty("_apo_quantity") &&
                (quantityUnit = o.properties._apo_quantity);
              let n = t.find(
                (t) =>
                  !(Object.keys(t.properties).length === 0) &&
                  t.properties.hasOwnProperty("_apo_order") &&
                  t.properties._apo_order ==
                  o.properties._apo_parent_order
              );

              if (n)
              {
                quantity = n.quantity * parseInt(quantityUnit);
              }
              if (o.quantity != quantity && listCartUpdate[o.key] !== quantity) {
                listCartUpdate[o.key] = quantity;
                e.updates[o.key] = quantity;
              }
            }
          });
          console.log("Cart e", e);
          Object.keys(e.updates).length === 0 || updateCart(e);
        }
      })(cartItems);
    }
  }
  const handleLoadMiniCart = async () => {
    let isOk = false;
    for (let miniCart of AvisOptionsConfig.mini_carts) {
      let lineItemKey = miniCart.cart_item;
      let lineItemElems = apoMiniCartSelector.querySelectorAll(lineItemKey.key);
      if (lineItemElems && lineItemElems.length > 0) {
        for (let lineItem of lineItemElems) {
          let d = lineItemKey.quantity.input ? lineItem.querySelectorAll(
            lineItemKey.quantity.input
          ) : [],
            c = lineItemKey.quantity.decrease ? lineItem.querySelectorAll(
              lineItemKey.quantity.decrease
            ) : [],
            l = lineItemKey.quantity.increase ? lineItem.querySelectorAll(
              lineItemKey.quantity.increase
            ) : [],
            g = lineItemKey.details ? lineItem.querySelectorAll(lineItemKey.details) : [],
            remove = lineItemKey?.removeButton ? lineItem.querySelectorAll(lineItemKey.removeButton) : [];

          if (
            (!lineItemKey.quantity.input || d.length > 0) &&
            (!lineItemKey.quantity.decrease || c.length > 0) &&
            (!lineItemKey.quantity.increase || l.length > 0) &&
            (!lineItemKey.details || g.length > 0) &&
            (!lineItemKey?.removeButton || remove.length > 0)
          ) {
            isOk = true;
            await handleCartUpdate(lineItemKey);
            break;
          }

          if (isOk) break;
        }
      }
      if (isOk) break;
    }
  }
  if (apoMiniCartSelector) {
    setTimeout(() => {handleLoadMiniCart();}, 300);
    new MutationObserver(
      handleLoadMiniCart
    ).observe(apoMiniCartSelector, {
      childList: !0,
      subtree: !0,
    });
  }

}
apoMiniCart();