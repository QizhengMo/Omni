import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import makeManifest from "./utils/plugins/make-manifest";
import buildContentScript from "./utils/plugins/build-content-script";
import { outputFolderName } from "./utils/constants";

const root = resolve(__dirname, "src");
const pagesDir = resolve(root, "pages");
const assetsDir = resolve(root, "assets");
const outDir = resolve(__dirname, outputFolderName);
const publicDir = resolve(__dirname, "public");
export default defineConfig((config) => {
  return {
    base: config.mode === 'gh' ? 'Omni' : undefined,
    resolve: {
      alias: {
        "@src": root,
        "@assets": assetsDir,
        "@pages": pagesDir,
      },
    },
    plugins: [react(), makeManifest(), buildContentScript()],
    publicDir,
    build: {
      outDir,
      sourcemap: process.env.__DEV__ === "true",
      emptyOutDir: false,
      rollupOptions: {
        input: {
          devtools: resolve(pagesDir, "devtools", "index.html"),
          panel: resolve(pagesDir, "panel", "index.html"),
          background: resolve(pagesDir, "background", "index.ts"),
          popup: resolve(pagesDir, "popup", "index.html"),
          newtab: resolve(pagesDir, "newtab", "index.html"),
          options: resolve(pagesDir, "options", "index.html"),
          webRoot: resolve(__dirname, "index.html"),
        },
        output: {
          entryFileNames: (chunk) => {
            return chunk.name === "webRoot"
              ? "index.js"
              : `src/pages/${chunk.name}/index.js`;
          },
        },
      },
    },
  };
});
