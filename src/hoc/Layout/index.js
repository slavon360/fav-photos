import React, { Component, Fragment } from 'react';
import Toolbar from '../../components/Navigation/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer';
import './Layout.scss';

class Layout extends Component{
    state = {
      showSideDrawer:false
    }
    sideDrawerClosedHandler = () => {
      this.setState({
        showSideDrawer:false
      })
    }
    sideDrawerToggleHandler = () => {
      this.setState((prevState) => {
        return {showSideDrawer:!prevState.showSideDrawer};
      })
    }
  render(){
    return(
            <Fragment>
              <Toolbar
                isAuth={this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler}/>
              <SideDrawer
                isAuth={this.props.isAuthenticated}
                open={this.state.showSideDrawer}
                closeSideDrawer={this.sideDrawerClosedHandler}/>
              <main className="Content">
                {this.props.children}
              </main>
            </Fragment>
          );
  }
}


export default Layout;
