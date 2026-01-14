import React from 'react';
import './FilterSection.css';

const FilterSection = ({ filter, onFilterChange }) => {
  return (
    <div className="filter-section">
      <label>Choose what you're looking for:</label>
      <div className="filter-tabs">
        <button 
          className={`filter-tab ${filter === 'restaurant' ? 'active' : ''}`}
          onClick={() => onFilterChange('restaurant')}
        >
          <span className="filter-icon" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'%3E%3Cpath d='M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1z'/%3E%3Cpath d='M16.03 14.99c0-8.61-6.61-6.99-6.61-6.99A2 2 0 0 0 8 6V3h2v3c0 .55-.45 1-1 1s-1-.45-1-1V3H7.2c-.17.89.32 1.59 1.13 1.91.6.23 1.27.1 1.64-.36L11 3h1v3a2 2 0 0 1-1.42 1.91c0 0-6.61-1.62-6.61 6.99 0 1.66 1.33 3.08 2.97 3.08 1.64.01 2.97-1.42 2.97-3.08l.12.09z'/%3E%3C/svg%3E\")"
          }}></span>
          Restaurants
        </button>
        <button 
          className={`filter-tab ${filter === 'cafe' ? 'active' : ''}`}
          onClick={() => onFilterChange('cafe')}
        >
          <span className="filter-icon" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'%3E%3Cpath d='M2 21h18v-2H2v2zM20 8h-2V5h2m0-2h-6v2h2v3H4V3h2V1H0v2h2v3v6c0 1.66 1.34 3 3 3h6c1.66 0 3-1.34 3-3V8h2c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2z'/%3E%3C/svg%3E\")"
          }}></span>
          Cafes
        </button>
      </div>
    </div>
  );
};

export default FilterSection;