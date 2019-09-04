const withLess = require('@zeit/next-less');

module.exports = withLess({
  lessLoaderOptions: {
    globalVars: {
      coreModulePath: '"~"',
      nodeModulesPath: '"~"'
    }
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    });
    return config;
  }
});
