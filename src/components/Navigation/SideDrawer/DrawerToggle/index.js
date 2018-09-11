import React from 'react';
import './DrawerToggle.scss';

const drawerToggle = (props) => (
  <div onClick={props.clicked} className="drawer-toggle">
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;
