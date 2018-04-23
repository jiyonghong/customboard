import React from 'react';
import CSS from 'react-css-modules';

import Layout from 'app/components/Layout';

import ItemPicker from 'app/containers/ItemPickerContainer';
import Viewer from 'app/containers/ViewerContainer';
import GraphicSelector from 'app/containers/GraphicSelectorContainer';

import styles from './style.scss';


class Home extends React.Component {
  render() {
    return (
      <Layout>
        <Viewer
          className={styles.homeViewer}
          responsive
          menu
        />
        <GraphicSelector />
        <ItemPicker />
      </Layout>
    );
  }
}

export default CSS(Home, styles);
