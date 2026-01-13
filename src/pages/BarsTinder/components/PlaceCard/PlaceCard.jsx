import React from 'react';
import './PlaceCard.css';
import { MdInfo, MdStar, MdLocationOn } from 'react-icons/md';
const PlaceCard = ({ 
  place, 
  onInfoClick
}) => {
  if (!place) return null;

  return (
    <div className="place-card">
      <div className="place-image-container">
        <img src={place.image} alt={place.name} className="place-image" />
        <div className="place-info-overlay">
          <button 
            className="info-btn"
            onClick={() => onInfoClick(place)}
            title="View Details"
          >
            <MdInfo />
          </button>
        </div>
      </div>
      
      <div className="place-details">
        <h3 className="place-name">{place.name}</h3>
        <div className="place-meta">
          <span className="place-type">{place.type}</span>
          {place.cuisine && <span className="place-cuisine">{place.cuisine}</span>}
          <span className="place-rating"><MdStar /> {place.rating}</span>
          <span className="place-price">{place.priceRange}</span>
        </div>
        <p className="place-description">{place.description}</p>
        <p className="place-address"><MdLocationOn /> {place.address}</p>
      </div>
    </div>
  );
};

export default PlaceCard;