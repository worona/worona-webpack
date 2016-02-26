import loadrunner from './loadrunner';
import React from 'react';
import ReactDOM from 'react-dom';

const theme = 'theme1';

window.worona = { exports: {}};

using(`/static/${theme}.js`, function() {
  const Theme = worona.exports.Theme;
  ReactDOM.render(<Theme />, document.getElementById('root'));
});
