module.exports = config => {
  // eslint-disable-next-line no-restricted-syntax
  for (const rule of config.module.rules) {
    console.log(rule);
    if (
      rule.test instanceof RegExp &&
      rule.test.source === /\.module\.css$/.source
    ) {
      // eslint-disable-next-line no-restricted-syntax
      for (const u of rule.use) {
        if (u.loader && u.loader.indexOf('postcss-loader') !== -1) {
          console.log('postcss-loader', u);
          u.options.plugins = () => [
            // eslint-disable-next-line global-require
            require('autoprefixer')({
              browsers: ['last 2 version', 'ie >= 10'],
            }),
            require('postcss-mixins')(), // eslint-disable-line global-require
            require('postcss-simple-vars')(), // eslint-disable-line global-require
            require('postcss-nested')(), // eslint-disable-line global-require
          ];
        }
      }
    }
  }
  return config;
};
