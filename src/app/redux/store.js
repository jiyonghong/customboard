import { createStore } from 'redux';
import rootReducer from 'app/redux/reducer';


export default (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
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
