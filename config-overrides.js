const {
  override,
  addWebpackAlias,
} = require('customize-cra');

module.exports = {
  webpack: override(
    addWebpackAlias({ '@/': './src', 'react-dom': '@hot-loader/react-dom', }),
  )
};
