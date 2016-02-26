var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = function(options) {
  var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true&path=' + options.publicPath + '/__webpack_hmr';
  return {
    devtool: '#eval-source-map',
    entry: {
      app: [
        hotMiddlewareScript,
        path.join(__dirname, 'src', 'app', 'index.js'),
      ],
      theme1: [
        hotMiddlewareScript,
        path.join(__dirname, 'themes', 'theme1', 'index.js'),
      ],
      theme2: [
        hotMiddlewareScript,
        path.join(__dirname, 'themes', 'theme2', 'index.js'),
      ],
    },
    output: {
      path: path.join(__dirname, 'static'),
      filename: '[name].js',
      publicPath: options.publicPath + '/static',
    },
    resolve: {
      modulesDirectories: [
        'node_modules',
        'extensions',
        'themes',
      ],
      extensions: ['', '.js', '.jsx', '.css'],
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          include: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'extensions'),
            path.join(__dirname, 'themes'),
          ],
          exclude: /(node_modules)/,
        },
        {
          test: /\.jsx?$/,
          loader: 'babel',
          include: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'extensions'),
            path.join(__dirname, 'themes'),
          ],
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
      new webpack.optimize.CommonsChunkPlugin({
        name: 'theme-commons',
        chunks: ['app', 'theme1', 'theme2'],
        minChunks: 2,
      }),
      new HtmlWebpackPlugin({
        filename: options.htmlOutput,
        template: options.template,
        chunks: ['app', 'theme-commons',],
      }),
    ],
  };
}
