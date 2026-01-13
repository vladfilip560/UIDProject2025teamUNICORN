import React from 'react';
import './FavoritesView.css';
import { MdStar, MdLocationOn } from 'react-icons/md';
const FavoritesView = ({ 
  favorites, 
  onRemoveFavorite, 
  onSelectPlace, 
  onOpenMaps, 
  onViewChange 
}) => {
  if (favorites.length === 0) {
    return (
      <div className="no-favorites">
        <h3>No favorites yet!</h3>
        <p>Swipe right on places you like to add them here.</p>
        <button onClick={() => onViewChange('discover')} className="btn-primary">Start Discovering</button>
      </div>
    );
  }
  
  return (
    <div className="favorites-container">
      <div className="favorites-grid">
        {favorites.map((place) => (
          <div key={place.id} className="favorite-card">
            <div className="favorite-image-container">
              <img src={place.image} alt={place.name} className="favorite-image" />
              <button 
                className="remove-favorite-btn"
                onClick={() => onRemoveFavorite(place.id)}
                title="Remove from favorites"
              ></button>
            </div>
            
            <div className="favorite-details">
              <h4 className="favorite-name">{place.name}</h4>
              <div className="favorite-meta">
                <span className="favorite-type">{place.type}</span>
                <span className="favorite-rating"><MdStar /> {place.rating}</span>
              </div>
              <p className="favorite-address"><MdLocationOn /> {place.address}</p>
              
              <div className="favorite-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => onSelectPlace(place)}
                >
                  View Details
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => onOpenMaps(place)}
                >
                  Open in Maps
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesView;