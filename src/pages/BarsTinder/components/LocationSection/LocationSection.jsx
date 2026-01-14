import React from 'react';
import './LocationSection.css';
import { MdLocationOn } from 'react-icons/md';
const LocationSection = ({
  location,
  showLocationInput,
  onToggleLocationInput,
  locationInput,
  onLocationInputChange,
  onLocationSearch,
  onGetCurrentLocation
}) => {
  return (
    <div className="location-section">
      <div className="current-location">
        <span><MdLocationOn /> {location.name}</span>
        <button 
          className="change-location-btn"
          onClick={onToggleLocationInput}
        >
          Change
        </button>
      </div>
      
      {showLocationInput && (
        <div className="location-input-section">
          <input
            type="text"
            placeholder="Enter city name..."
            value={locationInput}
            onChange={(e) => onLocationInputChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onLocationSearch()}
            className="location-input"
          />
          <button onClick={onLocationSearch} className="btn-primary">Search</button>
          <button onClick={onGetCurrentLocation} className="btn-secondary">Use Current Location</button>
        </div>
      )}
    </div>
  );
};

export default LocationSection;