import React from 'react';
import './Preloader.scss';

const preloader = () => (
  <div className="wrap">
    <div className="loading">
      <div className="bounceball"></div>
      <div className="text">NOW LOADING</div>
    </div>
  </div>
);

export default preloader;
