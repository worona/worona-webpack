import React from 'react';
import ReactDOM from 'react-dom';
import style from './component.css';

export class Theme extends React.Component {
  render() {
    return <div className={style.text}>Hello Theme 1</div>;
  }
}

Worona.themes.theme1 = Theme;

console.log('loading theme1');
