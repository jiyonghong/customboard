import React from 'react';
import { PropTypes } from 'prop-types';
import CSS from 'react-css-modules';

import classnames from 'classnames';
import uuid from 'uuid';

import styles from './style.scss';


const dummyItems = new Array(10).fill(0);


class GraphicSelector extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

  render() {
    const {
      onClick,
    } = this.props;

    return (
      <div styleName="graphic-selector">
        <div styleName="graphic-selector__wrap">
          <ul styleName="graphic-selector__list">
            {dummyItems.map((_, i) => (
              <li
                key={uuid.v4()}
                styleName="graphic-selector__list__item"
              >
                <div
                  styleName={classnames(
                    'graphic',
                    i === 0 ? 'graphic--selected' : null,
                  )}
                  role="button"
                  tabIndex={0}
                  onClick={onClick}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}


export default CSS(GraphicSelector, styles, { allowMultiple: true });
