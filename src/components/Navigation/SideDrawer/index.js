import React, { Fragment } from 'react';
import NavigationItems from '../NavigationItems';
import Backdrop from '../../UI/Backdrop';
import './SideDrawer.scss';

const sideDrawer = (props) => {
    let attachedClasses = ["side-drawer", "side-drawer-close"];
    if (props.open){
      attachedClasses = ["side-drawer", "side-drawer-open"];
    }
    return (
      <Fragment>
          <Backdrop show={props.open} clicked={props.closeSideDrawer}/>
          <div className={attachedClasses.join(' ')} onClick={props.closeSideDrawer}>
              <nav>
                <NavigationItems isAuthenticated={props.isAuth} />
              </nav>
          </div>
      </Fragment>
    );
}

export default sideDrawer;
