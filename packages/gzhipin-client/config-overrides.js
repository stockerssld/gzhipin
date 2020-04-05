const {   override,
  fixBabelImports,
  addLessLoader, } = require('customize-cra');

  module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      libraryDirectory: 'es',
      style: 'css',
    }),
    addLessLoader({
      ident: 'postcss',
      javascriptEnabled: true,
      modifyVars: { "@primary-color": "#1DA57A" }
  })
  );