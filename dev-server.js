var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.dev.js');
var ngrok = require('ngrok');

var makeServer = function(options) {
  var server = express();
  var config = webpackConfig(options);
  var compilerRun = webpack(config);

  compilerRun.run(function(err, stats) {
    if (err) console.log(err);
    else {
      var compiler = webpack(config);
      server.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
      }));

      server.use(require('webpack-hot-middleware')(compiler));

      server.get('*', function(req, res) {
        res.sendFile(options.sendFile);
      });

      server.listen(options.port, options.host, function(err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log();
        console.log('Local at http://' + options.host + ':' + options.port);
        console.log('Public path at ' + options.publicPath);
        console.log();
      });
    }
  });
};

ngrok.connect(3001, function (err, ngrok) {
  if (err) console.log(err);
  else {
    ngrok = ngrok.replace('https://', 'http://');
    makeServer({
      name: 'app',
      publicPath: ngrok,
      host: 'localhost',
      port: 3001,
      template: 'worona/templates/cordova.html',
      htmlOutput: '../worona/cordova/www/index.html',
      sendFile: path.join(__dirname, 'worona', 'cordova', 'www', 'index.html'),
      chunksName: 'app-commons',
      commonChunks: ['app', 'theme1.app', 'theme2.app'],
      finalChunks: ['app', 'app-commons'],
    });
  }
});

makeServer({
  name: 'app',
  publicPath: 'http://localhost:3000',
  host: 'localhost',
  port: 3000,
  template: 'worona/templates/web.html',
  htmlOutput: 'app.html',
  sendFile: path.join(__dirname, 'dist', 'app.html'),
  chunksName: 'app-commons',
  commonChunks: ['app', 'theme1.app', 'theme2.app'],
  finalChunks: ['app', 'app-commons'],
});

makeServer({
  name: 'dashboard',
  publicPath: 'http://localhost:4000',
  host: 'localhost',
  port: 4000,
  template: 'worona/templates/dashboard.html',
  htmlOutput: 'dashboard.html',
  sendFile: path.join(__dirname, 'dist', 'dashboard.html'),
  chunksName: 'dashboard-commons',
  commonChunks: ['dashboard', 'theme1.dashboard', 'theme2.dashboard'],
  finalChunks: ['dashboard', 'dashboard-commons'],
});
