// Crea feed.xml (RSS) y sitemap.xml a partir de capitulos.js.
// Uso: abre una terminal en esta carpeta y escribe:  node generar.js
// Hazlo cada vez que publiques un capítulo y sube los dos archivos nuevos.
const fs = require("fs");
const path = require("path");

const SITE   = "https://yibiart.github.io/deadlyswamped";   // <- tu dirección, sin barra al final
const TITULO = "DEADLY SWAMPED";
const DESC   = "Deadly Swamped: a webtoon set in the world of Nyris. New chapters every two weeks.";

const caps = new Function(fs.readFileSync(path.join(__dirname, "capitulos.js"), "utf8") + "\nreturn capitulos;")();
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const url = c => /^https?:/.test(c.enlace) ? c.enlace : SITE + "/" + c.enlace;
const fecha = c => new Date(c.fecha + "T12:00:00Z");

const pub = caps.filter(c => !c.proximo && c.fecha).sort((a, b) => fecha(b) - fecha(a));
const ultima = pub.length ? pub[0].fecha : new Date().toISOString().slice(0, 10);

const items = pub.map(c => `    <item>
      <title>${esc(c.titulo + (c.nombre ? ": " + c.nombre : ""))}</title>
      <link>${esc(url(c))}</link>
      <guid isPermaLink="true">${esc(url(c))}</guid>
      <pubDate>${fecha(c).toUTCString()}</pubDate>${c.sinopsis ? `
      <description>${esc(c.sinopsis)}</description>` : ""}
    </item>`).join("\n");

fs.writeFileSync(path.join(__dirname, "feed.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(TITULO)}</title>
    <link>${SITE}/</link>
    <description>${esc(DESC)}</description>
    <language>en</language>
    <lastBuildDate>${new Date(ultima + "T12:00:00Z").toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`);

const urls = [`  <url>\n    <loc>${SITE}/</loc>\n    <lastmod>${ultima}</lastmod>\n  </url>`]
  .concat(pub.map(c => `  <url>\n    <loc>${esc(url(c))}</loc>\n    <lastmod>${c.fecha}</lastmod>\n  </url>`));
fs.writeFileSync(path.join(__dirname, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`);

console.log(`Listo: ${pub.length} capítulos publicados en feed.xml y sitemap.xml (${SITE})`);
