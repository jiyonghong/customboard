import React from 'react';
import { PropTypes } from 'prop-types';
import CSS from 'react-css-modules';

import logo from 'assets/images/logo.png';

import 'assets/css/app.scss';
import 'font-awesome/css/font-awesome.css';

import style from './style.scss';


class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <div>
        <a styleName="logo" href="/">
          <img src={logo} alt="샵으로" />
        </a>
        {children}
      </div>
    );
  }
}


export default CSS(Layout, style);
