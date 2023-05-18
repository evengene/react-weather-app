import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './redux/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { WeatherApp } from './components/WeatherApp';

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk),
));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WeatherApp/>
    </Provider>
  </React.StrictMode>,
);
