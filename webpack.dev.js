var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = function(options) {
  var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true&path=' + options.publicPath + '/__webpack_hmr';
  return {
    devtool: 'eval-source-map',
    entry: {
      app: [
        hotMiddlewareScript,
        path.join(__dirname, 'src', 'app', 'index.js'),
      ],
    },
    output: {
      path: path.join(__dirname, 'static'),
      filename: 'bundle.js',
      publicPath: options.publicPath + '/static',
    },
    resolve: {
      modulesDirectories: [
        'node_modules',
        'extensions',
      ],
      extensions: ['', '.js', '.jsx', '.css'],
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          include: path.join(__dirname, 'src'),
          exclude: /(node_modules)/,
        },
        {
          test: /\.jsx?$/,
          loader: 'babel',
          include: path.join(__dirname, 'src'),
          exclude: /(node_modules)/,
          query: {
            cacheDirectory: true,
            presets: ['react-hmre'],
            plugins: ['transform-runtime'],
          },
        },
      ]
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new HtmlWebpackPlugin({
        filename: options.htmlOutput,
        template: options.template,
      }),
    ],
  };
}
