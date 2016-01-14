import React  from 'react';
import ReactDOM  from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../store/reduxStore';
import App from '../containers/app';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
);
