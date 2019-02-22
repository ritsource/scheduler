import React from 'react';
import { Redirect } from 'react-router-dom';

export const HomePage = () => (
  <div>
    <Redirect to='/calendar' />
  </div>
);

export default {
  component: HomePage
};