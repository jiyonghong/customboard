import React from 'react';
import { PropTypes } from 'prop-types';
import CSS from 'react-css-modules';
import FontAwesome from 'react-fontawesome';

import uuid from 'uuid';
import classnames from 'classnames';

import style from './style.scss';


class ItemPicker extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    pages: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
        selected: PropTypes.bool,
      }),
    ).isRequired,
    selectedIds: PropTypes.array.isRequired,
    handlePrevPage: PropTypes.func.isRequired,
    handleNextPage: PropTypes.func.isRequired,
    handleSelectItem: PropTypes.func.isRequired,
  }

  render() {
    const {
      currentPage,
      pages,
      selectedIds,
      handlePrevPage,
      handleNextPage,
      handleSelectItem,
    } = this.props;

    const page = pages[currentPage];
    const selectedId = selectedIds[currentPage];
    const isAllSelected = selectedIds.find(id => id === null) === undefined;

    return (
      <section styleName="item-picker">
        <header styleName="item-picker__header">
          <nav styleName="item-picker__header__nav">
            <span
              styleName={classnames(
                'item-picker__header__nav__arrow',
                currentPage === 0 ? 'disabled' : null,
              )}
              role="button"
              tabIndex={0}
              onClick={handlePrevPage}
            >
              <FontAwesome name="angle-left" />
            </span>
            <span
              styleName={classnames(
                'item-picker__header__nav__arrow',
                currentPage === pages.length - 1 ? 'disabled' : null,
              )}
              role="button"
              tabIndex={0}
              onClick={handleNextPage}
            >
              <FontAwesome name="angle-right" />
            </span>
          </nav>
          <p>{page.title}</p>
        </header>
        <div styleName="item-picker__content">
          <ul styleName="item-picker__content__list">
            {page.items.map((item, i) => (
              <li key={uuid.v4()}>
                <span
                  styleName={selectedId === i ? 'selected' : null}
                  role="button"
                  tabIndex={0}
                  onClick={handleSelectItem}
                  data-index={i}
                >
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <footer styleName="item-picker__footer">
          <button
            styleName={classnames(
              'item-picker__footer__order-btn',
              isAllSelected ? 'active' : null,
            )}
          >
            주문하기
          </button>
        </footer>
      </section>
    );
  }
}


export default CSS(ItemPicker, style, {
  allowMultiple: true,
});
