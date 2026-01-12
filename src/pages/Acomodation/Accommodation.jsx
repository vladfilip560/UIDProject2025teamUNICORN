import React, { useState, useEffect, useMemo } from 'react';
import './Accommodation.css';

// Simple Icons Components (Inline for portability)
const Icons = {
  MapPin: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
  Star: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  Logo: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
};

const listingsData = [
  {
    id: 2,
    title: "Zante Town Harbour Loft",
    type: "Entire Home",
    price: 120,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    features: ["Wifi", "AC", "Historic", "Kitchen"],
    description: "A modern renovated loft in the heart of Zante Town. Walk to Solomos Square and enjoy the local cafes and port."
  },
  {
    id: 3,
    title: "Laganas Beach Studio",
    type: "Private Room",
    price: 65,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    features: ["Wifi", "AC", "Near Nightlife"],
    description: "Budget-friendly studio just steps from the party strip and the sandy beach of Laganas. Perfect for young travelers."
  },
  {
    id: 4,
    title: "Vasilikos Stone Cottage",
    type: "Entire Home",
    price: 180,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
    features: ["Garden", "Kitchen", "Wifi", "Quiet"],
    description: "Traditional stone house surrounded by olive groves near Gerakas Beach. Ideal for nature lovers and turtle spotting."
  },
  {
    id: 5,
    title: "Keri Lighthouse Suite",
    type: "Private Room",
    price: 110,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
    features: ["View", "Wifi", "Romantic"],
    description: "Wake up to the best view in the Ionian Sea. A secluded room near the Keri Lighthouse, famous for its dramatic cliffs."
  },
  {
    id: 7,
    title: "Tsilivi Family Resort",
    type: "Entire Home",
    price: 240,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    features: ["Pool", "Gym", "Kitchen", "Wifi"],
    description: "Spacious condo in a resort complex in Tsilivi. Great for families, with access to a shared large pool and kids area."
  },
  {
    id: 9,
    title: "Marathonisi View Room",
    type: "Private Room",
    price: 85,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
    features: ["Balcony", "Wifi", "AC"],
    description: "A cozy room in Keri Lake with a direct view of Turtle Island (Marathonisi). Rent a boat right across the street."
  },
  {
    id: 10,
    title: "Agrotourism Olive Farm",
    type: "Entire Home",
    price: 150,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=800&q=80",
    features: ["Farm", "Kitchen", "Wifi", "Garden"],
    description: "Stay in the center of the island surrounded by ancient olive trees. Includes fresh organic breakfast from the farm."
  },
  {
    id: 11,
    title: "Alykes Beachfront House",
    type: "Entire Home",
    price: 210,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
    features: ["Beachfront", "Wifi", "Kitchen", "AC"],
    description: "Step off your patio onto the soft white sand of Alykes beach. calm shallow waters perfect for swimming."
  },
  {
    id: 12,
    title: "Porto Limnionas Hideaway",
    type: "Private Room",
    price: 95,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    features: ["Secluded", "Wifi", "View"],
    description: "A hidden gem on the wild west coast. stunning rocky cove views and excellent snorkeling nearby."
  },
  {
    id: 13,
    title: "Cameo Island Bridge Apt",
    type: "Entire Home",
    price: 175,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    features: ["Pool", "Wifi", "Kitchen", "Near Beach"],
    description: "Located in Agios Sostis, offering a direct view of the famous wooden bridge to Cameo Island."
  },
  {
    id: 14,
    title: "Xigia Sulphur Spa Villa",
    type: "Entire Home",
    price: 290,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    features: ["Spa", "Pool", "Wifi", "Kitchen"],
    description: "Relax near the natural sulphur springs of Xigia. This villa focuses on wellness and health with a private spa tub."
  },
  {
    id: 15,
    title: "Argassi Hillside Studio",
    type: "Private Room",
    price: 70,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
    features: ["Wifi", "Pool Access", "AC"],
    description: "A compact studio on the hill of Argassi. Great base for exploring both the town and the Vasilikos peninsula."
  }
];

