import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import {
  toPrevPage,
  toNextPage,
  selectItem,
} from 'app/redux/itemPicker/actions';

import ItemPicker from 'app/components/ItemPicker';


class ItemPickerContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    pages: PropTypes.array.isRequired,
    selectedIds: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);

    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
  }

  handlePrevPage() {
    const { dispatch } = this.props;
    dispatch(toPrevPage());
  }

  handleNextPage() {
    const { dispatch } = this.props;
    dispatch(toNextPage());
  }

  handleSelectItem(e) {
    const { dispatch } = this.props;
    const pageType = e.currentTarget.dataset.pageType;
    const index = parseInt(e.currentTarget.dataset.index, 10);

    dispatch(selectItem(pageType, index));
  }

  render() {
    const {
      currentPage,
      pages,
      selectedIds,
    } = this.props;

    return (
      <ItemPicker
        currentPage={currentPage}
        pages={pages}
        selectedIds={selectedIds}
        handlePrevPage={this.handlePrevPage}
        handleNextPage={this.handleNextPage}
        handleSelectItem={this.handleSelectItem}
      />
    );
  }
}


const mapStateToProps = state => ({
  ...state.itemPicker,
});
const connector = connect(mapStateToProps);

export default connector(ItemPickerContainer);
