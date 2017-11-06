import React from 'react';
import { PropTypes } from 'prop-types';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';

import { changePerspective } from 'app/redux/viewer/actions';

import Layout from 'app/components/Layout';

import Viewer from 'app/containers/ViewerContainer';
import OrderForm from 'app/containers/OrderFormContainer';

import styles from './style.scss';


class Order extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(changePerspective('top'));
  }

  render() {
    return (
      <Layout>
        <div styleName="container">
          <Viewer
            className={styles.orderViewer}
            responsive
          />
          <OrderForm />
        </div>
      </Layout>
    );
  }
}


const connector = connect();
const Component = CSS(Order, styles);

export default connector(Component);
