import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { itemSelector } from 'app/redux/itemPicker/selectors';

import OrderForm from 'app/components/OrderForm';


class OrderFormContainer extends React.Component {
  static propTypes = {
    deck: PropTypes.object,
    truck: PropTypes.object,
    wheel: PropTypes.object,
  }

  static defaultProps = {
    deck: null,
    truck: null,
    wheel: null,
  }

  render() {
    const {
      deck,
      truck,
      wheel,
    } = this.props;

    if (deck === null || truck === null || wheel === null) {
      return <Redirect to="/" />;
    }

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
