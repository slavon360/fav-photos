import * as actionTypes from '../actions/actionTypes';

const initialState = {
  photos: null,
  errors: false,
};

const fetchPhotos = (state, action) => {
  const { photos } = state;
  const { data, fav } = action;
  if (!fav) {
    const phts = data.map(item => ({
      ...item,
      favorite: false,
    }));
    const updPhotos = photos && photos.length ? [...photos, ...phts] : phts;
    return { ...state, photos: updPhotos };
  } else {
    let photosList = photos && photos.length ? [...photos, ...data] : data;
    if (photosList.errors) {
      return { ...state, errors: photosList };
    }
    const updPhotos = photosList.map(photo => {
      fav.find(f => photo.favorite = f.id === photo.id);
      return photo;
    });
    return { ...state, photos: updPhotos };
  }
}

const fetchLocalPhotos = (state, action) => {
  const { photos } = state;
  const { fav } = action;
  const updPhotos = photos.map(photo => {
    fav.find(f => photo.favorite = f.id === photo.id);
    return photo;
  });
  return { ...state, photos: updPhotos };
}

const fetchPhotosFail = (state, action) => {
  const { errors } = action;
  return { ...state, errors };
}

const makeFavoritePhoto = (state, action) => {
  const { photos } = state;
  let { oldFavPhotos, photo } = action;
  const updPhotos = photos.map(item => {
      item.favorite = photo.id === item.id ? !item.favorite : item.favorite;
      photo.id === item.id && item.favorite ? oldFavPhotos.push(item) : null;
      if (photo.id === item.id && !item.favorite) {
        oldFavPhotos = oldFavPhotos.filter(f => f.id !== item.id);
      }
      return item;
    })
  localStorage.setItem('favorite-photos', JSON.stringify(oldFavPhotos));
  return { ...state, photos: updPhotos };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PHOTOS_SUCCESS:
      return fetchPhotos(state, action);
    case actionTypes.FETCH_PHOTOS_FAIL:
      return fetchPhotosFail(state, action);
    case actionTypes.MAKE_FAVORITE_PHOTO:
      return makeFavoritePhoto(state, action);
    case actionTypes.FETCH_LOCAL_PHOTOS:
      return fetchLocalPhotos(state, action);
    default: return state;
  }
};

export default reducer;
