import React from 'react';
import ReactDom from 'react-dom';

// redux
import { Provider } from 'react-redux';
import configureStore from 'app/redux/store';


const store = configureStore();
const rootEl = document.getElementById('app');

const render = () => {
  const AppContainer = require('./app/containers/AppContainer/index.jsx');
  ReactDom.render(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    rootEl,
  );
};


if (module.hot) {
  const rerender = () => {
    try {
      render();
    } catch (error) {
      const RedBox = require('redbox-react').default;
      render(<RedBox error={error} />, rootEl);
    }
  };

  module.hot.accept('./app/containers/AppContainer/index.jsx', () => {
    setImmediate(() => {
      ReactDom.unmountComponentAtNode(rootEl);
      rerender();
    });
  });
}

render();
