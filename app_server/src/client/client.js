import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './app_router';

ReactDOM.hydrate(<BrowserRouter>
    <AppRouter />
  </BrowserRouter>, document.querySelector('#root'));