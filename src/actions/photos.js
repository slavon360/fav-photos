import * as actionTypes from './actionTypes';
import Unsplash, { toJson } from 'unsplash-js';

let currentPage = 0;

const unsplash = new Unsplash({
  applicationId: process.env.APP_ACCESS_KEY,
  secret: process.env.APP_SECRET,
});

const fetchPhotosSuccess = (json, fav) => ({
  data: json,
  fav: fav,
  type: actionTypes.FETCH_PHOTOS_SUCCESS,
})

const fetchPhotosFail = errors => ({
  errors,
  type: actionTypes.FETCH_PHOTOS_FAIL,
})

export const fetchLocalPhotos = (fav) => ({
  fav,
  type: actionTypes.FETCH_LOCAL_PHOTOS,
})

export const requirePhotos = (fav) => (
  dispatch => {
    ++currentPage;
    return unsplash.photos.listPhotos(currentPage, 30, "latest")
      .then(toJson)
      .then(json => dispatch(fetchPhotosSuccess(json, fav)))
      .catch(errors => dispatch(fetchPhotosFail(errors)))
  }
)

export const makeFavoritePhoto = (photo, oldFavPhotos) => ({
  photo,
  oldFavPhotos,
  type: actionTypes.MAKE_FAVORITE_PHOTO,
})
