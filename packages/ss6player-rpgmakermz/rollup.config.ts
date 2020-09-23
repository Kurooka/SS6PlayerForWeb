import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash.camelcase';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import license from 'rollup-plugin-license';
import replace from 'rollup-plugin-replace'

const pkg = require('./package.json');

const libraryName = 'ss6player-rpgmakermz';

export default {
  input: `src/${libraryName}.js`,
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: 'iife', sourcemap: false },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [
    'pixi.js'
  ],
  watch: {
    include: 'src/**'
  },
  context: "this",
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    // Resolve source maps to the original source
    sourceMaps(),
    replace({
      __VERSION__: pkg.version
    }),
    license({
      banner: `-----------------------------------------------------------
 SS6Player For RPG Maker MZ v<%= pkg.version %>
 Copyright(C) <%= pkg.author.name %>
 <%= pkg.author.url %>
-----------------------------------------------------------
`
    })
  ]
};
