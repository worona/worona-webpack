import React from 'react';
import ReactDOM from 'react-dom';
import { MyComponent } from './component.jsx';
import style from './component.css';

export class Theme extends React.Component {
  render() {
    return <MyComponent />;
  }
}

worona.exports = { Theme };

console.log('loading theme1');
