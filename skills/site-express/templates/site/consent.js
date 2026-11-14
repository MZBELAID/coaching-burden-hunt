/* Site Express — bandeau cookies selon le pays (4 modes). Version client du consent.js du coach.
   ──────────────────────────────────────────────────────────────────────────
   Loaded early (defer) on every page. Sets Google Consent Mode v2 defaults to
   denied, asks /api/geo for the country MODE, then:

     strict_optin  → nothing non-essential loads; banner shown AFTER ~4.5 s;
                     refuse = session-only (re-prompt next session); accept = 6 mo.
     mini_notice   → tracking ON; tiny toast after ~4.5 s, auto-hides; opt-out = 6 mo.
     footer_only   → tracking ON; no banner; footer links + CCPA "Do Not Sell"
                     (US/California) + Global Privacy Control honoured (12-mo opt-out).
     no_ui         → tracking ON; no banner; minimal footer.

   Real trackers are loaded by /pixels.js, only when a category is granted.
   Texts FR/EN. Couleurs : variables CSS --cc-bg, --cc-ink, --cc-sub, --cc-accent (définies par la page).
   Contact : window.SITE_CONFIG.email. Aucune mesure first-party (pas de /api/track).
   Le pays vient de /api/geo (Worker Cloudflare). Sans /api/geo : mode strict partout (sécurité). */
