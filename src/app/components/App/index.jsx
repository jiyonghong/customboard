import React from 'react';
import CSSModules from 'react-css-modules';

import 'assets/css/app.scss';

import style from './style.scss';


class App extends React.Component {
  render() {
    return (
      <h1 className="bg" styleName="hello">Hello!</h1>
    );
  }
}


export default CSSModules(App, style);
