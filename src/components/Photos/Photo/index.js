import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Star from '../../UI/Icons/Star';
// import 'react-lazy-load-image-component/src/effects/blur.css';

import './Photo.scss';

const photo = props => {
  const { photoInfo, makeFavorite, scrollPosition, totalPhotos, currIndex, increaseCurrentPage } = props;
  return (
  <div className="photo-plate-wrp">
    <div className="photo-plate">
      <button
        className="favorite-btn"
        onClick={() => makeFavorite(photoInfo)}
      >
        <Star color={ photoInfo.favorite ? '#EFCE4A' : '#ddd' } />
      </button>
      <LazyLoadImage
        className="photo-img"
        src={photoInfo.urls.small}
        alt={photoInfo.description}
        scrollPosition={scrollPosition}
        onLoad={() => {
          if (currIndex+1 === totalPhotos && increaseCurrentPage) {
            increaseCurrentPage();
          }
        }}
      />
    </div>
  </div>
  )
}

export default photo;
