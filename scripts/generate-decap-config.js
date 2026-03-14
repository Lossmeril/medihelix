const fs = require("fs");
const path = require("path");

const required = ["DECAP_SITE_ID"];
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`Missing required env vars: ${missing.join(", ")}`);
  process.exit(1);
}

const template = fs.readFileSync(
  path.join(__dirname, "../public/admin/config.template.yml"),
  "utf8"
);

const output = template.replace(/\$\{(\w+)\}/g, (_, key) => {
  return process.env[key] ?? "";
});

fs.writeFileSync(
  path.join(__dirname, "../public/admin/config.yml"),
  output,
  "utf8"
);

console.log("Generated public/admin/config.yml");
