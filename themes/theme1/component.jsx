import React from 'react';
import ReactDOM from 'react-dom';
import style from './component.css';

export class MyComponent extends React.Component {
  render() {
    return <div className={style.text}>Hello Theme 1</div>;
  }
}
