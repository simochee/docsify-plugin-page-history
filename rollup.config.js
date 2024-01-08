import { defineConfig } from "rollup";

export default defineConfig({
  input: "src/index.js",
  output: {
    file: process.env.npm_package_main,
    format: "umd",
  },
});
