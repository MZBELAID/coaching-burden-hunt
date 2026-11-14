"""Site Express — fabrique worker.js à partir du dossier du site.

Usage :  python build_worker.py <dossier_du_site> <worker_modele.js> <worker_final.js>

Chaque fichier du dossier devient une route :
  index.html            -> /
  merci.html            -> /merci
  mentions-legales.html -> /mentions-legales   (idem pour les autres pages)
  consent.js            -> /consent.js
  images (png, jpg, webp, svg) -> /nom.ext (embarquées en base64 si binaires)

Le script refuse de continuer s'il reste un {{...}} non rempli dans un fichier texte.
"""
import base64
import json
import pathlib
import re
import sys

TYPES = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".txt": "text/plain; charset=utf-8",
}
TEXT = {".html", ".js", ".css", ".svg", ".txt"}


def main(site_dir, template, out):
    site = pathlib.Path(site_dir)
    files, leftovers = {}, []
    for f in sorted(site.rglob("*")):
        if not f.is_file():
            continue
        ext = f.suffix.lower()
        if ext not in TYPES:
            continue
        rel = "/" + f.relative_to(site).as_posix()
        route = rel
        if ext == ".html":
            route = rel[:-5]
            if route == "/index":
                route = "/"
        if ext in TEXT:
            body = f.read_text(encoding="utf-8")
            for m in re.findall(r"\{\{[A-Z0-9_]+\}\}", body):
                leftovers.append(f"{rel}: {m}")
            files[route] = {"type": TYPES[ext], "body": body}
        else:
            # binaire : servi via data décodée côté Worker
            files[route] = {"type": TYPES[ext], "b64": base64.b64encode(f.read_bytes()).decode()}
    if leftovers:
        print("Il reste des champs à remplir :")
        print("\n".join(sorted(set(leftovers))))
        sys.exit(1)
    worker = pathlib.Path(template).read_text(encoding="utf-8")
    if "__FILES__" not in worker:
        sys.exit("Le modèle de Worker ne contient pas __FILES__")
    payload = json.dumps(files, ensure_ascii=False)
    # Les fichiers binaires sont décodés une fois au démarrage du Worker.
    decoder = (
        "\nfor (const k in FILES) { const f = FILES[k]; if (f.b64) { "
        "const bin = atob(f.b64); const a = new Uint8Array(bin.length); "
        "for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); f.body = a; delete f.b64; } }\n"
    )
    worker = worker.replace("const FILES = __FILES__;", "const FILES = " + payload + ";" + decoder, 1)
    pathlib.Path(out).write_text(worker, encoding="utf-8")
    size = len(worker.encode("utf-8"))
    print(f"OK : {len(files)} routes, {size / 1024:.0f} Ko -> {out}")
    if size > 900 * 1024:
        print("Attention : Worker lourd. Réduis les images (le plan gratuit limite la taille du script).")


if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    main(*sys.argv[1:])
