import React from 'react';
import Photo from './Photo';

import './Photos.scss';

const photos = props => {
  const { photos, makeFavorite, scrollPosition, increaseCurrentPage } = props;
//  const totalPhotos = photos.length;
//  const imgsPerColumn = Math.floor(totalPhotos/3);
  const photosList = photos
    .map((photo, index, phts) => <Photo
    increaseCurrentPage={increaseCurrentPage}
    totalPhotos={phts.length}
    scrollPosition={scrollPosition}
    makeFavorite={makeFavorite}
    key={index}
    currIndex={index}
    photoInfo={photo} />);
  return (
  <div className="photos-container">
    {photosList}
  </div>
  )
}

export default photos;
