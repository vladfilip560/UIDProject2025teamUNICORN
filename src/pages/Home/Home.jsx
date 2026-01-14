import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <span>🏝</span> TripMate
        </div>

        {/* Instead of disabled inputs, we use styled "cards" for a cleaner look */}
        <div className="sidebar-section">
          <label className="sidebar-label">Destination</label>
          <div className="sidebar-info-card">
            <span className="icon">📍</span> Zakynthos, Greece
          </div>
        </div>

        <div className="sidebar-section">
          <label className="sidebar-label">Time Period</label>
          <div className="sidebar-info-card">
            <span className="icon">📅</span> 5 Days • Oct 12-17
          </div>
        </div>

        <div className="sidebar-section">
          <label className="sidebar-label">Guests</label>
          <div className="sidebar-info-card">
            <span className="icon">👥</span> 2 Adults
          </div>
        </div>

        <Link to="/Acomodation" className="search-btn">
           Find Accomodations
        </Link>
      </aside>

      {/* Main content */}
      <main className="hero">
        <div className="hero-content">
          <h1>Discover your<br/>next escape</h1>
          <p>
            Experience the crystal clear waters and hidden caves of Zakynthos. 
            Curated stays and experiences, just for you.
          </p>

          <div className="hero-card">
            <div className="hero-stat">
               <span>🌊</span> 
               <span>Navagio Beach</span>
            </div>
            <div className="hero-stat">
               <span>☀️</span> 
               <span>24°C Sunny</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}