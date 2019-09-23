import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

const initialState = {};
const logger = createLogger();

const middleware = [thunk, logger];

// Normal redux
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;

/*
Redux-persist
 */

// const persistConfig = {
//   key: 'root',
//   storage,
// };
//
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// export default () => {
//   const store = createStore(persistReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
//   const persistor = persistStore(store);
//   return {store, persistor};
// };

// export const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
// export const persistor = persistStore(store);
