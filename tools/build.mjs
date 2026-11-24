/* Build script: renders every page from the MVC sources into static HTML.
   Usage: node tools/build.mjs .   (writes the site into the given folder)
   models/content.js  → data      views/render.js + views/pages.mjs → markup

   Output layout (paths come from PAGES / ADMIN in app/views/pages.mjs):
     index.html          English home (entry point)
     en/*.html           English sub-pages
     tr/*.html           Turkish pages
     admin/index.html    CMS panel */
import fs from "node:fs";
import path from "node:path";
import { PAGES, BUILD, admin, ADMIN } from "../app/views/pages.mjs";

const OUT = process.argv[2];
if (!OUT) { console.error("Usage: node tools/build.mjs <output-folder>"); process.exit(1); }

const write = (rel, html) => {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html, "utf8");
  console.log("wrote", rel);
};

for (const p of PAGES) for (const L of ["tr", "en"]) write(p[L][0], BUILD[p.key](L));
write(ADMIN, admin());
