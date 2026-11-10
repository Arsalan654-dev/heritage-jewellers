
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills.Db3KX98s.js","/cdn/shopifycloud/checkout-web/assets/c1/app.DOhLmDBX.js","/cdn/shopifycloud/checkout-web/assets/c1/esnext-vendor.Dqyj125j.js","/cdn/shopifycloud/checkout-web/assets/c1/context-browser.cm4PoLHi.js","/cdn/shopifycloud/checkout-web/assets/c1/checkout-policy.DW9ytDJl.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-installmentsNotSupportedForAddress.xDoNrrB1.js","/cdn/shopifycloud/checkout-web/assets/c1/receipt-mapper-load-recovery.BDvYfFel.js","/cdn/shopifycloud/checkout-web/assets/c1/receipt-eager-mappers.CL2V45pb.js","/cdn/shopifycloud/checkout-web/assets/c1/consent-manager-shared.DrpmMiiD.js","/cdn/shopifycloud/checkout-web/assets/c1/sections-shared.OvESELpb.js","/cdn/shopifycloud/checkout-web/assets/c1/error-logger-report-graphql-error.B-fUYaQU.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-pay-normalizeBuyerDetails.6S8B4Qp4.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-derivations.DfFaSokM.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-shopCashMoney.D8M62Vx3.js","/cdn/shopifycloud/checkout-web/assets/c1/color-contrast-colorContrast.CuiwDbRN.js","/cdn/shopifycloud/checkout-web/assets/c1/graphql-redeemable.BfQ8CAS5.js","/cdn/shopifycloud/checkout-web/assets/c1/hydrate.Db5jYXYc.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayExternalAppContext.B1undEur.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en.BqHdjmAI.js","/cdn/shopifycloud/checkout-web/assets/c1/OnePage.DfLZfol9.js","/cdn/shopifycloud/checkout-web/assets/c1/components-DeliveryTransition.Dw1eeXVA.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayButtonClassName.CiQUvw4p.js","/cdn/shopifycloud/checkout-web/assets/c1/cross-border-hooks.BCyd8Sd0.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-usePickupPoints.B1ZsmIo9.js","/cdn/shopifycloud/checkout-web/assets/c1/ChangeCompanyLocationLink.DRy73sIG.js","/cdn/shopifycloud/checkout-web/assets/c1/BillingAddressForm.CcGgUWIT.js","/cdn/shopifycloud/checkout-web/assets/c1/PhoneField.DGq-SnXv.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useSuppressShopPayModalOnLoad.BTXqmrT7.js","/cdn/shopifycloud/checkout-web/assets/c1/components-RedirectionNotice.module.CdtrNr4j.js","/cdn/shopifycloud/checkout-web/assets/c1/Popover.BsTpddC_.js","/cdn/shopifycloud/checkout-web/assets/c1/Choice.BAAU_YDJ.js","/cdn/shopifycloud/checkout-web/assets/c1/Checkbox.C72v0GlQ.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useCanChangeCompanyLocation.B8s69XpZ.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useForceShopPayUrl.D7wvYzqx.js","/cdn/shopifycloud/checkout-web/assets/c1/ImpressionEventCapture.t-Tvbb-q.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-previous.BC7Q4RIR.js","/cdn/shopifycloud/checkout-web/assets/c1/CaptureEvents-ButtonWithRegisterWebPixel.Bgqmsi6d.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayLogo.B9cksDb4.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useWalletsTimeout.CLqmOzNy.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-usePostPurchase.BazzUBJo.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useWalletsMonorailTrack.Cts5uvvV.js","/cdn/shopifycloud/checkout-web/assets/c1/EmptyState.CExwBrtU.js","/cdn/shopifycloud/checkout-web/assets/c1/Section-SectionStyleOverride.ZqLyEMdT.js","/cdn/shopifycloud/checkout-web/assets/c1/AutocompleteField-hooks.DDT1h22M.js","/cdn/shopifycloud/checkout-web/assets/c1/PendingShipping.OeRTWdTI.js","/cdn/shopifycloud/checkout-web/assets/c1/RememberMeSection.BeoiMFe0.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentIcon.BoiMQVZW.js","/cdn/shopifycloud/checkout-web/assets/c1/cvv-cvvBridge.CfeymLSi.js","/cdn/shopifycloud/checkout-web/assets/c1/payment-usePaymentExemptionReason.M_61XXhc.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useGeneralPaymentErrorMessage.BHC2avpf.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentLine.CD4ILD2N.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUpdateCheckoutAddress.CEH9_znZ.js","/cdn/shopifycloud/checkout-web/assets/c1/Section.Dj78HDUB.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentErrorBanner.CWAn17fI.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useOnePageFormSubmit.g2QdwKx_.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentButtons.BrssZye2.js","/cdn/shopifycloud/checkout-web/assets/c1/PayButton-sizing.1AANQE8v.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPaySessionTokenStorage.CN9gBH2u.js","/cdn/shopifycloud/checkout-web/assets/c1/sandbox-helpers.CdfsJhj1.js","/cdn/shopifycloud/checkout-web/assets/c1/utils-useViolationsHandler.DEtBPdse.js","/cdn/shopifycloud/checkout-web/assets/c1/checkout-as-guest-amazon-pay.BkA9ZwqE.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-payment-button.Br3HLXg5.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShouldRevealExtension.Dk8DSBA5.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-usePreselectSpi.D4VpRf0u.js","/cdn/shopifycloud/checkout-web/assets/c1/Switch.BpPiJzmK.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useAvailableShopPromotionDiscounts.BcLlVIX_.js","/cdn/shopifycloud/checkout-web/assets/c1/Middot.B7a2SPZG.js","/cdn/shopifycloud/checkout-web/assets/c1/EstimatedDeliveryContent.D3uq0R9t.js","/cdn/shopifycloud/checkout-web/assets/c1/shipping-methods-consolidated-included.CiKGgCbx.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingLines.5nmjCzHZ.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown.OvybV0bH.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal.BVCeuZ1_.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodSelector.BcW_4n6L.js","/cdn/shopifycloud/checkout-web/assets/c1/TextArea.Bd3zHs3B.js","/cdn/shopifycloud/checkout-web/assets/c1/SubscriptionPriceBreakdown.4m4s_FjI.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayNewSignupLoginExperiment.DEthpiHV.js","/cdn/shopifycloud/checkout-web/assets/c1/MobileOrderSummary.DJ3w-yGQ.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useStableHostMethodsReferences.DcyopmUf.js","/cdn/shopifycloud/checkout-web/assets/c1/BillingAddressSelector.B4UtkLxU.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblems-StockProblemsLineItemList.Ca0g46oJ.js"];
      var styles = ["/cdn/shopifycloud/checkout-web/assets/c1/assets/app.CM6PQxCl.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/checkout-policy.Dy6nOzcc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/stopwatch.CA9UAEYG.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OnePage.DkWpx8b4.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/DeliveryTransition.CxmS455s.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/RememberMeSection.DQeXjG1A.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Section.CU18S7Ap.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentLine.D3bcP-mr.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useOnePageFormSubmit.tSP6pJcp.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentIcon.gzvCNwz_.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/cvvBridge.CIy8uDiZ.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Choice.DNWz77j7.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/sizing.ZgfJ23-d.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/BillingAddressForm.BdwN7V1K.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Switch.Dq_6Ius6.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/EmptyState.BEvzDDvy.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useShopPayButtonClassName.CpHF4L7Q.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PhoneField.uZEuHncj.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Middot.D7Ujmshx.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ShippingLines.LcqrKXE1.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/MerchandiseModal.D6OuIVjc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/RedirectionNotice.B8v_QGNW.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/EstimatedDeliveryContent.B_THySFF.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/MobileOrderSummary.2B5x30PG.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentButtons.BbF1yV61.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["assets/images/only_logo_copy_x320-257925e7-3.png"];

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
  