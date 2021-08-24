const path = require('path');

function srcPath(subdir) {
  return path.join(__dirname, 'src', subdir);
}

module.exports = {
  resolve: {
    alias: {
      common: srcPath('common'),
      components: srcPath('components'),
      modules: srcPath('modules'),
      pages: srcPath('pages')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[sha1:hash:hex:4]'
            }
          }
        ]
      }
    ]
  }
};
