import fs from "fs";

const path = "/root/metan-site/send-email-audit.txt";
const lines = fs.readFileSync(path, "utf8").split("\n");

const vars = ["data", "t", "s", "template", "subject", "htmlContent"];
const found = [];

lines.forEach((line, i) => {
  vars.forEach((v) => {
    const regex = new RegExp(`\\b${v}\\b`, "g");
    if (regex.test(line)) {
      found.push({ line: i + 1, var: v, text: line.trim() });
    }
  });
});

console.log("=== 🔎 VARIABLE USAGE MAP ===");
for (const v of vars) {
  console.log(`\n# ${v}`);
  found
    .filter((f) => f.var === v)
    .forEach((f) => console.log(`${f.line.toString().padStart(4)} | ${f.text}`));
}

// Check duplicate declarations
console.log("\n=== ⚠️ DUPLICATE DECLARATIONS ===");
const declRegex = /\b(const|let|var)\s+([a-zA-Z0-9_]+)/g;
const decls = {};
lines.forEach((line, i) => {
  let match;
  while ((match = declRegex.exec(line))) {
    const name = match[2];
    if (!decls[name]) decls[name] = [];
    decls[name].push(i + 1);
  }
});
Object.entries(decls)
  .filter(([k, v]) => v.length > 1)
  .forEach(([k, v]) => console.log(`${k}: declared at ${v.join(", ")}`));

// Check unbalanced braces
console.log("\n=== ⚙️ BRACE BALANCE CHECK ===");
let open = 0;
lines.forEach((line, i) => {
  for (const c of line) {
    if (c === "{") open++;
    if (c === "}") open--;
  }
  if (open < 0) {
    console.log(`Line ${i + 1}: extra closing brace`);
    open = 0;
  }
});
if (open > 0) console.log(`Unclosed braces: ${open}`);
else console.log("Braces look balanced ✅");

