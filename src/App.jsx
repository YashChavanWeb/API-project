import React, { useState } from 'react';
import './App.css';
import ProfileFinder from './components/ProfileFinder';
import PixabayImageSearch from './components/PixabayImageSearch';

function App() {
  const [showProfileFinder, setShowProfileFinder] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);

  const toggleProfileFinder = () => {
    setShowProfileFinder(!showProfileFinder);
    setShowImageSearch(false); // Hide image search when profile finder is shown
  };

  const toggleImageSearch = () => {
    setShowImageSearch(!showImageSearch);
    setShowProfileFinder(false); // Hide profile finder when image search is shown
  };

  return (
    <div className="App">
      <div>
        <button onClick={toggleProfileFinder}>
          {showProfileFinder ? "Hide Profile Finder" : "Show Profile Finder"}
        </button>
        <button onClick={toggleImageSearch}>
          {showImageSearch ? "Hide Image Search" : "Show Image Search"}
        </button>
      </div>
      {showProfileFinder && <ProfileFinder />}
      {showImageSearch && <PixabayImageSearch />}
    </div>
  );
}

export default App;
