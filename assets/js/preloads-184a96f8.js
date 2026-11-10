
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills-legacy.CLEbs1mS.js","/cdn/shopifycloud/checkout-web/assets/c1/app-legacy.Cejn54RM.js","/cdn/shopifycloud/checkout-web/assets/c1/esnext-vendor-legacy.DLmk21Na.js","/cdn/shopifycloud/checkout-web/assets/c1/context-browser-legacy.BVHhBOYS.js","/cdn/shopifycloud/checkout-web/assets/c1/checkout-policy-legacy.B2LsVH8N.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-installmentsNotSupportedForAddress-legacy.DHpsmzqF.js","/cdn/shopifycloud/checkout-web/assets/c1/receipt-mapper-load-recovery-legacy.CnT-zD2r.js","/cdn/shopifycloud/checkout-web/assets/c1/receipt-eager-mappers-legacy.pVXSQ85q.js","/cdn/shopifycloud/checkout-web/assets/c1/consent-manager-shared-legacy.DoUdn2N9.js","/cdn/shopifycloud/checkout-web/assets/c1/sections-shared-legacy.DWeAEABn.js","/cdn/shopifycloud/checkout-web/assets/c1/error-logger-report-graphql-error-legacy.BhDTeju_.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-pay-normalizeBuyerDetails-legacy.Bq8poU99.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-derivations-legacy.0xpKN6Hi.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-shopCashMoney-legacy.D7Bo_GcY.js","/cdn/shopifycloud/checkout-web/assets/c1/color-contrast-colorContrast-legacy.bdt8C3Ee.js","/cdn/shopifycloud/checkout-web/assets/c1/graphql-redeemable-legacy.DLtotcZ2.js","/cdn/shopifycloud/checkout-web/assets/c1/hydrate-legacy.zJl1nA3m.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayExternalAppContext-legacy.DQfAk46Q.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en-legacy.cbZubmw6.js","/cdn/shopifycloud/checkout-web/assets/c1/OnePage-legacy.BZ_GioHo.js","/cdn/shopifycloud/checkout-web/assets/c1/components-DeliveryTransition-legacy.t38ck-WB.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayButtonClassName-legacy.BkJ1N5wf.js","/cdn/shopifycloud/checkout-web/assets/c1/cross-border-hooks-legacy.CtJGmS0y.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-usePickupPoints-legacy.DT_pUq-C.js","/cdn/shopifycloud/checkout-web/assets/c1/ChangeCompanyLocationLink-legacy.DzYfDkb2.js","/cdn/shopifycloud/checkout-web/assets/c1/BillingAddressForm-legacy.BbWYo1oV.js","/cdn/shopifycloud/checkout-web/assets/c1/PhoneField-legacy.DB_h3CrG.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useSuppressShopPayModalOnLoad-legacy.9Hixpwuk.js","/cdn/shopifycloud/checkout-web/assets/c1/components-RedirectionNotice.module-legacy.DaMOKRPd.js","/cdn/shopifycloud/checkout-web/assets/c1/Popover-legacy.2badq0Rw.js","/cdn/shopifycloud/checkout-web/assets/c1/Choice-legacy.CR49dFX5.js","/cdn/shopifycloud/checkout-web/assets/c1/Checkbox-legacy.CcEYSa3S.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useCanChangeCompanyLocation-legacy.DkiAEiKR.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useForceShopPayUrl-legacy.K_mo-Ccy.js","/cdn/shopifycloud/checkout-web/assets/c1/ImpressionEventCapture-legacy.1qdNdX__.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-previous-legacy.DEYV2YYu.js","/cdn/shopifycloud/checkout-web/assets/c1/CaptureEvents-ButtonWithRegisterWebPixel-legacy.C8_bjGiX.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayLogo-legacy.CaFbnviS.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useWalletsTimeout-legacy.DGWiib6s.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-usePostPurchase-legacy.FUCD2Xgk.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useWalletsMonorailTrack-legacy.e5GtEerh.js","/cdn/shopifycloud/checkout-web/assets/c1/EmptyState-legacy.BlFYMahg.js","/cdn/shopifycloud/checkout-web/assets/c1/Section-SectionStyleOverride-legacy.DQa6ksjT.js","/cdn/shopifycloud/checkout-web/assets/c1/AutocompleteField-hooks-legacy.BKO0sBH2.js","/cdn/shopifycloud/checkout-web/assets/c1/PendingShipping-legacy.DNthioAn.js","/cdn/shopifycloud/checkout-web/assets/c1/RememberMeSection-legacy.B_K5hOgS.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentIcon-legacy.D6rldq1a.js","/cdn/shopifycloud/checkout-web/assets/c1/cvv-cvvBridge-legacy.CKQPvW22.js","/cdn/shopifycloud/checkout-web/assets/c1/payment-usePaymentExemptionReason-legacy.CoEx7twe.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useGeneralPaymentErrorMessage-legacy.B0Sx-Dp-.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentLine-legacy.CnqRa3SN.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUpdateCheckoutAddress-legacy.BW2INyOt.js","/cdn/shopifycloud/checkout-web/assets/c1/Section-legacy.CEhBA0b8.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentErrorBanner-legacy.DN-bPE8l.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useOnePageFormSubmit-legacy.DgUqa6I1.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentButtons-legacy.M6TvJAzQ.js","/cdn/shopifycloud/checkout-web/assets/c1/PayButton-sizing-legacy.D43_u7m1.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPaySessionTokenStorage-legacy.D5T-cbEG.js","/cdn/shopifycloud/checkout-web/assets/c1/sandbox-helpers-legacy.LkWOTIiS.js","/cdn/shopifycloud/checkout-web/assets/c1/utils-useViolationsHandler-legacy.BiIi8Wjx.js","/cdn/shopifycloud/checkout-web/assets/c1/checkout-as-guest-amazon-pay-legacy.DeZnYksL.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-payment-button-legacy.C-osQHe9.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShouldRevealExtension-legacy.DbYpPq3G.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-usePreselectSpi-legacy.DI8IqTMK.js","/cdn/shopifycloud/checkout-web/assets/c1/Switch-legacy.CtsuOOKu.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useAvailableShopPromotionDiscounts-legacy.BuTsL8Jr.js","/cdn/shopifycloud/checkout-web/assets/c1/Middot-legacy.Cp6fAMPY.js","/cdn/shopifycloud/checkout-web/assets/c1/EstimatedDeliveryContent-legacy.DnUTj1rN.js","/cdn/shopifycloud/checkout-web/assets/c1/shipping-methods-consolidated-included-legacy.Nxq7M7wi.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingLines-legacy.Dmv7yMZA.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown-legacy.D-GiSVKR.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal-legacy.BgO29AGs.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodSelector-legacy.BkuOPQts.js","/cdn/shopifycloud/checkout-web/assets/c1/TextArea-legacy.Cgfadz1p.js","/cdn/shopifycloud/checkout-web/assets/c1/SubscriptionPriceBreakdown-legacy.CK96FvrM.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayNewSignupLoginExperiment-legacy.f85L2HPT.js","/cdn/shopifycloud/checkout-web/assets/c1/MobileOrderSummary-legacy.DWtMYXSg.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useStableHostMethodsReferences-legacy.BxmSA_6d.js","/cdn/shopifycloud/checkout-web/assets/c1/BillingAddressSelector-legacy.Dn8kKwRP.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblems-StockProblemsLineItemList-legacy.B3re4KqI.js"];
      var styles = [];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["assets/images/only_logo_copy_x320-257925e7-2.png"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = preconnectOrigins.concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  