const withLess = require("@zeit/next-less");
const path = require("path");

if (typeof require !== "undefined") {
  require.extensions[".less"] = () => {};
}

module.exports = withLess({
  lessLoaderOptions: {
    url: false,
    modifyVars: {
      coreModulePath: '"~"',
      nodeModulesPath: '"~"'
    }
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: "svg-sprite-loader"
    });
    if (!isServer) {
      config.node = {
        fs: "empty"
      };
    }
    return config;
  }
});
