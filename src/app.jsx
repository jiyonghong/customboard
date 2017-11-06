import React from 'react';
import ReactDom from 'react-dom';

import { createHashHistory } from 'history';

// redux
import { Provider } from 'react-redux';
import configureStore from 'app/redux/store';

// react-router
import { HashRouter } from 'react-router-dom';


const history = createHashHistory();
const store = configureStore(history);
const rootEl = document.getElementById('app');


const render = () => {
  const AppContainer = require('./app/containers/AppContainer/index.jsx');
  ReactDom.render(
    <Provider store={store}>
      <HashRouter>
        <AppContainer />
      </HashRouter>
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
      ReactDom.render(<RedBox error={error} />, rootEl);
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
