// Copies the compiled Tailwind/global CSS produced by `next build` into
// public/admin/site.css so the Decap CMS preview iframe (which is loaded
// via a static <script> tag, outside the Next.js build pipeline) can use
// the site's real styles instead of a hand-maintained approximation.
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const cssDir = join(process.cwd(), ".next", "static", "chunks");
const outFile = join(process.cwd(), "public", "admin", "site.css");

const cssFiles = readdirSync(cssDir).filter((f) => f.endsWith(".css"));

if (cssFiles.length === 0) {
  console.warn(
    "[copy-admin-css] No compiled CSS found in .next/static/chunks — skipping.",
  );
  process.exit(0);
}

const combined = cssFiles
  .map((f) => readFileSync(join(cssDir, f), "utf-8"))
  .join("\n");

writeFileSync(outFile, combined);
console.log(
  `[copy-admin-css] Wrote ${cssFiles.length} CSS chunk(s) (${combined.length} bytes) to public/admin/site.css`,
);
