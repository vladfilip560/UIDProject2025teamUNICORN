import React from 'react';
import './SwipeActions.css';

const SwipeActions = ({ onSwipe, onInfoClick, currentPlace }) => {
  return (
    <div className="swipe-actions">
      <button 
        className="action-btn skip-btn"
        onClick={() => onSwipe('left')}
        title="Skip (A or ←)"
      >
      </button>
      <button 
        className="action-btn info-btn-round"
        onClick={() => onInfoClick(currentPlace)}
        title="View Details (Space or I)"
      >
      </button>
      <button 
        className="action-btn like-btn"
        onClick={() => onSwipe('right')}
        title="Add to Favorites (D or →)"
      >
      </button>
    </div>
  );
};

export default SwipeActions;