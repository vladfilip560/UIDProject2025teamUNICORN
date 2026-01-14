import React from 'react';
import PlaceCard from '../PlaceCard/PlaceCard';
import SwipeActions from '../SwipeActions/SwipeActions';
import './DiscoverView.css';

const DiscoverView = ({
  loading,
  location,
  currentPlace,
  places,
  currentIndex,
  onSwipe,
  onSelectPlace,
  onRefresh
}) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Finding amazing places near {location.name}...</p>
      </div>
    );
  }
  
  if (!currentPlace) {
    return (
      <div className="no-places">
        <h3>No more places to discover!</h3>
        <p>Try changing your location or filter.</p>
        <button onClick={onRefresh} className="btn-primary">Refresh</button>
      </div>
    );
  }

  return (
    <div className="discover-container">
      <div className="single-card">
        <PlaceCard
          place={currentPlace}
          onInfoClick={onSelectPlace}
        />
      </div>
      
      <SwipeActions
        onSwipe={onSwipe}
        onInfoClick={onSelectPlace}
        currentPlace={currentPlace}
      />
      
      <div className="progress">
        {currentIndex + 1} / {places.length}
      </div>
    </div>
  );
};

export default DiscoverView;