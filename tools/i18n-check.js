#!/usr/bin/env node
/* i18n key audit for the Remi site.
 * Checks that every data-i18n* key used in the HTML exists in BOTH the English
 * and Chinese dictionaries in i18n.js. Run from the site root:
 *   node tools/i18n-check.js .
 * Exits non-zero if any key is missing or not present exactly once per language.
 */
const fs = require("fs");
const dir = process.argv[2] || ".";
const pages = ["index.html", "support.html", "privacy.html"];
const html = pages.map((f) => fs.readFileSync(dir + "/" + f, "utf8")).join("\n");
const js = fs.readFileSync(dir + "/i18n.js", "utf8");

const used = new Set();
let m;
const re = /data-i18n(?:-html)?="([^"]+)"/g;
while ((m = re.exec(html))) used.add(m[1]);
const reAttr = /data-i18n-attr="([^"]+)"/g;
while ((m = reAttr.exec(html))) {
  m[1].split(",").forEach((pair) => {
    const idx = pair.indexOf(":");
    if (idx !== -1) used.add(pair.slice(idx + 1).trim());
  });
}

const problems = [];
used.forEach((k) => {
  const rx = new RegExp('"' + k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + '"\\s*:', "g");
  const count = (js.match(rx) || []).length;
  if (count !== 2) problems.push(k + " -> found " + count + " (expected 2: en+zh)");
});

console.log("HTML pages scanned:", pages.length);
console.log("Distinct i18n keys used:", used.size);
console.log(
  problems.length
    ? "PROBLEMS:\n" + problems.join("\n")
    : "OK: every used key is present in both en and zh."
);
process.exit(problems.length ? 1 : 0);
