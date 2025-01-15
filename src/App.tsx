import React, { useState } from 'react';
import './App.css';
import Header from './components/header.tsx';  // Adjusted import to match file naming
import Filter from './components/fitler.tsx';  // Adjusted import to match file naming
import Wall from './components/wall.tsx';  // Adjusted import to match file naming

function App() {
  // State to manage the active filter (Featured or Goku)
  const [activeFilter, setActiveFilter] = useState('Featured'); // Default to 'Featured'

  return (
    <>
      <Header />
      {/* Pass setActiveFilter to Filter component and activeFilter to Wall */}
      <Filter setActiveFilter={setActiveFilter} />
      <Wall activeFilter={activeFilter} />
    </>
  );
}

export default App;
