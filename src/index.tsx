import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app.jsx';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { rootReducer } from './services/srore';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore({ 
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
})

root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
