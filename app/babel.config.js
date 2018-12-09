module.exports = {
  "presets": ["@babel/react", ["@babel/env", { "modules": false }]],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-modules-commonjs"
  ]
}
