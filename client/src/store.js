import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {};
const logger = createLogger();

const middleware = [thunk, logger];

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
//
// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware)),
// );
//
// export default store;

export default () => {
  const store = createStore(persistReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
  const persistor = persistStore(store);
  return {store, persistor};
};
