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
      publicPath: ngrok,
      host: 'localhost',
      port: 3001,
      template: 'templates/cordova.html',
      htmlOutput: '../cordova/www/index.html',
      sendFile: path.join(__dirname, 'cordova', 'www', 'index.html'),
    });
  }
});

makeServer({
  publicPath: 'http://localhost:3000',
  host: 'localhost',
  port: 3000,
  template: 'templates/web.html',
  htmlOutput: 'index.html',
  sendFile: path.join(__dirname, 'static', 'index.html'),
});
