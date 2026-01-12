import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Shared Components
import Navbar from './components/Navbar';

// Import Pages
import Home from './pages/Home/Home';
import Bars from './pages/BarsTinder/Bars';
import Acomodation from './pages/Acomodation/Accommodation';
import Activities from './pages/Activities/Activities';
import Transport from './pages/Transport/Transport';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar is outside Routes so it appears on every page */}
        <Navbar />

        {/* This section changes based on the URL */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/BarsTinder" element={<Bars />} />
          <Route path="/Acomodation" element={<Acomodation />} />
          <Route path="/Activities" element={<Activities />} />
          <Route path="/Transport" element={<Transport />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;