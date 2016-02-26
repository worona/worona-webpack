import $script from 'scriptjs';
import React from 'react';
import ReactDOM from 'react-dom';

window.Worona = { themes: {}, extensions: {} };

const theme = 'theme2';

$script(`/static/${theme}.js`, function() {
  const Theme = Worona.themes[theme];
  ReactDOM.render(<Theme />, document.getElementById('root'));
});
