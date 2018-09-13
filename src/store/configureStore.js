import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import photos from '../reducers/photos';

const initStore = () => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: 'Favorite Photos',
      }) : compose;
  /* eslint-enable no-underscore-dangle */

  const store = createStore(
    photos,
    composeEnhancers(
      applyMiddleware(
        thunk,
      ),
    ),
  );
  return store;
};

export default initStore();
