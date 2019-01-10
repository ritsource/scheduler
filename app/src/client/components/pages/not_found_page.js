import React from 'react';

export const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  
  return (
    <div>
      404 Not Found
    </div>
  );
}

export default {
  component: NotFoundPage
};