const Accommodation = () => {
  const [selectedId, setSelectedId] = useState(1);
  const [priceRange, setPriceRange] = useState('all');
  const [selectedTypes, setSelectedTypes] = useState(new Set(["Entire Home", "Private Room"]));
  const [selectedAmenities, setSelectedAmenities] = useState(new Set());

  const handleTypeChange = (type) => {
    const next = new Set(selectedTypes);
    next.has(type) ? next.delete(type) : next.add(type);
    setSelectedTypes(next);
  };

  const handleAmenityChange = (amenity) => {
    const next = new Set(selectedAmenities);
    next.has(amenity) ? next.delete(amenity) : next.add(amenity);
    setSelectedAmenities(next);
  };

  // useMemo ensures this only recalculates when dependencies change
  const filteredListings = useMemo(() => {
    return listingsData.filter(item => {
      if (selectedTypes.size && !selectedTypes.has(item.type)) return false;
      if (priceRange === '0-100' && item.price > 100) return false;
      if (priceRange === '100-300' && (item.price < 100 || item.price > 300)) return false;
      if (priceRange === '300+' && item.price < 300) return false;
      if (selectedAmenities.size) {
        return [...selectedAmenities].every(a => item.features.includes(a));
      }
      return true;
    });
  }, [priceRange, selectedTypes, selectedAmenities]);

  const selectedHotel = listingsData.find(h => h.id === selectedId);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">

        {/* LEFT SIDEBAR: FILTERS */}
        <aside className="sidebar-left">
          <h2 className="logo"><Icons.Logo /> TripMate</h2>

          <div className="control-section">
            <h3>Destination</h3>
            <div className="destination-tag">
              <Icons.MapPin /> Zakynthos, Greece
            </div>
          </div>

          <div className="control-section">
            <h3>Property Type</h3>
            <div className="checkbox-group">
              {["Entire Home", "Private Room"].map(type => (
                <label key={type}>
                  <input 
                    type="checkbox" 
                    checked={selectedTypes.has(type)}
                    onChange={() => handleTypeChange(type)} 
                  />
                  {type}
                </label>
              ))}
            </div>
            
            <div className="divider" />
            
            <h3>Amenities</h3>
            <div className="checkbox-group">
              {["Wifi", "Kitchen", "Pool", "Gym"].map(amenity => (
                <label key={amenity}>
                  <input 
                    type="checkbox" 
                    checked={selectedAmenities.has(amenity)}
                    onChange={() => handleAmenityChange(amenity)} 
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <div className="control-section">
            <h3>Price Range</h3>
            <div className="radio-group">
              {[
                { label: 'Show All', val: 'all' },
                { label: 'Under $100', val: '0-100' },
                { label: '$100 - $300', val: '100-300' },
                { label: 'Over $300', val: '300+' }
              ].map(opt => (
                <label key={opt.val}>
                  <input 
                    type="radio" 
                    name="price"
                    checked={priceRange === opt.val}
                    onChange={() => setPriceRange(opt.val)} 
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* CENTER: LISTINGS */}
        <main className="main-content">
          <header className="list-header">
            <h2>Available Stays</h2>
            <span className="count">{filteredListings.length} results</span>
          </header>

          <div className="hotel-list">
            {filteredListings.length > 0 ? (
              filteredListings.map(item => (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  className={`hotel-card-row ${item.id === selectedId ? 'active' : ''}`}
                  onClick={() => setSelectedId(item.id)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedId(item.id)}
                >
                  <img src={item.image} className="thumb" alt={item.title} />
                  <div className="hotel-info">
                    <h4>{item.title}</h4>
                    <div className="meta">
                      <span className="star"><Icons.Star /> {item.rating}</span>
                      <span className="price">${item.price}<small>/night</small></span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No stays match your current filters.</p>
                <button 
                  className="book-btn" 
                  style={{padding: '8px 16px', marginTop: '10px', fontSize: '14px'}}
                  onClick={() => {
                    setPriceRange('all');
                    setSelectedAmenities(new Set());
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </main>

        {/* RIGHT SIDEBAR: DETAILS */}
        <aside className="sidebar-right">
          {selectedHotel ? (
            <>
              <div className="detail-header">
                <img src={selectedHotel.image} className="main-image" alt={selectedHotel.title} />
                <span className="tag-badge">{selectedHotel.type}</span>
              </div>
              
              <h2 className="detail-title">{selectedHotel.title}</h2>
              <p className="detail-desc">{selectedHotel.description}</p>

              <div className="control-section">
                <h3>Highlights</h3>
                <div className="amenities-grid">
                  {selectedHotel.features.map((f, i) => (
                    <div key={i} className="amenity-item">
                      <Icons.Check /> {f}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #e2e8f0'}}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'15px'}}>
                   <span style={{fontWeight:'700', fontSize:'20px'}}>${selectedHotel.price}</span>
                   <span style={{color:'#64748b'}}>Total for 4 nights: <b>${selectedHotel.price * 4}</b></span>
                </div>
                <button className="book-btn">Book This Stay</button>
              </div>
            </>
          ) : (
            <p className="empty-state">Select a property to view details.</p>
          )}
        </aside>

      </div>
    </div>
  );
};

export default Accommodation;