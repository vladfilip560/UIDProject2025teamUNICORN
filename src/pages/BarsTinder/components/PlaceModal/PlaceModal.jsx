import React from 'react';
import './PlaceModal.css';
import { MdStar, MdLocationOn, MdPhone, MdSchedule, MdLanguage, MdClose, MdFavorite, MdFavoriteBorder } from 'react-icons/md';  
const PlaceModal = ({ 
  selectedPlace, 
  onClose, 
  favorites, 
  onToggleFavorite, 
  onOpenMaps 
}) => {
  if (!selectedPlace) return null;
  
  const isFavorited = favorites.find(fav => fav.id === selectedPlace.id);
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button 
          className="modal-close"
          onClick={onClose}
        >
          <MdClose />
        </button>
        
        <div className="modal-image-container">
          <img src={selectedPlace.image} alt={selectedPlace.name} className="modal-image" />
        </div>
        
        <div className="modal-details">
          <h2>{selectedPlace.name}</h2>
          
          <div className="modal-meta">
            <span className="modal-type">{selectedPlace.type}</span>
            {selectedPlace.cuisine && <span className="modal-cuisine">{selectedPlace.cuisine}</span>}
            <span className="modal-rating"><MdStar /> {selectedPlace.rating}</span>
            <span className="modal-price">{selectedPlace.priceRange}</span>
          </div>
          
          <p className="modal-description">{selectedPlace.description}</p>
          
          <div className="modal-info">
            <div className="info-item">
              <strong><MdLocationOn /> Address:</strong> {selectedPlace.address}
            </div>
            {selectedPlace.phone && (
              <div className="info-item">
                <strong><MdPhone /> Phone:</strong> {selectedPlace.phone}
              </div>
            )}
            <div className="info-item">
              <strong><MdSchedule /> Hours:</strong> {selectedPlace.openingHours}
            </div>
            {selectedPlace.website && (
              <div className="info-item">
                <strong><MdLanguage /> Website:</strong> 
                <a href={selectedPlace.website} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </div>
            )}
          </div>
          
          <div className="modal-actions">
            <button 
              className="btn-secondary"
              onClick={() => onToggleFavorite(selectedPlace)}
            >
              {isFavorited ? <><MdFavorite /> Remove from Favorites</> : <><MdFavoriteBorder /> Add to Favorites</>}
            </button>
            
            <button 
              className="btn-primary"
              onClick={() => onOpenMaps(selectedPlace)}
            >
              <MdLocationOn /> Open in Maps
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;