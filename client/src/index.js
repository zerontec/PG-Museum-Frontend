import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import {store, persistor} from './redux/store/index';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter >,
  document.getElementById('root')
);
