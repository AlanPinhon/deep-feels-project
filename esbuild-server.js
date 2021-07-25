require('dotenv').config();
const { build } 	= require("esbuild");
const chokidar 		= require("chokidar");
const liveServer 	= require("live-server");
const scssPlugin 	= require('esbuild-plugin-sass');

(async () => {
	const builder = await build({
		// Bundles JavaScript.
		bundle: true,
		// Bundles JavaScript from (see `outfile`).
		entryPoints: ["src/app.js"],
		// Uses incremental compilation (see `chokidar.on`).
		incremental: true,
		// Removes whitespace, etc. depending on `NODE_ENV=...`.
		minify: process.env.NODE_ENV === "production",
		// Bundles JavaScript to (see `entryPoints`).
		outfile: "public/bundle.js",
		// Adding SCSS pluging compiler
		plugins: [scssPlugin()]
	});

	// `chokidar` watcher source changes.
	chokidar
		// Watches your index.html, .scss and .js files changes.
		.watch(["src/**/*.js", "src/**/*.scss", "public/index.html"], {
			interval: 0, // No delay
		})
		// Rebuilds esbuild (incrementally -- see `build.incremental`).
		.on("all", () => {
			builder.rebuild();
		});
	// `liveServer` local server for hot reload.
	liveServer.start({
		// Opens the local server on start.
		open: true,
		// Uses `PORT=...` or 1006 as a fallback.
		port: Number(process.env.PORT) || 9000,
		// Uses `public` as the local server folder.
		root: "public",
	});
})();