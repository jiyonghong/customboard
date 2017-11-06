import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { itemSelector } from 'app/redux/itemPicker/selectors';

import OrderForm from 'app/components/OrderForm';


class OrderFormContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    deck: PropTypes.object.isRequired,
    truck: PropTypes.object.isRequired,
    wheel: PropTypes.object.isRequired,
  }

  render() {
    const {
      deck,
      truck,
      wheel,
    } = this.props;

    return (
      <OrderForm
        deck={deck}
        truck={truck}
        wheel={wheel}
      />
    );
  }
}


const mapStateToProps = state => ({
  ...itemSelector(state),
});
const connector = connect(mapStateToProps);

export default connector(OrderFormContainer);
