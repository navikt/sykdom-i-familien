const withLess = require("@zeit/next-less");

if (typeof require !== "undefined") {
  require.extensions[".less"] = () => {};
}

module.exports = withLess({
  lessLoaderOptions: {
    modifyVars: {
      coreModulePath: '"~"',
      nodeModulesPath: '"~"'
    }
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });
    return config;
  }
});
