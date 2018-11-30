import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/home_page';

const AppRouter = () => (
  <div>
    <Route path='/' component={HomePage} exact />
  </div>
);

export default AppRouter;