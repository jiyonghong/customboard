import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from 'app/redux/reducer';


export default (history, initialState = {}) => {
  const middlewares = [thunk, routerMiddleware(history)];

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
  );

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      try {
        const nextReducer = require('./reducer');
        store.replaceReducer(nextReducer);
      } catch (error) {
        console.error(chalk.red(`==> 😭  Reducer hot reloading error ${error}`)); // eslint-disable-line
      }
    });
  }

  return store;
};
