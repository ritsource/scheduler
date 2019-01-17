import React from 'react';
import ReactSVG from 'react-svg';

export const SettingsPage = ({ staticContext = {} }) => {
  staticContext.serviceUnavailable = true;
  
  return (
    <div className='not-found-page-000'>
      <div className='not-found-page-404-div'>
        <h1>5</h1>
        {/* <img src='/Facebook-Wow.png'/> */}
        <ReactSVG src='/Facebook-Sad.svg'/>
        <h1>3</h1>
      </div>
      <p>This route is currently under development!</p>
    </div>
  );
}

export default {
  component: SettingsPage
};