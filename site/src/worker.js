// Site Express — Worker avec fichiers statiques (chemin principal, déployé avec `npx wrangler deploy`).
// Les pages viennent de public/ (binding ASSETS). Le Worker ne répond lui-même qu'aux routes /api/* :
// - /api/geo   : le pays du visiteur et le MODE de consentement que consent.js applique
//                (mêmes règles que l'api/geo.js du coach, lues sur request.cf). Aucune IP stockée.
// - /api/lead  : (mode LEAD) enregistre la demande dans le KV « LEADS » s'il existe, sinon 501
//                (la page bascule alors sur un email pré-rempli).
// - /api/track : 204 (pas de mesure first-party sur le site client).

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
  const region = String(cf.regionCode || "").toUpperCase();
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
  const reponse = String(data.reponse || "").slice(0, 10); // "oui", "non" ou "intake"
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
  await env.LEADS.put(`lead:${at}:${crypto.randomUUID().slice(0, 8)}`, JSON.stringify(record));
  return new Response(null, { status: 204 });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/geo") return geo(request);
    if (pathname === "/api/lead") return lead(request, env);
    if (pathname === "/api/track") return new Response(null, { status: 204 });
    return env.ASSETS.fetch(request);
  },
};
