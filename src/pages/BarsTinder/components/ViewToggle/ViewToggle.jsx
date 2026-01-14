import React from 'react';
import './ViewToggle.css';

const ViewToggle = ({ view, onViewChange, favoritesCount }) => {
  return (
    <div className="view-toggle">
      <button 
        className={`toggle-btn ${view === 'discover' ? 'active' : ''}`}
        onClick={() => onViewChange('discover')}
      >
        Discover
      </button>
      <button 
        className={`toggle-btn ${view === 'favorites' ? 'active' : ''}`}
        onClick={() => onViewChange('favorites')}
      >
        Favorites ({favoritesCount})
      </button>
    </div>
  );
};

export default ViewToggle;