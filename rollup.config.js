import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'src/techan.js',
  output: [
    {
      file: 'dist/techan.js',
      format: 'umd',
      name: 'techanjs',
      globals: {
        d3: 'd3'
      },
      sourcemap: true
    },
    {
      file: 'dist/techan.mjs',
      format: 'es',
      sourcemap: true
    }
  ],
  external: ['d3'],
  plugins: [
    resolve(),
    commonjs(),
    json()
  ]
};
