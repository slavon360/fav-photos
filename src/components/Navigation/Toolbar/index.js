import React from 'react';
import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle';

import './Toolbar.scss';

const toolbar = (props) => (
    <header className="toolbar">
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className="logo">
          <Logo />
        </div>
        <nav className="desktop-only">
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;
