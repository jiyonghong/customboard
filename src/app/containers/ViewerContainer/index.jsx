import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { changePerspective } from 'app/redux/viewer/actions';

import Viewer from 'app/components/Viewer';


class ViewerContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    pages: PropTypes.array.isRequired,
    selectedIds: PropTypes.array.isRequired,
    perspective: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.getItem = this.getItem.bind(this);
    this.handleChangePerspective = this.handleChangePerspective.bind(this);
  }

  getItem(id) {
    const {
      pages,
      selectedIds,
    } = this.props;

    const selectedId = selectedIds[id];

    return selectedId !== null ? pages[id].items[selectedId] : null;
  }

  handleChangePerspective(e) {
    const { dispatch } = this.props;
    const perspective = e.currentTarget.dataset.perspective;
    dispatch(changePerspective(perspective));
  }

  render() {
    const deck = this.getItem(0);
    const truck = this.getItem(1);
    const wheel = this.getItem(2);
    const { perspective } = this.props;

    return (
      <Viewer
        deck={deck}
        truck={truck}
        wheel={wheel}
        perspective={perspective}
        handleChangePerspective={this.handleChangePerspective}
      />
    );
  }
}

const mapStateToProps = state => ({
  ...state.itemPicker,
  ...state.viewer,
});
const connector = connect(mapStateToProps);

export default connector(ViewerContainer);
