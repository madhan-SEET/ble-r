import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import Login from './pages/Login';
import Home from './pages/HomeView';
import LoginPage from './pages/loginPage';
import Landing from './pages/LandingPage';
import Cart from './pages/Counter';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
       <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

