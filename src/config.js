export default {
  source: ["./tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "custom/css",
      buildPath: "./build/css/",
      files: [
        {
          destination: "_variables.css",
          format: "css/variables"
        }
      ]
    },
    scss: {
      transformGroup: "custom/scss",
      buildPath: "./build/scss/",
      files: [{
        destination: "_variables.scss",
        format: "scss/variables"
      }]
    },
    js: {
      transformGroup: "custom/js",
      buildPath: "./build/js/",
      files: [{
        destination: "tokens.js",
        format: "javascript/es6"
      }]
    },
    ts: {
      transformGroup: "custom/js",
      buildPath: "./build/js/",
      files: [{
        destination: "tokens.d.ts",
        format: "typescript/es6-declarations"
      }]
    }
  }
}
