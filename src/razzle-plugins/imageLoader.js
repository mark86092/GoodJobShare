module.exports = {
  object: {
    modifyWebpackConfig: ({ webpackConfig }) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const rule of webpackConfig.module.rules) {
        if (rule.loader && rule.loader.indexOf('url-loader') !== -1) {
          // Always emit images as real files instead of inlining small ones
          // as base64 data URLs, so e.g. structured-data logo URLs stay
          // fetchable by crawlers.
          rule.options.limit = 0;
        }
      }
      return webpackConfig;
    },
  },
  options: {},
};
