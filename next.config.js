const withLess = require('@zeit/next-less');

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
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
      use: 'raw-loader'
    });
    if (!isServer) {
      config.node = {
        fs: 'empty'
      };
    }
    return config;
  }
});
