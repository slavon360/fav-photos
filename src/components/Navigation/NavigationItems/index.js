import React from 'react';
import './NavigationItems.scss';
import NavigationItem from './NavigationItem';

const navigationItems = (props) => (
  <ul className="navigation-items">
      <NavigationItem link="/dashboard/photos" exact>List of photos</NavigationItem>
      <NavigationItem link="/dashboard/photos/favorite" exact>List of favorite photos</NavigationItem>
  </ul>
);

export default navigationItems;
