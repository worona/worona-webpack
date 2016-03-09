var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = function(options) {
  var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true&path=' + options.publicPath + '/__webpack_hmr';
  return {
    devtool: '#eval-source-map',
    entry: {
      app: [
        hotMiddlewareScript,
        path.join(__dirname, 'worona', 'entries', 'app', 'index.js'),
      ],
      dashboard: [
        hotMiddlewareScript,
        path.join(__dirname, 'worona', 'entries', 'dashboard', 'index.js'),
      ],
      'theme1.app': [
        hotMiddlewareScript,
        path.join(__dirname, 'node_modules', 'worona-theme1', 'app.js'),
      ],
      'theme1.dashboard': [
        hotMiddlewareScript,
        path.join(__dirname, 'node_modules', 'worona-theme1', 'dashboard.js'),
      ],
      'theme2.app': [
        hotMiddlewareScript,
        path.join(__dirname, 'themes', 'theme2', 'app.js'),
      ],
      'theme2.dashboard': [
        hotMiddlewareScript,
        path.join(__dirname, 'themes', 'theme2', 'dashboard.js'),
      ],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: options.publicPath + '/dist',
    },
    resolve: {
      modulesDirectories: [
        'node_modules',
        'extensions',
        'themes',
        'worona',
      ],
      fallback: [path.join(__dirname, 'node_modules')],
      extensions: ['', '.js', '.jsx', '.css'],
    },
    resolveLoader: {
      fallback: [path.join(__dirname, 'node_modules')],
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          include: [
            path.join(__dirname, 'worona', 'entries'),
            path.join(__dirname, 'worona', 'worona'),
            path.join(__dirname, 'extensions'),
            path.join(__dirname, 'themes'),
            fs.realpathSync(__dirname + '/node_modules/worona-theme1/'),
          ],
        },
        {
          test: /\.jsx?$/,
          loader: 'babel',
          include: [
            path.join(__dirname, 'worona', 'entries'),
            path.join(__dirname, 'worona', 'worona'),
            path.join(__dirname, 'extensions'),
            path.join(__dirname, 'themes'),
            fs.realpathSync(__dirname + '/node_modules/worona-theme1/'),
          ],
          query: {
            cacheDirectory: true,
            presets: ['react-hmre'],
            // plugins: ['transform-runtime'],
          },
        },
      ]
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: options.chunksName,
        chunks: options.commonChunks,
        minChunks: 2,
      }),
      new HtmlWebpackPlugin({
        filename: options.htmlOutput,
        template: options.template,
        chunks: options.finalChunks,
      }),
    ],
  };
}
