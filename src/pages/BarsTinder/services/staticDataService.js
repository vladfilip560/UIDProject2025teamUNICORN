import { allClujPlaces } from '../data/clujStaticData';

export class StaticDataService {
  static getPlaces(type = 'restaurant') {
    const places = allClujPlaces[type] || [];
    
    // Shuffle array to show different places each time
    const shuffled = [...places].sort(() => Math.random() - 0.5);
    
    console.log(`Loaded ${shuffled.length} ${type}s from Cluj-Napoca static data`);
    
    return shuffled.map(place => ({
      id: place.id,
      name: place.name,
      type: type,
      cuisine: place.cuisine,
      rating: place.rating,
      address: place.address,
      phone: place.phone,
      website: null,
      openingHours: place.openingHours,
      lat: place.lat,
      lon: place.lon,
      image: place.image,
      priceRange: place.priceRange,
      description: place.description,
      isStatic: true
    }));
  }
  
  static async fetchPlaces(location, filter) {
    // Simulate a small delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const places = this.getPlaces(filter);
    
    return {
      places: places,
      source: 'static_cluj_data'
    };
  }
}