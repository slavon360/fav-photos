import React, { Component } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import { connect } from 'react-redux';
import * as actions from '../../actions/photos';
import Photos from '../../components/Photos';
import Preloader from '../../components/UI/Preloader';

import './PhotosPage.scss';

const unsplash = new Unsplash({
  applicationId: process.env.APP_ACCESS_KEY,
  secret: process.env.APP_SECRET,
});
class PhotosPage extends Component{
  state = {
    currentPage: 1,
  }
  componentDidMount(){
    const favPhotos = JSON.parse(localStorage.getItem('favorite-photos'));
    if (!this.props.photos) {
      if (favPhotos && favPhotos.length) {
        this.fetchPhotos(favPhotos);
      } else {
        this.fetchPhotos();
      }
    } else {
      this.props.fetchLocalPhotos(favPhotos);
    }
  }
  fetchPhotos = (fav) => {
    const { currentPage } = this.state;
    this.props.fetchPhotos(fav);
  }
  makeFavorite = (photo) => {
    let oldFavPhotos = JSON.parse(localStorage.getItem('favorite-photos')) || [];
    this.props.makeFavorite(photo, oldFavPhotos);
  }
  increaseCurrentPage = () => {
    const { currentPage } = this.state;
    const favPhotos = JSON.parse(localStorage.getItem('favorite-photos'));
    console.log('fetchPhotos from increaseCurrentPage ', currentPage+1);
    this.setState({ currentPage: currentPage + 1 }, () => this.fetchPhotos(favPhotos));
  }
  render(){
    const { scrollPosition, photos, errors } = this.props;
    const feedback = errors ? (<div
      className="error-wrp">Error: {errors.errors.map((err, index) => <div key={index}>{err}</div>)}</div>) : <Preloader />;
    return (
      <div className="photos-page">
        <h1>Photos Page</h1>
        { photos ? <Photos
          increaseCurrentPage={this.increaseCurrentPage}
          scrollPosition={scrollPosition}
          makeFavorite={this.makeFavorite}
          photos={photos} /> : feedback }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  photos: state.photos,
  errors: state.errors,
});

const mapDispatchToProps = dispatch => ({
  makeFavorite: (photo, oldFavPhotos) => {
    dispatch(actions.makeFavoritePhoto(photo, oldFavPhotos));
  },
  fetchPhotos: (fav) => {
    dispatch(actions.requirePhotos(fav));
  },
  fetchLocalPhotos: (fav) => {
    dispatch(actions.fetchLocalPhotos(fav));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(trackWindowScroll(PhotosPage));
