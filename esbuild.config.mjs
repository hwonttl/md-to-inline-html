import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";
import { copyFileSync, mkdirSync } from "fs";
import { join } from "path";

const banner =
`/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

const pluginName = "md-to-inline-html";
const pluginDest = "C:\\Users\\dhjang\\OneDrive\\Obsidian\\cnthoth\\.obsidian\\plugins\\" + pluginName;

const prod = (process.argv[2] === "production");

function copyToObsidian() {
	console.log("📦 Copying files to Obsidian plugin folder...");
	mkdirSync(pluginDest, { recursive: true });
	copyFileSync("manifest.json", join(pluginDest, "manifest.json"));
	copyFileSync("main.js", join(pluginDest, "main.js"));
	console.log("✅ Copy complete!");
}

const context = await esbuild.context({
	banner: {
		js: banner,
	},
	entryPoints: ["main.ts"],
	bundle: true,
	external: [
		"obsidian",
		"electron",
		"@codemirror/autocomplete",
		"@codemirror/collab",
		"@codemirror/commands",
		"@codemirror/language",
		"@codemirror/lint",
		"@codemirror/search",
		"@codemirror/state",
		"@codemirror/view",
		"@lezer/common",
		"@lezer/highlight",
		"@lezer/lr",
		...builtins],
	format: "cjs",
	target: "es2018",
	logLevel: "info",
	sourcemap: prod ? false : "inline",
	treeShaking: true,
	outfile: "main.js",
	minify: prod,
});

if (prod) {
	await context.rebuild();
	copyToObsidian();
	process.exit(0);
} else {
	await context.watch();
	copyToObsidian();  // ✅ 최초 실행 시 한 번 복사
	context.onEnd(() => {
		copyToObsidian(); // ✅ 매 watch 이후 복사
	});
}
