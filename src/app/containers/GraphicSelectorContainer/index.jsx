import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { changeGraphic } from 'app/redux/viewer/actions';

import GraphicSelector from 'app/components/GraphicSelector';


class GraphicSelctorContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    graphicId: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleGraphicSelect = this.handleGraphicSelect.bind(this);
  }

  handleGraphicSelect(e) {
    const { dispatch } = this.props;
    const { id } = e.currentTarget.dataset;
    const graphicId = parseInt(id, 10);

    dispatch(changeGraphic(graphicId));
  }

  render() {
    const {
      graphicId,
    } = this.props;

    return (
      <GraphicSelector
        {...this.props}
        onClick={this.handleGraphicSelect}
        selectedGraphicId={graphicId}
      />
    );
  }
}


const mapStateToProps = state => ({
  graphicId: state.viewer.graphicId,
});
const connector = connect(mapStateToProps);

export default connector(GraphicSelctorContainer);
