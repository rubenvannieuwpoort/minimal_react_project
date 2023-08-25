const fs = require("fs");
const esbuild = require("esbuild");

fs.rmSync("dist/", { recursive: true, force: true });
fs.mkdirSync("dist/");
fs.mkdirSync("dist/bundle");

fs.copyFile("www/index.html", "dist/index.html", (err) => {
    if (err) throw err;
});

fs.copyFile("./www/style.css", "./dist/style.css", (err) => {
    if (err) throw err;
});

esbuild.build({
    entryPoints: ["src/script.jsx"],
    mainFields: ["svelte", "browser", "module", "main"],
    conditions: ["svelte", "browser"],
    outdir: "dist/bundle",
    format: "esm",
    logLevel: "info",
    minify: true,
    bundle: true,
    splitting: true,
    sourcemap: "inline",
});
