import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const middleware = [thunk];

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(enhancedReducer, composeWithDevTools(applyMiddleware(...middleware)));
  const persistor = persistStore(store);

  return {store, persistor};
};
