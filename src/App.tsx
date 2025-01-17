import React, { useState } from 'react';
import './App.css';
import Header from './components/header.tsx';
import Filter from './components/fitler.tsx';
import Wall from './components/wall.tsx';

function App() {
  const [activeFilter, setActiveFilter] = useState('Featured'); // Default filter
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <Filter setActiveFilter={setActiveFilter} />
      <Wall activeFilter={activeFilter} searchQuery={searchQuery} />
    </>
  );
}

export default App;
