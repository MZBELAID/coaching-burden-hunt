/* Site Express — pixel Meta, chargé seulement avec le consentement.
   ──────────────────────────────────────────────────────────────────────────
   Version client du pixels.js du coach : même contrat avec consent.js
   (window.bhPixels.loadAnalytics / loadMarketing / revokeMarketing /
   updateGoogleConsent), mais un seul outil : le pixel Meta du client.
   L'identifiant vient de window.SITE_CONFIG.metaPixelId (dans le <head> de chaque page).
   Rien ici ne se déclenche tout seul : c'est consent.js qui appelle loadMarketing().

   window.sitePx(event, params) : envoie un événement Meta (Lead, InitiateCheckout,
   Purchase…) seulement si le consentement marketing est donné. Sinon, rien. */
(function () {
  if (window.bhPixels) return; // jamais deux fois

  var cfg = window.SITE_CONFIG || {};
  var PIXEL = String(cfg.metaPixelId || '').replace(/\D/g, '');
  var loaded = false;

  function loadMeta() {
    if (loaded || !PIXEL) return; loaded = true;
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s) }(window, document, 'script', 'https://connect.facebook.net/fr_FR/fbevents.js');
    window.fbq('init', PIXEL);
    window.fbq('track', 'PageView');
  }

  window.bhPixels = {
    // Pas d'outil d'analyse sur le site client : rien à charger.
    loadAnalytics: function () { window.__bhAnalyticsOK = true; },
    loadMarketing: function () { window.__bhMarketingOK = true; loadMeta(); },
    revokeMarketing: function () {
      window.__bhMarketingOK = false;
      try { if (window.fbq) window.fbq('consent', 'revoke'); } catch (e) {}
    },
    // Pas de balise Google sur le site client : on garde la fonction pour consent.js.
    updateGoogleConsent: function () {}
  };

  // opts : { eventID } pour qu'un même achat ne soit jamais compté deux fois.
  window.sitePx = function (event, params, opts) {
    if (!window.__bhMarketingOK || !window.fbq) return;
    try { if (opts) window.fbq('track', event, params || {}, opts); else window.fbq('track', event, params || {}); } catch (e) {}
  };

  // Si consent.js a déjà pris sa décision avant la fin du chargement de ce fichier.
  if (window.__bhPixelsReady) { try { window.__bhPixelsReady(); } catch (e) {} }
})();
