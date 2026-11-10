/**
 * Heritage Frontend Fix v4
 * Complete standalone fix - no jQuery dependency
 * Handles: loading screen killer, hamburger menu, drawer open/close, close button, navbar links
 */
(function() {
  'use strict';

  // ============================================
  // NUCLEAR LOADING SCREEN KILLER
  // ============================================

  // 1. Immediately force body visible
  document.documentElement.style.cssText = 'opacity:1 !important; visibility:visible !important;';
  document.body.style.cssText = 'opacity:1 !important; visibility:visible !important; overflow:auto !important;';

  // 2. Aggressive MutationObserver to kill any loading overlay
  function killLoadingOverlay() {
    // Remove any full-page overlay elements
    var allDivs = document.querySelectorAll('div, section, aside');
    for (var i = 0; i < allDivs.length; i++) {
      var el = allDivs[i];
      var style = window.getComputedStyle(el);
      if (style.position === 'fixed' && parseInt(style.zIndex) > 1000 && el.offsetWidth >= window.innerWidth * 0.8 && el.offsetHeight >= window.innerHeight * 0.8) {
        // This looks like a full-page overlay
        el.style.display = 'none !important';
        el.style.opacity = '0 !important';
        el.style.visibility = 'hidden !important';
        el.style.pointerEvents = 'none !important';
      }
    }

    // Kill body scroll lock
    document.body.classList.remove('t4s-lock-scroll', 'is--opend-drawer', 'klaviyo-prevent-body-scrolling', 't4s-prevent-scrolling');
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
    document.body.style.width = 'auto';
    document.documentElement.classList.remove('hdt-reveal-in-view');

    // Force lazy-loaded content visible
    document.querySelectorAll('.lazyloadt4s, .lazyloadt4sed, [data-render-lazy-component]').forEach(function(el) {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
    });

    // Force hdt-reveal elements visible
    document.querySelectorAll('[hdt-reveal]').forEach(function(el) {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
      el.style.transform = 'none';
    });
  }

  // Run immediately
  killLoadingOverlay();

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', killLoadingOverlay);
  }

  // Run after full page load
  window.addEventListener('load', function() {
    killLoadingOverlay();
    // Run again after a delay to catch any lazy-loaded overlays
    setTimeout(killLoadingOverlay, 500);
    setTimeout(killLoadingOverlay, 1000);
    setTimeout(killLoadingOverlay, 2000);
  });

  // Set up MutationObserver to catch dynamically added overlays
  if (window.MutationObserver) {
    var observer = new MutationObserver(function(mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var nodes = mutations[i].addedNodes;
        for (var j = 0; j < nodes.length; j++) {
          var node = nodes[j];
          if (node.nodeType === 1) {
            // Element node
            var style = window.getComputedStyle(node);
            if (style.position === 'fixed' && parseInt(style.zIndex) > 1000) {
              node.style.display = 'none !important';
              node.style.opacity = '0 !important';
              node.style.visibility = 'hidden !important';
            }
          }
        }
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  // Periodic cleanup
  setInterval(killLoadingOverlay, 500);

  var isDrawerOpen = false;

  function openDrawer(id) {
    var drawer = document.querySelector(id);
    if (!drawer) return;
    isDrawerOpen = true;
    drawer.setAttribute('aria-hidden', 'false');
    // Remove invisible classes from close buttons inside this drawer
    drawer.querySelectorAll('.t4s-drawer-menu__close, .t4s-drawer__close').forEach(function(btn) {
      btn.classList.remove('t4s-pe-none', 't4s-op-0');
    });
    // Fix overlay
    var overlay = document.querySelector('.t4s-close-overlay');
    if (overlay) {
      overlay.classList.add('is--visible');
      overlay.classList.remove('t4s-op-0');
    }
    document.body.classList.add('t4s-lock-scroll', 'is--opend-drawer');
    document.documentElement.style.overflow = 'hidden';
  }

  function closeAllDrawers() {
    isDrawerOpen = false;
    document.querySelectorAll('.t4s-drawer[aria-hidden="false"]').forEach(function(d) {
      d.setAttribute('aria-hidden', 'true');
    });
    var overlay = document.querySelector('.t4s-close-overlay');
    if (overlay) {
      overlay.classList.remove('is--visible');
      overlay.classList.add('t4s-op-0');
    }
    document.body.classList.remove('t4s-lock-scroll', 'is--opend-drawer');
    document.documentElement.style.overflow = '';
  }

  // Use document-level capture listener (fires before anything else)
  document.addEventListener('click', function(e) {
    var target = e.target;

    // 1. HAMBURGER MENU BUTTON
    var hamburger = target.closest('.t4s-push-menu-btn');
    if (hamburger) {
      e.preventDefault();
      e.stopPropagation();
      openDrawer('#t4s-menu-drawer');
      return false;
    }

    // 2. Any element with data-drawer-options
    var drawerTrigger = target.closest('[data-drawer-options]');
    if (drawerTrigger) {
      e.preventDefault();
      e.stopPropagation();
      try {
        var opts = JSON.parse(drawerTrigger.getAttribute('data-drawer-options'));
        if (opts && opts.id) {
          openDrawer(opts.id);
        }
      } catch(ex) {}
      return false;
    }

    // 3. CLOSE BUTTON - any close variant
    var closeBtn = target.closest('[data-drawer-close], .t4s-drawer-menu__close, .t4s-drawer__close');
    if (closeBtn) {
      e.preventDefault();
      e.stopPropagation();
      closeAllDrawers();
      return false;
    }

    // 4. OVERLAY CLICK
    if (target.classList.contains('t4s-close-overlay')) {
      e.preventDefault();
      closeAllDrawers();
      return false;
    }
  }, true);

  // ESC key closes drawer
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      closeAllDrawers();
    }
  });

  // On DOM ready: fix close buttons and navbar links
  document.addEventListener('DOMContentLoaded', function() {
    // Add data-drawer-close to all close buttons that are missing it
    document.querySelectorAll('.t4s-drawer-menu__close, .t4s-drawer__close').forEach(function(btn) {
      if (!btn.hasAttribute('data-drawer-close')) {
        btn.setAttribute('data-drawer-close', '');
      }
    });

    // Fix navbar links - ensure they navigate properly
    document.querySelectorAll('.t4s-site-nav__list a, .t4s-mb__menu a, nav a').forEach(function(link) {
      var href = link.getAttribute('href');
      if (!href) return;
      if (link.hasAttribute('data-drawer-options')) return;
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return;
      if (!href.includes('.') && !href.includes('?')) {
        link.setAttribute('href', href + '.html');
      }
    });
  });

})();
