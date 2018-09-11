import React, { Component } from 'react';
import Photos from '../../components/Photos';

class FavPhotosPage extends Component{
  state = {
    favPhotos: null,
  }
  componentDidMount(){
    const favPhotos = JSON.parse(localStorage.getItem('favorite-photos'));
    if (favPhotos) {
      this.setState({ favPhotos });
    }
  }
  makeFavorite = (photo) => {
    const favPhotos = [...this.state.favPhotos];
    const updPhotos = favPhotos.filter(fav => fav.id !== photo.id);
    this.setState({ favPhotos: updPhotos }, () => localStorage.setItem('favorite-photos', JSON.stringify(updPhotos)));
  }
  render(){
    const { favPhotos } = this.state;
    return (
      <div className="fav-photos-page">
        <h1>Favorite Photos Page</h1>
        { favPhotos ? <Photos makeFavorite={this.makeFavorite} photos={favPhotos} /> : <h2>No favorite photos</h2>}
      </div>
    )
  }
}

export default FavPhotosPage;
