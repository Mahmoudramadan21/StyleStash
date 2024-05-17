import React from 'react';

const ErrorComponent = ({ message }) => {
  return (
    <div className="error">
      <div className="container">
        <span>Error: {message}</span>
      </div>
    </div>
  );
};

export default ErrorComponent;
