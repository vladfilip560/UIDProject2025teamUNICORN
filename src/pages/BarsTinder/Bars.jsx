import React, { useState, useEffect, useCallback } from 'react';
import './Bars.css';

// Components
import FilterSection from './components/FilterSection/FilterSection';
import ViewToggle from './components/ViewToggle/ViewToggle';
import DiscoverView from './components/DiscoverView/DiscoverView';
import FavoritesView from './components/FavoritesView/FavoritesView';
import PlaceModal from './components/PlaceModal/PlaceModal';
import KeyboardShortcuts from './components/KeyboardShortcuts';

// Services
import { StaticDataService } from './services/staticDataService';

const Bars = () => {
  const [places, setPlaces] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('discover');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [filter, setFilter] = useState('restaurant');
  
  // Helper functions
  const getCurrentPlace = useCallback(() => {
    return places[currentIndex] || null;
  }, [places, currentIndex]);

  const handleSwipe = useCallback((direction) => {
    const currentPlace = getCurrentPlace();
    if (!currentPlace) return;

    if (direction === 'right') {
      setFavorites(prev => {
        if (!prev.find(fav => fav.id === currentPlace.id)) {
          return [...prev, { ...currentPlace, addedAt: new Date().toISOString() }];
        }
        return prev;
      });
    }
    
    setCurrentIndex(prev => prev + 1);
  }, [getCurrentPlace]);
  useEffect(() => {
    const savedFavorites = localStorage.getItem('placesToVisitFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('placesToVisitFavorites', JSON.stringify(favorites));
  }, [favorites]);


  const fetchPlaces = useCallback(async () => {
    setLoading(true);
    
    try {
      const result = await StaticDataService.fetchPlaces(null, filter);
      console.log(`Places loaded from: ${result.source}`);
      
      setPlaces(result.places);
      setCurrentIndex(0);
      
    } catch (error) {
      console.error('Error fetching places:', error);
      setPlaces([]);
    }
    
    setLoading(false);
  }, [filter]);

  // Fetch places when filter changes
  useEffect(() => {
    fetchPlaces();
  }, [filter, fetchPlaces]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (view !== 'discover' || selectedPlace) return;
      
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        handleSwipe('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        handleSwipe('right');
      } else if (e.key === ' ' || e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        const currentPlace = getCurrentPlace();
        if (currentPlace) {
          setSelectedPlace(currentPlace);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [view, selectedPlace, places, currentIndex, handleSwipe, getCurrentPlace]);

  // Helper functions
  const openInMaps = (place) => {
    const url = `https://www.google.com/maps?q=${place.lat},${place.lon}`;
    window.open(url, '_blank');
  };

  const removeFavorite = (placeId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== placeId));
  };

  const toggleFavorite = (place) => {
    const isFavorited = favorites.find(fav => fav.id === place.id);
    if (isFavorited) {
      removeFavorite(place.id);
    } else {
      setFavorites(prev => [...prev, { ...place, addedAt: new Date().toISOString() }]);
    }
  };

  return (
    <div className="bars-container">
      <header className="bars-header">
        <h1>Places to Visit</h1>
        <p>Discover restaurants and cafes in Cluj-Napoca</p>
        
        <FilterSection 
          filter={filter}
          onFilterChange={setFilter}
        />
        
        <ViewToggle 
          view={view}
          onViewChange={setView}
          favoritesCount={favorites.length}
        />
      </header>
      
      <main className="bars-main">
        {view === 'discover' ? (
          <DiscoverView
            loading={loading}
            location={{ name: "Cluj-Napoca" }}
            currentPlace={getCurrentPlace()}
            places={places}
            currentIndex={currentIndex}
            onSwipe={handleSwipe}
            onSelectPlace={setSelectedPlace}
            onRefresh={fetchPlaces}
          />
        ) : (
          <FavoritesView
            favorites={favorites}
            onRemoveFavorite={removeFavorite}
            onSelectPlace={setSelectedPlace}
            onOpenMaps={openInMaps}
            onViewChange={setView}
          />
        )}
      </main>
      
      <PlaceModal
        selectedPlace={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onOpenMaps={openInMaps}
      />
      
      {view === 'discover' && <KeyboardShortcuts />}
    </div>
  );
};

export default Bars;