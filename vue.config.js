const path = require('path');

module.exports = {
  devServer: {
    disableHostCheck: true
  },
  productionSourceMap: false,
  configureWebpack: (config) => {
    optimization: {
      splitChunks: {
        chunks: 'all';
      }
    }
  },
  outputDir: path.resolve(__dirname, './deploy/ITLab-Reports-Front')
};
