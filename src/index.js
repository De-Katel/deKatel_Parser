import React from 'react';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../src/storage/reducers/rootReducer'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../src/components/app/app';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, rootReducer);


// logger
const middleware = [createLogger()]

// const store = createStore(pReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(pReducer, compose(applyMiddleware(...middleware)));
// const qwe =()=>storage.removeItem('persist:root');
// qwe()  //очистка sorage;
export const persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
