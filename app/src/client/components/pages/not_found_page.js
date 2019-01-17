import React from 'react';
import ReactSVG from 'react-svg';

export const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  
  return (
    <div className='not-found-page-000'>
      <div className='not-found-page-404-div'>
        <h1>4</h1>
        {/* <img src='/Facebook-Wow.png'/> */}
        <ReactSVG src='/Facebook-Wow.svg'/>
        <h1>4</h1>
      </div>
      <p>The page you're trying to access, only exists in the dreams!</p>
    </div>
  );
}

export default {
  component: NotFoundPage
};