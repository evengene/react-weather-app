import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { SpeedInsights } from "@vercel/speed-insights/react";

import { configureStore } from '@reduxjs/toolkit';

import reducer from './redux/reducer';
import WeatherApp from './components/WeatherApp';

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WeatherApp />
        </Provider>
      <SpeedInsights />
  </React.StrictMode>,
);
