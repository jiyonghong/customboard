import React from 'react';
import { PropTypes } from 'prop-types';
import CSS from 'react-css-modules';

import classnames from 'classnames';
import uuid from 'uuid';

import graphics from 'app/data/graphics';

import styles from './style.scss';


class GraphicSelector extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    selectedGraphicId: PropTypes.number.isRequired,
  }

  render() {
    const {
      onClick,
      selectedGraphicId,
    } = this.props;

    return (
      <div styleName="graphic-selector">
        <div styleName="graphic-selector__wrap">
          <ul styleName="graphic-selector__list">
            {graphics.map(graphic => (
              <li
                key={uuid.v4()}
                styleName="graphic-selector__list__item"
              >
                <div
                  styleName={classnames(
                    'graphic',
                    graphic.id === selectedGraphicId ? 'graphic--selected' : null,
                  )}
                  style={{
                    backgroundImage: `url(${graphic.imageUrl})`,
                  }}
                  role="button"
                  data-id={graphic.id}
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
