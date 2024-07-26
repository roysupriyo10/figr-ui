import resolve from "@rollup/plugin-node-resolve";
import tailwindcss from 'tailwindcss';
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import tailwindConfig from './tailwind.config.mjs';
import PeerDepsExternalPlugin from "rollup-plugin-peer-deps-external";
import autoprefixer from "autoprefixer";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/cjs/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/esm/index.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      PeerDepsExternalPlugin(),
      alias({
        entries: [
          {
            find: "@/",
            replacement: "./src/",
          },
        ],
      }),
      resolve({
        extensions: ['.css']
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist"
      }),
      postcss({
        config: {
          path: "./postcss.config.js"
        },
        to: "dist/index.css",
        extensions: ['.css'],
        inject: true,
        extract: true,
        plugins: [
          autoprefixer(),
          tailwindcss(tailwindConfig)
        ]
      }),
      terser(),
    ],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/]
  },
];
