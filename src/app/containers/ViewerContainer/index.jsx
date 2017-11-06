import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { changePerspective } from 'app/redux/viewer/actions';
import { itemSelector } from 'app/redux/itemPicker/selectors';

import Viewer from 'app/components/Viewer';


class ViewerContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    deck: PropTypes.object,
    truck: PropTypes.object,
    wheel: PropTypes.object,
    perspective: PropTypes.string.isRequired,
  }

  static defaultProps = {
    deck: null,
    truck: null,
    wheel: null,
  }

  constructor(props) {
    super(props);

    this.handleChangePerspective = this.handleChangePerspective.bind(this);
  }

  handleChangePerspective(e) {
    const { dispatch } = this.props;
    const perspective = e.currentTarget.dataset.perspective;
    dispatch(changePerspective(perspective));
  }

  render() {
    const {
      deck,
      truck,
      wheel,
      perspective,
    } = this.props;

    return (
      <Viewer
        {...this.props}
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
  ...itemSelector(state),
  ...state.viewer,
});
const connector = connect(mapStateToProps);

export default connector(ViewerContainer);
