import React, { Component } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import Photos from '../../components/Photos';
console.log(process.env);
const unsplash = new Unsplash({
  applicationId: process.env.APP_ACCESS_KEY,
  secret: process.env.APP_SECRET,
});
class PhotosPage extends Component{
  state = {
    photos: null,
    currentPage: 1,
  }
  componentDidMount(){
    const favPhotos = JSON.parse(localStorage.getItem('favorite-photos'));
    if (favPhotos && favPhotos.length) {
      this.fetchPhotos(favPhotos);
    } else {
      this.fetchPhotos();
    }
  }
  fetchPhotos = (fav) => {
    const { photos, currentPage } = this.state;
    unsplash.photos.listPhotos(currentPage, 30, "latest")
      .then(toJson)
      .then(json => {
        if (!fav) {
          const phts = json.map(item => ({
            ...item,
            favorite: false,
          }));
          const updPhotos = photos && photos.length ? [...photos, ...phts] : phts;
          this.setState({ photos: updPhotos });
        } else {
          const photosList = photos && photos.length ? [...photos, ...json] : json;
          const updPhotos = photosList.map(photo => {
            fav.find(f => photo.favorite = f.id === photo.id);
            return photo;
          });
          this.setState({ photos: updPhotos });
        }
      });
  }
  makeFavorite = (photo) => {
    let oldFavPhotos = JSON.parse(localStorage.getItem('favorite-photos')) || [];
    const photos = [...this.state.photos];
    const updPhotos = photos.map(item => {
      item.favorite = photo.id === item.id ? !item.favorite : item.favorite;
      photo.id === item.id && item.favorite ? oldFavPhotos.push(item) : null;
      if (photo.id === item.id && !item.favorite) {
        oldFavPhotos = oldFavPhotos.filter(f => f.id !== item.id);
      }
      return item;
    })
    this.setState({ photos: updPhotos });
    localStorage.setItem('favorite-photos', JSON.stringify(oldFavPhotos));
  }
  increaseCurrentPage = () => {
    let { currentPage } = this.state;
    const favPhotos = JSON.parse(localStorage.getItem('favorite-photos'));
    console.log('fetchPhotos from increaseCurrentPage ', currentPage+1);
    this.setState({ currentPage: currentPage + 1 }, () => this.fetchPhotos(favPhotos));
  }
  render(){
    const { photos } = this.state;
    const { scrollPosition } = this.props;
    return (
      <div className="photos-page">
        <h1>Photos Page Vasya</h1>
        { photos ? <Photos
          increaseCurrentPage={this.increaseCurrentPage}
          scrollPosition={scrollPosition}
          makeFavorite={this.makeFavorite}
          photos={photos} /> : null }
      </div>
    )
  }
}

export default trackWindowScroll(PhotosPage);
