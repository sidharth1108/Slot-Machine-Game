const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");
require("dotenv").config();

const functionsDir = `src`;
const outDir = `dist/`;
// const entryPoints = fs
//   .readdirSync(path.join(__dirname, functionsDir))
//   .map((entry) => `${functionsDir}/${entry}/creditscore.ts`)

const entryPoints = [
	"src/slotmachine.ts",
];

esbuild.build({
	entryPoints,
	bundle: true,
	outdir: path.join(__dirname, outDir),
	outbase: functionsDir,
	platform: "browser",
	//   sourcemap: 'external',
	sourcemap: "inline",
	keepNames: true,
	loader: { ".node": "file" },
	// minify : true
});
