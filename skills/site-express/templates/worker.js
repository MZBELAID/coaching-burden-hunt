// Site Express — un Worker Cloudflare qui sert tout le site du client.
// ─────────────────────────────────────────────────────────────────────────────
// - Les pages et les fichiers sont embarqués dans FILES (rempli par build_worker.py,
//   ou à la main : { "/chemin": { type: "text/html; charset=utf-8", body: "..." } }).
// - /api/geo  : le pays du visiteur et le MODE de consentement que consent.js applique.
//              Même règles que l'api/geo.js du coach, mais lues sur request.cf (Cloudflare)
//              au lieu des en-têtes Vercel. Aucune IP n'est stockée.
// - /api/lead : (mode LEAD seulement) enregistre email + téléphone dans le KV « LEADS »
//              si ce binding existe. Sans KV, répond 501 et la page bascule sur l'email.
// - /api/track : répond 204 (le site client ne fait pas de mesure first-party).
//
//   strict_optin  → UE/EEE + UK + CH + BR, TH, KR, IN   (bandeau, rien ne charge avant)
//   mini_notice   → SG                                   (suivi actif, petit message)
//   footer_only   → US, CA, AU, NZ, MY, MX, HK           (suivi actif, liens en pied + CCPA)
//   no_ui         → partout ailleurs                     (suivi actif, pied de page)

const FILES = __FILES__;

const STRICT = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE",        // UE 27
  "IS", "LI", "NO",        // EEE
  "GB",                    // Royaume-Uni
  "CH",                    // Suisse
  "BR", "TH", "KR", "IN",  // opt-in marketing strict
]);
const MINI = new Set(["SG"]);
const FOOTER = new Set(["US", "CA", "AU", "NZ", "MY", "MX", "HK"]);

function geo(request) {
  const cf = request.cf || {};
  const country = String(cf.country || "").toUpperCase();
  const region = String(cf.regionCode || "").toUpperCase(); // état US, ex. "CA"
  let mode;
  if (!country || country === "XX" || country === "T1") mode = "strict_optin"; // inconnu → prudence
  else if (STRICT.has(country)) mode = "strict_optin";
  else if (MINI.has(country)) mode = "mini_notice";
  else if (FOOTER.has(country)) mode = "footer_only";
  else mode = "no_ui";
  const california = country === "US" && region === "CA";
  return Response.json(
    { country: country || null, region: region || null, mode, california },
    { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
  );
}

async function lead(request, env) {
  if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
  if (!env.LEADS) return new Response("No storage", { status: 501 });
  let data;
  try { data = await request.json(); } catch (e) { return new Response("Bad Request", { status: 400 }); }
  const email = String(data.email || "").trim().slice(0, 200);
  const tel = String(data.tel || "").replace(/[^\d+]/g, "").slice(0, 20);
  const reponse = String(data.reponse || "").slice(0, 10); // "oui", "non" ou "intake" (formulaire après paiement)
  const telOk = reponse === "intake" || tel.replace(/\D/g, "").length >= 9;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || !telOk) {
    return new Response("Bad Request", { status: 400 });
  }
  const at = new Date().toISOString();
  const record = {
    at, email, tel, reponse,
    page: String(data.page || "").slice(0, 200),
    utm: String(data.utm || "").slice(0, 500),
    details: data.details && typeof data.details === "object" ? JSON.stringify(data.details).slice(0, 5000) : null,
    pays: (request.cf && request.cf.country) || null,
  };
  // Clé triable par date : lead:2026-11-14T10:00:00.000Z:abcd
  await env.LEADS.put(`lead:${at}:${crypto.randomUUID().slice(0, 8)}`, JSON.stringify(record));
  return new Response(null, { status: 204 });
}

function servePath(pathname) {
  let p = pathname.replace(/\/+$/, "") || "/";
  if (p.endsWith(".html")) p = p.slice(0, -5) || "/";
  if (p === "/index") p = "/";
  return FILES[p] || null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/geo") return geo(request);
    if (url.pathname === "/api/lead") return lead(request, env);
    if (url.pathname === "/api/track") return new Response(null, { status: 204 });

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    const file = servePath(url.pathname);
    if (!file) {
      const notFound = FILES["/404"];
      return new Response(notFound ? notFound.body : "Page introuvable", {
        status: 404,
        headers: { "Content-Type": notFound ? notFound.type : "text/plain; charset=utf-8" },
      });
    }
    const isHtml = file.type.startsWith("text/html");
    return new Response(request.method === "HEAD" ? null : file.body, {
      headers: {
        "Content-Type": file.type,
        "Cache-Control": isHtml ? "no-cache" : "public, max-age=3600",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    });
  },
};
