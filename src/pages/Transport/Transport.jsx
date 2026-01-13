import React, { useState } from 'react';
import './transport.css';

const Transport = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedMode, setSelectedMode] = useState('driving');
  const [routes, setRoutes] = useState([]);
  const [compareMode, setCompareMode] = useState(false);
  const [modesToCompare, setModesToCompare] = useState([]);

  
  const locations = [
    { value: 'airport', label: 'Airport', icon: '✈️' },
    { value: 'city-center', label: 'City Center', icon: '🏙️' },
    { value: 'beach', label: 'Beach', icon: '🏖️' },
    { value: 'museum', label: 'Museum District', icon: '🏛️' },
    { value: 'shopping-mall', label: 'Shopping Mall', icon: '🛍️' },
    { value: 'train-station', label: 'Train Station', icon: '🚂' }
  ];

  
  const transportModes = [
    { id: 'driving', name: 'Car', icon: '🚗', color: '#0B5ED7' },
    { id: 'transit', name: 'Public Transport', icon: '🚌', color: '#10B981' },
    { id: 'walking', name: 'Walking', icon: '🚶', color: '#F59E0B' },
    { id: 'cycling', name: 'Cycling', icon: '🚴', color: '#8B5CF6' }
  ];

  
  const routeData = {
    'airport-beach': {
      driving: [
        { id: 1, name: 'Fastest Route', distance: '18.5 km', duration: '19 min', cost: '€3.33', tolls: false },
        { id: 2, name: 'Scenic Route', distance: '21.3 km', duration: '26 min', cost: '€3.83', tolls: false },
        { id: 3, name: 'Highway Route', distance: '20.0 km', duration: '20 min', cost: '€6.10', tolls: true }
      ],
      transit: [
        { id: 1, name: 'Direct Bus', distance: '18.5 km', duration: '40 min', cost: '€1.50', transfers: 0 },
        { id: 2, name: 'Bus + Metro', distance: '19.4 km', duration: '33 min', cost: '€2.00', transfers: 1 },
        { id: 3, name: 'Express Line', distance: '18.9 km', duration: '36 min', cost: '€1.80', transfers: 0 }
      ],
      walking: [
        { id: 1, name: 'Shortest Path', distance: '17.6 km', duration: '3h 31min', cost: 'Free' },
        { id: 2, name: 'Coastal Path', distance: '20.4 km', duration: '4h 5min', cost: 'Free' }
      ],
      cycling: [
        { id: 1, name: 'Bike Lane Route', distance: '18.5 km', duration: '40 min', cost: 'Free', elevation: 'Low' },
        { id: 2, name: 'Scenic Bike Path', distance: '20.7 km', duration: '46 min', cost: 'Free', elevation: 'Moderate' }
      ]
    },
    'airport-city-center': {
      driving: [
        { id: 1, name: 'Fastest Route', distance: '12.3 km', duration: '13 min', cost: '€2.21', tolls: false },
        { id: 2, name: 'Scenic Route', distance: '14.1 km', duration: '16 min', cost: '€2.54', tolls: false },
        { id: 3, name: 'Highway Route', distance: '13.3 km', duration: '14 min', cost: '€4.89', tolls: true }
      ],
      transit: [
        { id: 1, name: 'Direct Bus', distance: '12.3 km', duration: '27 min', cost: '€1.50', transfers: 0 },
        { id: 2, name: 'Bus + Metro', distance: '12.9 km', duration: '23 min', cost: '€2.00', transfers: 1 },
        { id: 3, name: 'Express Line', distance: '12.5 km', duration: '25 min', cost: '€1.80', transfers: 0 }
      ],
      walking: [
        { id: 1, name: 'Shortest Path', distance: '11.7 km', duration: '2h 20min', cost: 'Free' },
        { id: 2, name: 'Coastal Path', distance: '13.5 km', duration: '2h 42min', cost: 'Free' }
      ],
      cycling: [
        { id: 1, name: 'Bike Lane Route', distance: '12.3 km', duration: '27 min', cost: 'Free', elevation: 'Low' },
        { id: 2, name: 'Scenic Bike Path', distance: '13.8 km', duration: '32 min', cost: 'Free', elevation: 'Moderate' }
      ]
    },
    'airport-museum': {
      driving: [
        { id: 1, name: 'Fastest Route', distance: '14.7 km', duration: '15 min', cost: '€2.65', tolls: false },
        { id: 2, name: 'Scenic Route', distance: '16.9 km', duration: '20 min', cost: '€3.04', tolls: false },
        { id: 3, name: 'Highway Route', distance: '15.9 km', duration: '16 min', cost: '€5.36', tolls: true }
      ],
      transit: [
        { id: 1, name: 'Direct Bus', distance: '14.7 km', duration: '32 min', cost: '€1.50', transfers: 0 },
        { id: 2, name: 'Bus + Metro', distance: '15.4 km', duration: '27 min', cost: '€2.00', transfers: 1 },
        { id: 3, name: 'Express Line', distance: '15.0 km', duration: '30 min', cost: '€1.80', transfers: 0 }
      ],
      walking: [
        { id: 1, name: 'Shortest Path', distance: '14.0 km', duration: '2h 48min', cost: 'Free' },
        { id: 2, name: 'Coastal Path', distance: '16.2 km', duration: '3h 14min', cost: 'Free' }
      ],
      cycling: [
        { id: 1, name: 'Bike Lane Route', distance: '14.7 km', duration: '32 min', cost: 'Free', elevation: 'Low' },
        { id: 2, name: 'Scenic Bike Path', distance: '16.5 km', duration: '37 min', cost: 'Free', elevation: 'Moderate' }
      ]
    },
    'airport-shopping-mall': {
      driving: [
        { id: 1, name: 'Fastest Route', distance: '16.2 km', duration: '17 min', cost: '€2.92', tolls: false },
        { id: 2, name: 'Scenic Route', distance: '18.6 km', duration: '22 min', cost: '€3.35', tolls: false },
        { id: 3, name: 'Highway Route', distance: '17.5 km', duration: '18 min', cost: '€5.65', tolls: true }
      ],
      transit: [
        { id: 1, name: 'Direct Bus', distance: '16.2 km', duration: '36 min', cost: '€1.50', transfers: 0 },
        { id: 2, name: 'Bus + Metro', distance: '17.0 km', duration: '30 min', cost: '€2.00', transfers: 1 },
        { id: 3, name: 'Express Line', distance: '16.5 km', duration: '33 min', cost: '€1.80', transfers: 0 }
      ],
      walking: [
        { id: 1, name: 'Shortest Path', distance: '15.4 km', duration: '3h 5min', cost: 'Free' },
        { id: 2, name: 'Coastal Path', distance: '17.8 km', duration: '3h 34min', cost: 'Free' }
      ],
      cycling: [
        { id: 1, name: 'Bike Lane Route', distance: '16.2 km', duration: '36 min', cost: 'Free', elevation: 'Low' },
        { id: 2, name: 'Scenic Bike Path', distance: '18.1 km', duration: '41 min', cost: 'Free', elevation: 'Moderate' }
      ]
    },
    'airport-train-station': {
      driving: [
        { id: 1, name: 'Fastest Route', distance: '8.9 km', duration: '9 min', cost: '€1.60', tolls: false },
        { id: 2, name: 'Scenic Route', distance: '10.2 km', duration: '13 min', cost: '€1.84', tolls: false },
        { id: 3, name: 'Highway Route', distance: '9.6 km', duration: '10 min', cost: '€4.23', tolls: true }
      ],
      transit: [
        { id: 1, name: 'Direct Bus', distance: '8.9 km', duration: '20 min', cost: '€1.50', transfers: 0 },
        { id: 2, name: 'Bus + Metro', distance: '9.3 km', duration: '17 min', cost: '€2.00', transfers: 1 },
        { id: 3, name: 'Express Line', distance: '9.1 km', duration: '18 min', cost: '€1.80', transfers: 0 }
      ],
      walking: [
        { id: 1, name: 'Shortest Path', distance: '8.5 km', duration: '1h 42min', cost: 'Free' },
        { id: 2, name: 'Coastal Path', distance: '9.8 km', duration: '1h 58min', cost: 'Free' }
      ],
      cycling: [
        { id: 1, name: 'Bike Lane Route', distance: '8.9 km', duration: '20 min', cost: 'Free', elevation: 'Low' },
        { id: 2, name: 'Scenic Bike Path', distance: '10.0 km', duration: '23 min', cost: 'Free', elevation: 'Moderate' }
      ]
    },
    'beach-city-center': {
      driving: [
        { id: 1, name: 'Fastest Route', distance: '6.8 km', duration: '9 min', cost: '€1.22', tolls: false },
        { id: 2, name: 'Scenic Route', distance: '7.8 km', duration: '12 min', cost: '€1.40', tolls: false },
        { id: 3, name: 'Highway Route', distance: '7.3 km', duration: '9 min', cost: '€3.81', tolls: true }
      ],
      transit: [
        { id: 1, name: 'Direct Bus', distance: '6.8 km', duration: '18 min', cost: '€1.50', transfers: 0 },
        { id: 2, name: 'Bus + Metro', distance: '7.1 km', duration: '15 min', cost: '€2.00', transfers: 1 },
        { id: 3, name: 'Express Line', distance: '6.9 km', duration: '17 min', cost: '€1.80', transfers: 0 }
      ],
      walking: [
        { id: 1, name: 'Shortest Path', distance: '6.5 km', duration: '1h 18min', cost: 'Free' },
        { id: 2, name: 'Coastal Path', distance: '7.5 km', duration: '1h 30min', cost: 'Free' }
      ],
      cycling: [
        { id: 1, name: 'Bike Lane Route', distance: '6.8 km', duration: '18 min', cost: 'Free', elevation: 'Low' },
        { id: 2, name: 'Scenic Bike Path', distance: '7.6 km', duration: '21 min', cost: 'Free', elevation: 'Moderate' }
      ]
    },
    'beach-museum': {
      driving: [
        { id: 1, name: 'Fastest Route', distance: '9.2 km', duration: '10 min', cost: '€1.66', tolls: false },
        { id: 2, name: 'Scenic Route', distance: '10.6 km', duration: '14 min', cost: '€1.91', tolls: false },
        { id: 3, name: 'Highway Route', distance: '9.9 km', duration: '11 min', cost: '€4.28', tolls: true }
      ],
      transit: [
        { id: 1, name: 'Direct Bus', distance: '9.2 km', duration: '22 min', cost: '€1.50', transfers: 0 },
        { id: 2, name: 'Bus + Metro', distance: '9.7 km', duration: '18 min', cost: '€2.00', transfers: 1 },
        { id: 3, name: 'Express Line', distance: '9.4 km', duration: '20 min', cost: '€1.80', transfers: 0 }
      ],
      walking: [
        { id: 1, name: 'Shortest Path', distance: '8.7 km', duration: '1h 44min', cost: 'Free' },
        { id: 2, name: 'Coastal Path', distance: '10.1 km', duration: '2h 1min', cost: 'Free' }
      ],
      cycling: [
        { id: 1, name: 'Bike Lane Route', distance: '9.2 km', duration: '22 min', cost: 'Free', elevation: 'Low' },
        { id: 2, name: 'Scenic Bike Path', distance: '10.3 km', duration: '25 min', cost: 'Free', elevation: 'Moderate' }
      ]
    },
    'beach-shopping-mall': {
      driving: [
        { id: 1, name: 'Fastest Route', distance: '11.5 km', duration: '12 min', cost: '€2.07', tolls: false },
        { id: 2, name: 'Scenic Route', distance: '13.2 km', duration: '17 min', cost: '€2.38', tolls: false },
        { id: 3, name: 'Highway Route', distance: '12.4 km', duration: '13 min', cost: '€4.73', tolls: true }
      ],
      transit: [
        { id: 1, name: 'Direct Bus', distance: '11.5 km', duration: '25 min', cost: '€1.50', transfers: 0 },
        { id: 2, name: 'Bus + Metro', distance: '12.1 km', duration: '21 min', cost: '€2.00', transfers: 1 },
        { id: 3, name: 'Express Line', distance: '11.7 km', duration: '23 min', cost: '€1.80', transfers: 0 }
      ],
      walking: [
        { id: 1, name: 'Shortest Path', distance: '10.9 km', duration: '2h 11min', cost: 'Free' },
        { id: 2, name: 'Coastal Path', distance: '12.7 km', duration: '2h 32min', cost: 'Free' }
      ],
      cycling: [
        { id: 1, name: 'Bike Lane Route', distance: '11.5 km', duration: '25 min', cost: 'Free', elevation: 'Low' },
        { id: 2, name: 'Scenic Bike Path', distance: '12.9 km', duration: '29 min', cost: 'Free', elevation: 'Moderate' }
      ]
    },
    'beach-train-station': {
      driving: [
        { id: 1, name: 'Fastest Route', distance: '15.3 km', duration: '16 min', cost: '€2.75', tolls: false },
        { id: 2, name: 'Scenic Route', distance: '17.6 km', duration: '21 min', cost: '€3.17', tolls: false },
        { id: 3, name: 'Highway Route', distance: '16.5 km', duration: '17 min', cost: '€5.47', tolls: true }
      ],
      transit: [
        { id: 1, name: 'Direct Bus', distance: '15.3 km', duration: '34 min', cost: '€1.50', transfers: 0 },
        { id: 2, name: 'Bus + Metro', distance: '16.1 km', duration: '29 min', cost: '€2.00', transfers: 1 },
        { id: 3, name: 'Express Line', distance: '15.6 km', duration: '32 min', cost: '€1.80', transfers: 0 }
      ],
      walking: [
        { id: 1, name: 'Shortest Path', distance: '14.5 km', duration: '2h 54min', cost: 'Free' },
        { id: 2, name: 'Coastal Path', distance: '16.8 km', duration: '3h 22min', cost: 'Free' }
      ],
      cycling: [
        { id: 1, name: 'Bike Lane Route', distance: '15.3 km', duration: '34 min', cost: 'Free', elevation: 'Low' },
        { id: 2, name: 'Scenic Bike Path', distance: '17.1 km', duration: '39 min', cost: 'Free', elevation: 'Moderate' }
      ]
    },
    'city-center-museum': {
      driving: [
        { id: 1, name: 'Fastest Route', distance: '3.5 km', duration: '7 min', cost: '€0.63', tolls: false },
        { id: 2, name: 'Scenic Route', distance: '4.0 km', duration: '10 min', cost: '€0.72', tolls: false },
        { id: 3, name: 'Highway Route', distance: '3.8 km', duration: '7 min', cost: '€3.18', tolls: true }
      ],
      transit: [
        { id: 1, name: 'Direct Bus', distance: '3.5 km', duration: '14 min', cost: '€1.50', transfers: 0 },
        { id: 2, name: 'Bus + Metro', distance: '3.7 km', duration: '12 min', cost: '€2.00', transfers: 1 },
        { id: 3, name: 'Express Line', distance: '3.6 km', duration: '13 min', cost: '€1.80', transfers: 0 }
      ],
      walking: [
        { id: 1, name: 'Shortest Path', distance: '3.3 km', duration: '40 min', cost: 'Free' },
        { id: 2, name: 'Coastal Path', distance: '3.9 km', duration: '47 min', cost: 'Free' }
      ],
      cycling: [
        { id: 1, name: 'Bike Lane Route', distance: '3.5 km', duration: '14 min', cost: 'Free', elevation: 'Low' },
        { id: 2, name: 'Scenic Bike Path', distance: '3.9 km', duration: '16 min', cost: 'Free', elevation: 'Moderate' }
      ]
    },
    'city-center-shopping-mall': {
      driving: [
        { id: 1, name: 'Fastest Route', distance: '5.2 km', duration: '8 min', cost: '€0.94', tolls: false },
        { id: 2, name: 'Scenic Route', distance: '6.0 km', duration: '11 min', cost: '€1.08', tolls: false },
        { id: 3, name: 'Highway Route', distance: '5.6 km', duration: '8 min', cost: '€3.51', tolls: true }
      ],
      transit: [
        { id: 1, name: 'Direct Bus', distance: '5.2 km', duration: '16 min', cost: '€1.50', transfers: 0 },
        { id: 2, name: 'Bus + Metro', distance: '5.5 km', duration: '14 min', cost: '€2.00', transfers: 1 },
        { id: 3, name: 'Express Line', distance: '5.3 km', duration: '15 min', cost: '€1.80', transfers: 0 }
      ],
      walking: [
        { id: 1, name: 'Shortest Path', distance: '4.9 km', duration: '59 min', cost: 'Free' },
        { id: 2, name: 'Coastal Path', distance: '5.7 km', duration: '1h 8min', cost: 'Free' }
      ],
      cycling: [
        { id: 1, name: 'Bike Lane Route', distance: '5.2 km', duration: '16 min', cost: 'Free', elevation: 'Low' },
        { id: 2, name: 'Scenic Bike Path', distance: '5.8 km', duration: '18 min', cost: 'Free', elevation: 'Moderate' }
      ]
    },
    'city-center-train-station': {
      driving: [
        { id: 1, name: 'Fastest Route', distance: '4.8 km', duration: '6 min', cost: '€0.86', tolls: false },
        { id: 2, name: 'Scenic Route', distance: '5.5 km', duration: '8 min', cost: '€0.99', tolls: false },
        { id: 3, name: 'Highway Route', distance: '5.2 km', duration: '6 min', cost: '€3.44', tolls: true }
      ],
      transit: [
        { id: 1, name: 'Direct Bus', distance: '4.8 km', duration: '13 min', cost: '€1.50', transfers: 0 },
        { id: 2, name: 'Bus + Metro', distance: '5.0 km', duration: '11 min', cost: '€2.00', transfers: 1 },
        { id: 3, name: 'Express Line', distance: '4.9 km', duration: '12 min', cost: '€1.80', transfers: 0 }
      ],
      walking: [
        { id: 1, name: 'Shortest Path', distance: '4.6 km', duration: '55 min', cost: 'Free' },
        { id: 2, name: 'Coastal Path', distance: '5.3 km', duration: '1h 4min', cost: 'Free' }
      ],
      cycling: [
        { id: 1, name: 'Bike Lane Route', distance: '4.8 km', duration: '13 min', cost: 'Free', elevation: 'Low' },
        { id: 2, name: 'Scenic Bike Path', distance: '5.4 km', duration: '15 min', cost: 'Free', elevation: 'Moderate' }
      ]
    },
    'museum-shopping-mall': {
      driving: [
        { id: 1, name: 'Fastest Route', distance: '4.1 km', duration: '6 min', cost: '€0.74', tolls: false },
        { id: 2, name: 'Scenic Route', distance: '4.7 km', duration: '8 min', cost: '€0.85', tolls: false },
        { id: 3, name: 'Highway Route', distance: '4.4 km', duration: '6 min', cost: '€3.29', tolls: true }
      ],
      transit: [
        { id: 1, name: 'Direct Bus', distance: '4.1 km', duration: '13 min', cost: '€1.50', transfers: 0 },
        { id: 2, name: 'Bus + Metro', distance: '4.3 km', duration: '11 min', cost: '€2.00', transfers: 1 },
        { id: 3, name: 'Express Line', distance: '4.2 km', duration: '12 min', cost: '€1.80', transfers: 0 }
      ],
      walking: [
        { id: 1, name: 'Shortest Path', distance: '3.9 km', duration: '47 min', cost: 'Free' },
        { id: 2, name: 'Coastal Path', distance: '4.5 km', duration: '54 min', cost: 'Free' }
      ],
      cycling: [
        { id: 1, name: 'Bike Lane Route', distance: '4.1 km', duration: '13 min', cost: 'Free', elevation: 'Low' },
        { id: 2, name: 'Scenic Bike Path', distance: '4.6 km', duration: '15 min', cost: 'Free', elevation: 'Moderate' }
      ]
    },
    'museum-train-station': {
      driving: [
        { id: 1, name: 'Fastest Route', distance: '7.9 km', duration: '10 min', cost: '€1.42', tolls: false },
        { id: 2, name: 'Scenic Route', distance: '9.1 km', duration: '13 min', cost: '€1.64', tolls: false },
        { id: 3, name: 'Highway Route', distance: '8.5 km', duration: '10 min', cost: '€4.03', tolls: true }
      ],
      transit: [
        { id: 1, name: 'Direct Bus', distance: '7.9 km', duration: '18 min', cost: '€1.50', transfers: 0 },
        { id: 2, name: 'Bus + Metro', distance: '8.3 km', duration: '17 min', cost: '€2.00', transfers: 1 },
        { id: 3, name: 'Express Line', distance: '8.1 km', duration: '18 min', cost: '€1.80', transfers: 0 }
      ],
      walking: [
        { id: 1, name: 'Shortest Path', distance: '7.5 km', duration: '1h 30min', cost: 'Free' },
        { id: 2, name: 'Coastal Path', distance: '8.7 km', duration: '1h 44min', cost: 'Free' }
      ],
      cycling: [
        { id: 1, name: 'Bike Lane Route', distance: '7.9 km', duration: '18 min', cost: 'Free', elevation: 'Low' },
        { id: 2, name: 'Scenic Bike Path', distance: '8.8 km', duration: '21 min', cost: 'Free', elevation: 'Moderate' }
      ]
    },
    'shopping-mall-train-station': {
      driving: [
        { id: 1, name: 'Fastest Route', distance: '6.3 km', duration: '8 min', cost: '€1.13', tolls: false },
        { id: 2, name: 'Scenic Route', distance: '7.2 km', duration: '10 min', cost: '€1.30', tolls: false },
        { id: 3, name: 'Highway Route', distance: '6.8 km', duration: '8 min', cost: '€3.72', tolls: true }
      ],
      transit: [
        { id: 1, name: 'Direct Bus', distance: '6.3 km', duration: '16 min', cost: '€1.50', transfers: 0 },
        { id: 2, name: 'Bus + Metro', distance: '6.6 km', duration: '14 min', cost: '€2.00', transfers: 1 },
        { id: 3, name: 'Express Line', distance: '6.4 km', duration: '15 min', cost: '€1.80', transfers: 0 }
      ],
      walking: [
        { id: 1, name: 'Shortest Path', distance: '6.0 km', duration: '1h 12min', cost: 'Free' },
        { id: 2, name: 'Coastal Path', distance: '6.9 km', duration: '1h 23min', cost: 'Free' }
      ],
      cycling: [
        { id: 1, name: 'Bike Lane Route', distance: '6.3 km', duration: '16 min', cost: 'Free', elevation: 'Low' },
        { id: 2, name: 'Scenic Bike Path', distance: '7.1 km', duration: '18 min', cost: 'Free', elevation: 'Moderate' }
      ]
    }
  };

  
  const getRoutes = (origin, destination, mode) => {
    const routeKey = `${origin}-${destination}`;
    const reverseKey = `${destination}-${origin}`;
    
    const routeSet = routeData[routeKey] || routeData[reverseKey];
    if (!routeSet || !routeSet[mode]) {
      return [];
    }
    return routeSet[mode];
  };

  const handleSearch = () => {
    if (origin && destination) {
      if (compareMode && modesToCompare.length > 0) {
        
        const allRoutes = [];
        modesToCompare.forEach(modeId => {
          const modeRoutes = getRoutes(origin, destination, modeId).map(route => ({
            ...route,
            mode: modeId,
            modeName: transportModes.find(m => m.id === modeId)?.name
          }));
          allRoutes.push(...modeRoutes);
        });
        setRoutes(allRoutes);
      } else {
        setRoutes(getRoutes(origin, destination, selectedMode));
      }
    }
  };

  const handleCompareToggle = () => {
    setCompareMode(!compareMode);
    if (!compareMode) {
      
      setModesToCompare([selectedMode]);
    } else {
      
      setModesToCompare([]);
      setRoutes([]);
    }
  };

  const handleModeToggle = (modeId) => {
    if (compareMode) {
      setModesToCompare(prev => {
        if (prev.includes(modeId)) {
          return prev.filter(id => id !== modeId);
        } else {
          return [...prev, modeId];
        }
      });
    } else {
      setSelectedMode(modeId);
    }
  };

  const getLocationLabel = (value) => {
    const location = locations.find(loc => loc.value === value);
    return location ? `${location.icon} ${location.label}` : value;
  };

  return (
    <div className="transport-page">
      <div className="spacer" />
      
      <div className="transport-layout">
        <aside className="left-panel">
          <h3 className="panel-heading">Route Planner</h3>
          
          <div className="panel-section">
            <strong>From</strong>
            <select
              className="route-select"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
              <option value="">Select origin...</option>
              {locations.map(loc => (
                <option key={loc.value} value={loc.value}>
                  {loc.icon} {loc.label}
                </option>
              ))}
            </select>
          </div>

          <div className="panel-section">
            <strong>To</strong>
            <select
              className="route-select"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="">Select destination...</option>
              {locations
                .filter(loc => loc.value !== origin)
                .map(loc => (
                  <option key={loc.value} value={loc.value}>
                    {loc.icon} {loc.label}
                  </option>
                ))}
            </select>
          </div>

          <div className="panel-section">
            <div className="compare-toggle">
              <label className="compare-checkbox">
                <input
                  type="checkbox"
                  checked={compareMode}
                  onChange={handleCompareToggle}
                />
                <span>Compare Modes</span>
              </label>
            </div>
            <strong>Transport Mode{compareMode && modesToCompare.length > 1 ? 's' : ''}</strong>
            <div className="mode-selector">
              {transportModes.map(mode => {
                const isSelected = compareMode 
                  ? modesToCompare.includes(mode.id)
                  : selectedMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    className={`mode-btn ${isSelected ? 'active' : ''} ${compareMode && modesToCompare.includes(mode.id) ? 'compare-selected' : ''}`}
                    onClick={() => handleModeToggle(mode.id)}
                    style={{ '--mode-color': mode.color }}
                  >
                    <span className="mode-icon">{mode.icon}</span>
                    <span className="mode-name">{mode.name}</span>
                    {compareMode && modesToCompare.includes(mode.id) && (
                      <span className="compare-check">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
            {compareMode && (
              <div className="compare-hint">
                Select 2 or more modes to compare
              </div>
            )}
          </div>

          <button 
            className="search-btn" 
            onClick={handleSearch} 
            disabled={!origin || !destination || (compareMode && modesToCompare.length < 2)}
          >
            {compareMode ? 'Compare Routes' : 'Find Routes'}
          </button>
        </aside>

        <main className="center-panel">
          <h2 className="panel-heading">
            {compareMode ? 'Route Comparison' : 'Available Routes'}
          </h2>

          {origin && destination && (
            <div className="route-info-header">
              <span className="route-path">
                {getLocationLabel(origin)} → {getLocationLabel(destination)}
              </span>
            </div>
          )}

          {routes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🗺️</div>
              <p>
                {compareMode 
                  ? 'Select 2 or more transport modes and click "Compare Routes"'
                  : 'Select your origin and destination to find routes'}
              </p>
            </div>
          ) : (
            <div className="routes-list">
              {compareMode ? (
              
                transportModes
                  .filter(mode => modesToCompare.includes(mode.id))
                  .map(mode => {
                    const modeRoutes = routes.filter(r => r.mode === mode.id);
                    if (modeRoutes.length === 0) return null;
                    return (
                      <div key={mode.id} className="compare-group">
                        <div className="compare-mode-header" style={{ '--mode-color': mode.color }}>
                          <span className="mode-icon">{mode.icon}</span>
                          <span className="mode-name">{mode.name}</span>
                        </div>
                        {modeRoutes.map(route => (
                          <div key={route.id} className="route-card compare-card">
                            <div className="route-header">
                              <div className="route-name">{route.name}</div>
                            </div>
                            
                            <div className="route-details">
                              <div className="detail-item">
                                <span className="detail-label">Distance:</span>
                                <span className="detail-value">{route.distance}</span>
                              </div>
                              <div className="detail-item">
                                <span className="detail-label">Duration:</span>
                                <span className="detail-value">{route.duration}</span>
                              </div>
                              <div className="detail-item">
                                <span className="detail-label">Cost:</span>
                                <span className="detail-value cost">{route.cost}</span>
                              </div>
                              {route.tolls !== undefined && (
                                <div className="detail-item">
                                  <span className="detail-label">Tolls:</span>
                                  <span className="detail-value">{route.tolls ? 'Yes' : 'No'}</span>
                                </div>
                              )}
                              {route.transfers !== undefined && (
                                <div className="detail-item">
                                  <span className="detail-label">Transfers:</span>
                                  <span className="detail-value">{route.transfers}</span>
                                </div>
                              )}
                              {route.elevation && (
                                <div className="detail-item">
                                  <span className="detail-label">Elevation:</span>
                                  <span className="detail-value">{route.elevation}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })
              ) : (
                
                routes.map(route => (
                  <div key={route.id} className="route-card">
                    <div className="route-header">
                      <div className="route-name">{route.name}</div>
                    </div>
                    
                    <div className="route-details">
                      <div className="detail-item">
                        <span className="detail-label">Distance:</span>
                        <span className="detail-value">{route.distance}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Duration:</span>
                        <span className="detail-value">{route.duration}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Cost:</span>
                        <span className="detail-value cost">{route.cost}</span>
                      </div>
                      {route.tolls !== undefined && (
                        <div className="detail-item">
                          <span className="detail-label">Tolls:</span>
                          <span className="detail-value">{route.tolls ? 'Yes' : 'No'}</span>
                        </div>
                      )}
                      {route.transfers !== undefined && (
                        <div className="detail-item">
                          <span className="detail-label">Transfers:</span>
                          <span className="detail-value">{route.transfers}</span>
                        </div>
                      )}
                      {route.elevation && (
                        <div className="detail-item">
                          <span className="detail-label">Elevation:</span>
                          <span className="detail-value">{route.elevation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Transport;
