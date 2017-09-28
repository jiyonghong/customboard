import React from 'react';
import { PropTypes } from 'prop-types';
import CSS from 'react-css-modules';

import 'assets/css/app.scss';

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
        {children}
      </div>
    );
  }
}


export default CSS(Layout, style);
