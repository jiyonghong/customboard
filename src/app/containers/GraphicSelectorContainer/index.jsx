import React from 'react';
import { connect } from 'react-redux';

import GraphicSelector from 'app/components/GraphicSelector';


class GraphicSelctorContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleGraphicSelect = this.handleGraphicSelect.bind(this);
  }

  handleGraphicSelect() {

  }

  render() {
    return (
      <GraphicSelector
        {...this.props}
        onClick={this.handleGraphicSelect}
      />
    );
  }
}


const mapStateToProps = state => ({

});
const connector = connect(mapStateToProps);

export default connector(GraphicSelctorContainer);
