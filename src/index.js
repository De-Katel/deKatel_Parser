import React from 'react';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

// import { createLogger } from 'redux-logger'

import { persistStore} from 'redux-persist';

import rootReducer from '../src/storage/reducers/rootReducer'

import ReactDOM from 'react-dom/client';

import './index.css';

import App from '../src/components/app/app';

// logger
// const middleware = [createLogger()]
// const store = createStore(rootReducer, compose(applyMiddleware(...middleware)));

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// const qwe = () => storage.removeItem('persist:users');
// qwe()  //очистка sorage; 

export const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
