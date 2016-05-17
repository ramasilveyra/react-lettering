const babel = require('rollup-plugin-babel')
const fs = require('fs')
const path = require('path')

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json')))

export default {
  entry: 'src/index.js',
  format: 'umd',
  plugins: [babel({
    exclude: 'node_modules/**',
  })],
  dest: 'dist/react-lettering.js',
  moduleName: 'Lettering',
  sourceMap: 'inline',
  banner: `/*! ${pkg.name} v${pkg.version} | (c) ${pkg.author} | ${pkg.license} license */`,
}