(function () {
  if (window.__bhConsentBoot) return;
  window.__bhConsentBoot = true;

  // ── 1. Google Consent Mode v2 — default DENIED, before any Google tag ──────
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    ad_storage: 'denied', analytics_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied',
    wait_for_update: 2000
  });

  // ── storage ────────────────────────────────────────────────────────────────
  var K = {
    status: 'bh_cookie_consent_status', cats: 'bh_cookie_consent_categories',
    exp: 'bh_cookie_consent_expires_at', refused: 'bh_cookie_refused_session',
    mode: 'bh_cookie_country_mode', last: 'bh_cookie_last_prompt_at'
  };
  var SIX_MONTHS = 183 * 864e5, TWELVE_MONTHS = 365 * 864e5;
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function ssGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }

  function readStored() {
    var status = lsGet(K.status);
    if (!status) return null;
    var exp = parseInt(lsGet(K.exp) || '0', 10);
    if (exp && Date.now() > exp) { lsDel(K.status); lsDel(K.cats); lsDel(K.exp); return null; }
    var cats = {}; try { cats = JSON.parse(lsGet(K.cats) || '{}'); } catch (e) {}
    return { status: status, analytics: !!cats.analytics, marketing: !!cats.marketing };
  }
  function writeStored(status, cats, ttl) {
    lsSet(K.status, status);
    lsSet(K.cats, JSON.stringify({ analytics: !!cats.analytics, marketing: !!cats.marketing }));
    lsSet(K.exp, String(Date.now() + (ttl || SIX_MONTHS)));
    lsSet(K.last, String(Date.now()));
  }

  // ── language ────────────────────────────────────────────────────────────────
  var L = (function () {
    var l = (document.documentElement.lang || '').toLowerCase();
    if (l.indexOf('fr') === 0) return 'fr';
    try { var s = (localStorage.getItem('bm_lang') || '').toLowerCase(); if (s) return s.indexOf('fr') === 0 ? 'fr' : 'en'; } catch (e) {}
    return (navigator.language || 'en').toLowerCase().indexOf('fr') === 0 ? 'fr' : 'en';
  })();

  // ── copy ────────────────────────────────────────────────────────────────────
  var T = {
    fr: {
      title: "🍪 On utilise des cookies",
      body: "Certains sont essentiels au bon fonctionnement du site. Avec votre accord, on utilise aussi des cookies marketing pour mesurer nos publicités.\n\nÀ vous de choisir.",
      accept: "J'accepte tout", choose: "Choisir par catégorie", refuse: "Refuser les non essentiels",
      prefsTitle: "Gérer mes cookies", changeMind: "Vous pouvez changer d'avis à tout moment.",
      essName: "Cookies essentiels", essDesc: "Nécessaires au fonctionnement du site : sécurité, navigation, paiement et mémorisation de votre choix. Ils ne peuvent pas être désactivés.", always: "Toujours actifs",
      anaName: "Analyse", anaDesc: "Aucun outil d'analyse n'est utilisé sur ce site pour le moment.",
      mktName: "Marketing", mktDesc: "Nous aide à mesurer nos publicités et à vous montrer des annonces plus pertinentes.",
      refuseAll: "Tout refuser", acceptAll: "Tout accepter", save: "Enregistrer mes choix",
      details: "Voir les détails", policy: "Politique cookies",
      miniBody: "On utilise des cookies pour mesurer nos publicités.", ok: "OK", manage: "Gérer",
      foot: { legal: "Mentions légales", terms: "CGV", returns: "Livraison & remboursements", privacy: "Confidentialité", cookies: "Cookies", choices: "Gérer mes choix", contact: "Contact", manageC: "Gérer mes cookies", dns: "Ne pas vendre ni partager mes infos", toggle: "⚖ Légal & cookies" }
    },
    en: {
      title: "🍪 We use cookies",
      body: "Some are essential for the site to work. With your consent, we also use marketing cookies to measure our ads.\n\nYour call.",
      accept: "Accept all", choose: "Choose by category", refuse: "Refuse non-essential",
      prefsTitle: "Manage cookies", changeMind: "You can change your mind anytime.",
      essName: "Essential cookies", essDesc: "Needed for the site to work: security, navigation, payment and remembering your choice. They can't be turned off.", always: "Always on",
      anaName: "Analytics", anaDesc: "No analytics tool is used on this site for now.",
      mktName: "Marketing", mktDesc: "Helps us measure our ads and show you more relevant ads.",
      refuseAll: "Refuse all", acceptAll: "Accept all", save: "Save my choices",
      details: "See details", policy: "Cookie policy",
      miniBody: "We use cookies to measure our ads.", ok: "OK", manage: "Manage",
      foot: { legal: "Legal notice", terms: "Terms", returns: "Delivery & refunds", privacy: "Privacy", cookies: "Cookies", choices: "Privacy choices", contact: "Contact", manageC: "Manage cookies", dns: "Do Not Sell or Share My Personal Information", toggle: "⚖ Legal & cookies" }
    }
  }[L];

  // Le site client est en français : les pages légales existent seulement en français.
  var URLS = { legal: '/mentions-legales', terms: '/cgv', returns: '/livraison-retours', privacy: '/confidentialite', cookies: '/cookies', choices: '/gerer-mes-cookies' };
  var CONTACT = 'mailto:' + ((window.SITE_CONFIG && window.SITE_CONFIG.email) || '');

  // real third parties (only what the code actually loads)
  var DETAILS = {
    fr: { ana: 'Aucun', mkt: 'Meta (Facebook, Instagram)' },
    en: { ana: 'None', mkt: 'Meta (Facebook, Instagram)' }
  }[L];

  // ── consent state + application ──────────────────────────────────────────────
  var STATE = { mode: '', analytics: false, marketing: false, country: null, region: null, california: false };

  function gtagConsentUpdate(s) {
    window.gtag('consent', 'update', {
      analytics_storage: s.analytics ? 'granted' : 'denied',
      ad_storage: s.marketing ? 'granted' : 'denied',
      ad_user_data: s.marketing ? 'granted' : 'denied',
      ad_personalization: s.marketing ? 'granted' : 'denied'
    });
  }
  var pixelsRequested = false;
  function ensurePixels(cb) {
    if (window.bhPixels) { cb(); return; }
    window.__bhPixelsReady = function () { try { cb(); } catch (e) {} };
    if (pixelsRequested) return; pixelsRequested = true;
    var s = document.createElement('script'); s.src = '/pixels.js'; s.defer = true; document.body.appendChild(s);
  }
  function apply() {
    window.__bhConsent = STATE;
    gtagConsentUpdate(STATE);
    if (STATE.analytics || STATE.marketing) {
      ensurePixels(function () {
        if (STATE.analytics) window.bhPixels.loadAnalytics();
        if (STATE.marketing) window.bhPixels.loadMarketing();
        else if (window.bhPixels.revokeMarketing) window.bhPixels.revokeMarketing();
      });
    } else if (window.bhPixels && window.bhPixels.revokeMarketing) {
      window.bhPixels.revokeMarketing();
    }
    // let the React tracking layer (tracking.js) gate CAPI / first-party on consent
    try { window.dispatchEvent(new CustomEvent('bh-consent', { detail: { analytics: STATE.analytics, marketing: STATE.marketing, mode: STATE.mode } })); } catch (e) {}
  }
  // tracking.js asks this before sending analytics (/api/track) or marketing (/api/capi)
  window.bhConsentAllows = function (cat) { return cat === 'marketing' ? !!STATE.marketing : !!STATE.analytics; };

  // ── decisions per mode ───────────────────────────────────────────────────────
  function decide(geo) {
    STATE.mode = geo.mode; STATE.country = geo.country; STATE.region = geo.region; STATE.california = !!geo.california;
    lsSet(K.mode, geo.mode);
    var gpc = (navigator.globalPrivacyControl === true);
    injectFooter(geo);

    var stored = readStored();

    if (geo.mode === 'strict_optin') {
      if (stored && (stored.status === 'accepted' || stored.status === 'partial')) {
        STATE.analytics = stored.analytics; STATE.marketing = stored.marketing; apply(); return;
      }
      apply(); // denied — nothing non-essential loads
      if (ssGet(K.refused) === 'true') return;       // refused this session → no banner
      setTimeout(showBanner, 4500);                   // banner after ~4.5 s
      return;
    }

    if (geo.mode === 'mini_notice') {
      if (stored) { STATE.analytics = stored.analytics; STATE.marketing = stored.marketing; apply(); return; }
      STATE.analytics = true; STATE.marketing = true; apply();    // tracking on by default
      if (ssGet(K.refused) !== 'true') setTimeout(showMini, 4500);
      return;
    }

    // footer_only / no_ui — tracking on by default
    if (stored) { STATE.analytics = stored.analytics; STATE.marketing = stored.marketing; apply(); return; }
    if ((geo.mode === 'footer_only' || geo.mode === 'no_ui') && (geo.california || gpc)) {
      // CCPA sale/share opt-out (GPC, or California) — analytics stays, marketing off, 12 mo
      STATE.analytics = true; STATE.marketing = false;
      writeStored('optout', { analytics: true, marketing: false }, TWELVE_MONTHS); apply(); return;
    }
    STATE.analytics = true; STATE.marketing = true; apply();
  }

  // ── analytics: measure cookie-banner efficacy (first-party, no PII) ────────────
  function track(ev, meta) { /* pas de mesure first-party sur le site client */ }

  // ── commits from UI ──────────────────────────────────────────────────────────
  function commitAccept() { track('cookie_accepted', { analytics: true, marketing: true }); writeStored('accepted', { analytics: true, marketing: true }, SIX_MONTHS); STATE.analytics = true; STATE.marketing = true; apply(); closeAll(); }
  function commitRefuseSession() { track('cookie_refused', {}); ssSet(K.refused, 'true'); STATE.analytics = false; STATE.marketing = false; apply(); closeAll(); }
  function commitSave(cats) {
    if (cats.analytics || cats.marketing) { track(cats.analytics && cats.marketing ? 'cookie_accepted' : 'cookie_partial', { analytics: !!cats.analytics, marketing: !!cats.marketing }); writeStored('partial', cats, SIX_MONTHS); STATE.analytics = cats.analytics; STATE.marketing = cats.marketing; apply(); }
    else { commitRefuseSession(); return; } // saved with everything off → treat as session refusal
    closeAll();
  }
  // footer_only / mini opt-out (from the preferences panel)
  function commitOptout(cats) {
    track('cookie_optout', { analytics: !!cats.analytics, marketing: !!cats.marketing });
    var ttl = (!cats.marketing && (STATE.california || navigator.globalPrivacyControl === true)) ? TWELVE_MONTHS : SIX_MONTHS;
    writeStored('optout', cats, ttl); STATE.analytics = cats.analytics; STATE.marketing = cats.marketing; apply(); closeAll();
  }

  // ════════════════════════════════ UI ════════════════════════════════════════
  var GOLD = 'var(--cc-accent,#C0892F)', INK = 'var(--cc-ink,#1E2A45)', SUB = 'var(--cc-sub,#5b5640)', styled = false, root = null, fabFooter = null;
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }
  function nl(s) { return esc(s).replace(/\n/g, '<br>'); }

  function injectStyle() {
    if (styled) return; styled = true;
    var css = [
      '#bhcc{position:fixed;z-index:2147483600;left:0;right:0;bottom:0;display:flex;justify-content:center;padding:0;pointer-events:none;font-family:inherit}',
      '#bhcc *{box-sizing:border-box}',
      '.bhcc-card{pointer-events:auto;width:100%;max-width:470px;margin:0 12px 12px;background:var(--cc-bg,#F8F0DC);color:' + INK + ';border:1px solid rgba(30,42,69,.14);border-radius:18px;box-shadow:0 24px 60px -22px rgba(30,42,69,.55),inset 0 1px 0 rgba(255,255,255,.5);padding:20px 20px 18px;position:relative;overflow:hidden;animation:bhccUp .4s cubic-bezier(.2,.7,.2,1)}',
      '@keyframes bhccUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}',
      '.bhcc-k{position:absolute;right:-14px;bottom:-30px;font-size:150px;line-height:1;color:rgba(30,42,69,.05);font-family:"Noto Serif JP",serif;pointer-events:none;user-select:none}',
      '.bhcc-lead{display:flex;gap:12px;align-items:center;position:relative;z-index:1}',
      '.bhcc-img{width:56px;height:56px;object-fit:contain;object-position:bottom;flex:0 0 auto;filter:drop-shadow(0 6px 10px rgba(30,42,69,.25))}',
      '.bhcc-title{font-family:inherit;font-weight:700;font-size:20px;line-height:1.15;margin:0}',
      '.bhcc-mid{position:relative;z-index:1;margin-top:11px}',
      '.bhcc-body{margin:0;font-size:14.5px;line-height:1.55;color:' + SUB + '}',
      '.bhcc-policy{display:inline-block;margin-top:8px;font-size:12.5px;color:' + SUB + ';text-decoration:underline;text-underline-offset:2px;cursor:pointer}',
      // base/mobile = 2-col grid (accept fills the right column over two rows); desktop bar overrides to a flex row
      '.bhcc-actions{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto auto;gap:10px;margin-top:14px}',
      '.bhcc-b{font-family:inherit;font-size:14.5px;font-weight:600;border-radius:12px;padding:12px 12px;cursor:pointer;border:1px solid rgba(30,42,69,.28);background:rgba(255,255,255,.55);color:' + INK + ';transition:transform .12s,filter .12s,background .12s;width:100%;line-height:1.2}',
      '.bhcc-b:hover{background:rgba(255,255,255,.8)}',
      '.bhcc-choose{grid-column:1;grid-row:1}',
      '.bhcc-reject{grid-column:1;grid-row:2}',
      '.bhcc-accept{grid-column:2;grid-row:1 / span 2;background:' + GOLD + ';border-color:rgba(120,80,20,.5);color:#fff;font-size:16px;font-weight:700;box-shadow:0 10px 22px -10px rgba(176,125,43,.85);display:flex;align-items:center;justify-content:center;text-align:center}',
      '.bhcc-accept:hover{filter:brightness(1.06)}',
      // prefs rows
      '.bhcc-row{position:relative;z-index:1;display:flex;align-items:flex-start;gap:11px;padding:12px 0;border-top:1px solid rgba(30,42,69,.1)}',
      '.bhcc-row:first-of-type{border-top:none}',
      '.bhcc-rtext{flex:1}.bhcc-rname{font-weight:600;font-size:15px;margin:0 0 2px}.bhcc-rdesc{font-size:12.8px;line-height:1.45;color:' + SUB + ';margin:0}',
      '.bhcc-always{font-size:12px;color:' + GOLD + ';font-weight:600;white-space:nowrap;padding-top:3px}',
      '.bhcc-sw{flex:0 0 auto;width:44px;height:26px;border-radius:99px;border:none;background:rgba(30,42,69,.22);position:relative;cursor:pointer;transition:background .18s;margin-top:1px}',
      '.bhcc-sw::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:left .18s;box-shadow:0 1px 3px rgba(0,0,0,.3)}',
      '.bhcc-sw[aria-checked="true"]{background:' + GOLD + '}.bhcc-sw[aria-checked="true"]::after{left:21px}',
      '.bhcc-grid2{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:8px}',
      '.bhcc-det{margin-top:10px;font-size:12.5px}.bhcc-det summary{cursor:pointer;color:' + SUB + ';list-style:none}.bhcc-det summary::-webkit-details-marker{display:none}.bhcc-det p{margin:6px 0 0;color:' + SUB + ';line-height:1.5}',
      // mini toast
      '.bhcc-mini{pointer-events:auto;width:100%;max-width:360px;background:var(--cc-bg,#F8F0DC);color:' + INK + ';border:1px solid rgba(30,42,69,.14);border-radius:14px;box-shadow:0 18px 44px -20px rgba(30,42,69,.5);padding:13px 14px;display:flex;align-items:center;gap:10px;animation:bhccUp .4s cubic-bezier(.2,.7,.2,1)}',
      '.bhcc-mini p{margin:0;font-size:13px;line-height:1.4;flex:1;color:' + SUB + '}',
      '.bhcc-mini b{display:block;color:' + INK + ';font-size:13.5px;margin-bottom:1px}',
      '.bhcc-mini button{font-family:inherit;font-size:13px;font-weight:600;border-radius:9px;padding:7px 11px;cursor:pointer;border:1px solid rgba(30,42,69,.25);background:rgba(255,255,255,.6);color:' + INK + '}',
      '.bhcc-mini .ok{background:' + GOLD + ';border-color:rgba(120,80,20,.5);color:#fff}',
      // injected footer
      // collapsed = a discreet pill button (never disrupts an experience like the Dojo); expands on click into a dark band with the links
      '.bhcc-legalfoot{font-family:inherit;text-align:center;padding:12px 16px calc(12px + env(safe-area-inset-bottom));font-size:12.5px;background:transparent;position:relative;z-index:5}',
      '.bhcc-legalfoot.open{padding:20px 16px calc(20px + env(safe-area-inset-bottom));background:#10131f;border-top:1px solid rgba(214,163,63,.22)}',
      '.bhcc-foottoggle{font-family:inherit;font-size:12px;letter-spacing:.02em;color:rgba(140,130,110,.95);background:rgba(127,127,127,.12);border:1px solid rgba(127,127,127,.26);border-radius:999px;padding:6px 15px;cursor:pointer}',
      '.bhcc-foottoggle:hover{color:#b08a46;border-color:rgba(176,138,70,.55)}',
      '.bhcc-legalfoot.open .bhcc-foottoggle{color:rgba(238,228,208,.7);background:transparent;border-color:rgba(238,228,208,.28);margin-bottom:13px}',
      '.bhcc-footrow{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px 4px;max-width:720px;margin:0 auto}',
      '.bhcc-footrow[hidden]{display:none}',
      '.bhcc-legalfoot a{color:rgba(238,228,208,.78);text-decoration:none;border-bottom:1px solid rgba(238,228,208,.22);padding:0 7px 1px;white-space:nowrap;cursor:pointer}',
      '.bhcc-legalfoot a:hover{color:#D7A33F;border-color:#D7A33F}',
      '@media(max-width:520px){.bhcc-card{max-width:none;margin:0;border-radius:18px 18px 0 0;padding:18px 16px calc(16px + env(safe-area-inset-bottom))}.bhcc-img{width:50px;height:50px}}',
      // DESKTOP: the banner (.bhcc-bar) becomes a full-width bottom bar; the prefs card (.bhcc-card without .bhcc-bar) stays a centred card
      '@media(min-width:521px){.bhcc-bar{max-width:none;margin:0;border:none;border-top:1px solid rgba(120,80,20,.26);border-radius:0;display:flex;align-items:center;gap:clamp(14px,2vw,28px);padding:13px clamp(20px,4vw,56px);box-shadow:0 -12px 44px -20px rgba(30,42,69,.5)}.bhcc-bar .bhcc-lead{flex:0 0 auto;max-width:300px}.bhcc-bar .bhcc-title{font-size:17.5px}.bhcc-bar .bhcc-mid{flex:1;min-width:160px;margin-top:0}.bhcc-bar .bhcc-body{font-size:13px;line-height:1.4}.bhcc-bar .bhcc-policy{margin-top:2px}.bhcc-bar .bhcc-actions{display:flex;flex-wrap:nowrap;gap:8px;align-items:center;justify-content:flex-end;margin-top:0;grid-template-columns:none;grid-template-rows:none;flex:0 0 auto}.bhcc-bar .bhcc-b{width:auto;white-space:nowrap;padding:10px 14px;font-size:13.5px}.bhcc-bar .bhcc-accept{grid-column:auto;grid-row:auto;font-size:14.5px}}'
    ].join('');
    var st = document.createElement('style'); st.id = 'bhcc-style'; st.textContent = css; document.head.appendChild(st);
  }

  function mountRoot() { injectStyle(); if (!root) { root = document.createElement('div'); root.id = 'bhcc'; document.body.appendChild(root); } return root; }
  function closeAll() { if (root) root.innerHTML = ''; }

  function bannerHTML() {
    return '<div class="bhcc-card bhcc-bar" role="dialog" aria-label="Cookies" aria-modal="false">' +
            '<div class="bhcc-lead"><h2 class="bhcc-title">' + esc(T.title) + '</h2></div>' +
      '<div class="bhcc-mid"><p class="bhcc-body">' + esc(T.body).replace(/\s*\n+\s*/g, ' ') + '</p><a class="bhcc-policy" data-act="cookies-link">' + esc(T.policy) + '</a></div>' +
      '<div class="bhcc-actions">' +
        '<button class="bhcc-b bhcc-choose" data-act="choose">' + esc(T.choose) + '</button>' +
        '<button class="bhcc-b bhcc-reject" data-act="refuse">' + esc(T.refuse) + '</button>' +
        '<button class="bhcc-b bhcc-accept" data-act="accept">' + esc(T.accept) + '</button>' +
      '</div>' +
    '</div>';
  }
  function prefsHTML(d) {
    function sw(cat, on) { return '<button class="bhcc-sw" role="switch" data-cat="' + cat + '" aria-checked="' + (on ? 'true' : 'false') + '" aria-label="' + esc(cat) + '"></button>'; }
    return '<div class="bhcc-card" role="dialog" aria-label="' + esc(T.prefsTitle) + '" aria-modal="false">' +
            '<h2 class="bhcc-title" style="position:relative;z-index:1">' + esc(T.prefsTitle) + '</h2>' +
      '<p class="bhcc-body" style="margin-top:6px">' + esc(T.changeMind) + '</p>' +
      '<div style="position:relative;z-index:1">' +
        '<div class="bhcc-row"><div class="bhcc-rtext"><p class="bhcc-rname">' + esc(T.essName) + '</p><p class="bhcc-rdesc">' + esc(T.essDesc) + '</p></div><span class="bhcc-always">' + esc(T.always) + '</span></div>' +
        '<div class="bhcc-row"><div class="bhcc-rtext"><p class="bhcc-rname">' + esc(T.anaName) + '</p><p class="bhcc-rdesc">' + esc(T.anaDesc) + '</p></div>' + sw('analytics', d.analytics) + '</div>' +
        '<div class="bhcc-row"><div class="bhcc-rtext"><p class="bhcc-rname">' + esc(T.mktName) + '</p><p class="bhcc-rdesc">' + esc(T.mktDesc) + '</p></div>' + sw('marketing', d.marketing) + '</div>' +
      '</div>' +
      '<details class="bhcc-det"><summary>' + esc(T.details) + '</summary><p><b>' + esc(T.anaName) + ' :</b> ' + esc(DETAILS.ana) + '<br><b>' + esc(T.mktName) + ' :</b> ' + esc(DETAILS.mkt) + '</p></details>' +
      '<div class="bhcc-grid2"><button class="bhcc-b" data-act="refuseAll">' + esc(T.refuseAll) + '</button><button class="bhcc-b" data-act="acceptAll">' + esc(T.acceptAll) + '</button></div>' +
      '<button class="bhcc-b bhcc-accept" style="grid-column:auto;margin-top:9px;height:auto;padding:12px" data-act="save">' + esc(T.save) + '</button>' +
    '</div>';
  }

  var draft = { analytics: false, marketing: false };
  // when prefs opened from a footer (footer_only/mini), default toggles to current ON state
  function openPrefs(fromFooter) {
    if (fromFooter) { draft = { analytics: STATE.analytics, marketing: STATE.marketing }; }
    else { var s = readStored(); draft = s ? { analytics: s.analytics, marketing: s.marketing } : { analytics: false, marketing: false }; }
    render(prefsHTML(draft), true);
  }
  function showBanner() { if (lsGet(K.status)) return; render(bannerHTML(), false); track('cookie_shown', { ui: 'banner' }); }

  function render(html, isPrefs) {
    mountRoot().innerHTML = html;
    root.querySelectorAll('[data-act]').forEach(function (b) {
      b.addEventListener('click', function () { onAct(b.getAttribute('data-act')); });
    });
    root.querySelectorAll('.bhcc-sw').forEach(function (s) {
      s.addEventListener('click', function () { var c = s.getAttribute('data-cat'); draft[c] = s.getAttribute('aria-checked') !== 'true'; s.setAttribute('aria-checked', draft[c] ? 'true' : 'false'); });
    });
  }
  function onAct(a) {
    if (a === 'accept' || a === 'acceptAll') { draft = { analytics: true, marketing: true }; if (a === 'acceptAll') { commitFromDraft(); } else commitAccept(); }
    else if (a === 'refuse') { isFooterMode() ? commitOptout({ analytics: false, marketing: false }) : commitRefuseSession(); }
    else if (a === 'refuseAll') { draft = { analytics: false, marketing: false }; commitFromDraft(); }
    else if (a === 'choose') openPrefs(false);
    else if (a === 'save') commitFromDraft();
    else if (a === 'cookies-link') { window.location.href = URLS.cookies; }
  }
  function isFooterMode() { return STATE.mode === 'footer_only' || STATE.mode === 'no_ui' || STATE.mode === 'mini_notice'; }
  function commitFromDraft() { isFooterMode() ? commitOptout({ analytics: !!draft.analytics, marketing: !!draft.marketing }) : commitSave({ analytics: !!draft.analytics, marketing: !!draft.marketing }); }

  // mini toast (SG)
  function showMini() {
    if (lsGet(K.status)) return;
    track('cookie_shown', { ui: 'mini' });
    mountRoot();
    root.innerHTML = '<div class="bhcc-mini" role="status"><p><b>🍪 Cookies</b>' + esc(T.miniBody) + '</p><button class="ok" data-mini="ok">' + esc(T.ok) + '</button><button data-mini="manage">' + esc(T.manage) + '</button></div>';
    var hideT = setTimeout(function () { closeAll(); }, 7000); // auto-hide 5–8 s
    root.querySelectorAll('[data-mini]').forEach(function (b) {
      b.addEventListener('click', function () {
        clearTimeout(hideT);
        if (b.getAttribute('data-mini') === 'ok') { writeStored('ack', { analytics: true, marketing: true }, SIX_MONTHS); closeAll(); } // 'ack' (not 'accepted') so a later strict_optin geo still prompts
        else openPrefs(true);
      });
    });
  }

  // Reserve scroll room BELOW the legal footer equal to the page's own sticky
  // bottom CTA, so the visitor can scroll the legal links up above the CTA bar
  // (the CTA stays; it just stops covering the links at the very bottom).
  function fitFooterClearance() {
    var sp = document.getElementById('bhcc-footspacer'); if (!sp) return;
    var bhcc = document.getElementById('bhcc'), foot = document.getElementById('bhcc-legalfoot');
    var pad = 0;
    try {
      var nodes = document.body.querySelectorAll('*');
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        if (el === sp || el === foot || el.id === 'bhcc') continue;
        if ((foot && foot.contains(el)) || (bhcc && bhcc.contains(el))) continue;
        var s = getComputedStyle(el);
        if ((s.position !== 'fixed' && s.position !== 'sticky') || s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) === 0) continue;
        var r = el.getBoundingClientRect();
        // a bottom-anchored bar: wide, not huge, sitting at the viewport bottom
        if (r.height > 24 && r.height < window.innerHeight * 0.5 && r.width > window.innerWidth * 0.5 && r.bottom >= window.innerHeight - 14) {
          pad = Math.max(pad, r.height);
        }
      }
    } catch (e) {}
    sp.style.height = pad ? 'calc(' + (pad + 18) + 'px + env(safe-area-inset-bottom))' : '0px';
  }

  // ── footer (per pack) ─────────────────────────────────────────────────────────
  // A page whose main content is a position:fixed full-screen "app" (e.g. the Dojo)
  // has no normal page scroll, so a body-level footer can only overlap it. Skip it
  // there — the page provides its own legal links in its scrollable content.
  function pageIsLocked() {
    try {
      var root = document.getElementById('root') || document.body, kids = root.children;
      for (var i = 0; i < kids.length; i++) {
        var s = getComputedStyle(kids[i]);
        if (s.position === 'fixed') {
          var r = kids[i].getBoundingClientRect();
          if (r.width >= window.innerWidth * 0.9 && r.height >= window.innerHeight * 0.82) return true;
        }
      }
    } catch (e) {}
    return false;
  }
  function injectFooter(geo) {
    // Poll (setTimeout, reliable) until the page's own app (React) has committed its
    // DOM, so a fixed full-screen experience (the Dojo) is detectable and we skip it
    // — without ever touching a normal scrolling page.
    var tries = 0;
    function go() {
      if (document.getElementById('bhcc-legalfoot')) return;
      var root = document.getElementById('root');
      if (root && root.children.length === 0 && tries < 30) { tries++; setTimeout(go, 60); return; }
      if (pageIsLocked()) return;       // locked full-screen app (Dojo) → no body footer
      buildFooterDom(geo);
    }
    setTimeout(go, 0);
  }
  function buildFooterDom(geo) {
    if (document.getElementById('bhcc-legalfoot')) return;
    injectStyle();
    var F = T.foot, showDNS = (geo.mode === 'footer_only' && (geo.california || geo.country === 'US'));
    var links = [];
    function a(label, href, act) { links.push('<a href="' + (href || 'javascript:void(0)') + '"' + (act ? ' data-foot="' + act + '"' : '') + '>' + esc(label) + '</a>'); }
    if (geo.mode === 'strict_optin') {
      a(F.legal, URLS.legal); a(F.terms, URLS.terms); a(F.returns, URLS.returns); a(F.privacy, URLS.privacy); a(F.cookies, URLS.cookies); a(F.manageC, null, 'manage'); a(F.contact, CONTACT);
    } else if (geo.mode === 'mini_notice') {
      a(F.privacy, URLS.privacy); a(F.cookies, URLS.cookies); a(F.choices, URLS.choices); a(F.manageC, null, 'manage'); a(F.terms, URLS.terms); a(F.contact, CONTACT);
    } else if (geo.mode === 'footer_only') {
      a(F.privacy, URLS.privacy); a(F.cookies, URLS.cookies); a(F.choices, URLS.choices); a(F.manageC, null, 'manage'); if (showDNS) a(F.dns, null, 'manage'); a(F.contact, CONTACT);
    } else { // no_ui — tracking active, so include cookie + choices too
      a(F.privacy, URLS.privacy); a(F.terms, URLS.terms); a(F.cookies, URLS.cookies); a(F.manageC, null, 'manage'); a(F.contact, CONTACT);
    }
    var f = document.createElement('footer');
    f.id = 'bhcc-legalfoot'; f.className = 'bhcc-legalfoot';
    f.innerHTML = '<button type="button" class="bhcc-foottoggle" aria-expanded="false">' + esc(F.toggle) + '</button>' +
      '<div class="bhcc-footrow" hidden>' + links.join('') + '</div>';
    document.body.appendChild(f);
    var ftoggle = f.querySelector('.bhcc-foottoggle'), frow = f.querySelector('.bhcc-footrow');
    ftoggle.addEventListener('click', function () {
      var willOpen = frow.hasAttribute('hidden');
      if (willOpen) frow.removeAttribute('hidden'); else frow.setAttribute('hidden', '');
      ftoggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      f.classList.toggle('open', willOpen);
      fitFooterClearance();
    });
    f.querySelectorAll('[data-foot="manage"]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); openPrefs(true); });
    });
    // clearance spacer so the page's sticky CTA never hides the legal links
    var spacer = document.createElement('div'); spacer.id = 'bhcc-footspacer'; document.body.appendChild(spacer);
    fitFooterClearance();
    setTimeout(fitFooterClearance, 1000); setTimeout(fitFooterClearance, 2800);
    // resize only — NO scroll listener (it janked page animations, e.g. the Dojo)
    try { var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(fitFooterClearance, 200); }); } catch (e) {}
  }

  // public hook (legal pages "Manage cookies" button)
  window.bhOpenCookiePreferences = function () { openPrefs(true); };

  // ── boot: decide from geo (or test override) ──────────────────────────────────
  // Test hooks (?bhmode=) work ONLY off production, so a crafted link can't push a
  // real EU visitor into a no-banner / tracking-on mode. Owner tests on previews.
  var allowOverride = false;
  try { var hn = location.hostname; allowOverride = (hn === 'localhost' || hn === '127.0.0.1'); } catch (e) {}
  var forced = '';
  if (allowOverride) { try { forced = (new URLSearchParams(location.search).get('bhmode') || '').toLowerCase(); } catch (e) {} }
  if (forced === 'reset') { lsDel(K.status); lsDel(K.cats); lsDel(K.exp); ssSet(K.refused, ''); try { sessionStorage.removeItem(K.refused); } catch (e) {} }
  // Prod-safe reset: ?cookiereset=1 clears ONLY the visitor's own stored choice
  // (no mode override → safe on production) so the banner can re-appear.
  try { if (new URLSearchParams(location.search).get('cookiereset') === '1') { lsDel(K.status); lsDel(K.cats); lsDel(K.exp); try { sessionStorage.removeItem(K.refused); } catch (e) {} } } catch (e) {}

  var FORCE = { fr: { country: 'FR', mode: 'strict_optin' }, gb: { country: 'GB', mode: 'strict_optin' }, ch: { country: 'CH', mode: 'strict_optin' }, sg: { country: 'SG', mode: 'mini_notice' }, us: { country: 'US', mode: 'footer_only' }, cali: { country: 'US', region: 'CA', mode: 'footer_only', california: true }, my: { country: 'MY', mode: 'footer_only' }, row: { country: 'JP', mode: 'no_ui' } };
  if (FORCE[forced]) { decide(FORCE[forced]); return; }

  fetch('/api/geo', { credentials: 'omit' })
    .then(function (r) { return r.json(); })
    .catch(function () { return { country: null, mode: 'strict_optin' }; }) // fail safe
    .then(function (geo) { decide(geo || { mode: 'strict_optin' }); });
})();
