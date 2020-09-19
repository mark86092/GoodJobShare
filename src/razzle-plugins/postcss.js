const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const postCssOptions = {
  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
  plugins : () => [
    // eslint-disable-next-line global-require
    require('autoprefixer')({
      browsers: ['last 2 version', 'ie >= 10'],
    }),
    require('postcss-mixins')(), // eslint-disable-line global-require
    require('postcss-simple-vars')(), // eslint-disable-line global-require
    require('postcss-nested')(), // eslint-disable-line global-require
  ]
}

module.exports = (config, env) => {
  const { target, dev } = env;
  const IS_NODE = target === 'node';
  const IS_WEB = target === 'web';
  const IS_PROD = env === 'prod';
  const IS_DEV = env === 'dev';

  for (const rule of config.module.rules) {
    if (
      rule.test instanceof RegExp &&
      rule.test.source === /\.css$/.source
    ) {
      rule.exclude = [/\.module\.css$/];
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  config.module.rules.push(
    {
      test: /\.module\.css$/,
      use: IS_NODE
            ? [
                {
                  // on the server we do not need to embed the css and just want the identifier mappings
                  // https://github.com/webpack-contrib/css-loader#scope
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    modules: {
                      auto: true,
                      localIdentName: '[path]__[name]___[local]',
                    },
                    onlyLocals: true,
                  },
                },
              ]
            : IS_DEV
              ? [
                  require.resolve('style-loader'),
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      importLoaders: 1,
                      modules: {
                        auto: true,
                        localIdentName: '[path]__[name]___[local]',
                      },
                    },
                  },
                  {
                    loader: require.resolve('postcss-loader'),
                    options: postCssOptions,
                  },
                ]
              : [
                  MiniCssExtractPlugin.loader,
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      importLoaders: 1,
                      minimize: true,
                      modules: {
                        auto: true,
                        localIdentName: '[path]__[name]___[local]',
                      },
                    },
                  },
                  {
                    loader: require.resolve('postcss-loader'),
                    options: postCssOptions,
                  },
                ],
    }
  )
  return config;
};
