const path = require('path');

module.exports = config => {
  // eslint-disable-next-line no-param-reassign
  config.resolve.alias = {
    // remember to update
    // .eslintrc.js
    // jsconfig.json
    // package.json
    common: path.resolve('./src/components/common'),
  };
  return config;
};
