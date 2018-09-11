import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout';
import PhotosPage from './containers/PhotosPage';
import FavPhotosPage from './containers/FavPhotosPage';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/dashboard/photos" exact component={PhotosPage} />
            <Route path="/dashboard/photos/favorite" exact component={FavPhotosPage} />
            <Redirect to="/dashboard/photos" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
