import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";


export default defineConfig({
  input: "src/index.js",
  output: {
    file: process.env.npm_package_main,
    format: "umd",
  },
  plugins: [nodeResolve(), commonjs()],
});