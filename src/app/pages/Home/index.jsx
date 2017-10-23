import React from 'react';

import Layout from 'app/components/Layout';

import ItemPicker from 'app/containers/ItemPickerContainer';
import Viewer from 'app/containers/ViewerContainer';


class Home extends React.Component {
  render() {
    return (
      <Layout>
        <Viewer />
        <ItemPicker />
      </Layout>
    );
  }
}

export default Home;
