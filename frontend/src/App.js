// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VideoCard from './VideoCard';
import FavoritesPage from './FavoritesPage';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    fetch('https://motivation-app-2.onrender.com/api/youtube')
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error('Error fetching videos:', err));
  }, []);

  const handleFavoriteToggle = (video) => {
    const isFav = favorites.find((fav) => fav.id.videoId === video.id.videoId);
    if (isFav) {
      setFavorites(favorites.filter((fav) => fav.id.videoId !== video.id.videoId));
    } else {
      setFavorites([...favorites, video]);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredVideos = videos.filter((video) => {
    if (filter === 'All') return true;
    const title = video.snippet.title.toLowerCase();
    return title.includes(filter.toLowerCase());
  });

  return (
    <Router>
      <div className="App">
        <h1>🔥 Daily Motivation</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/favorites">Favorites ({favorites.length})</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <select onChange={handleFilterChange}>
                  <option value="All">All</option>
                  <option value="Confidence">Confidence</option>
                  <option value="Focus">Focus</option>
                  <option value="Fitness">Fitness</option>
                </select>

                <div className="video-grid">
                  {filteredVideos.map((video) => (
                    <VideoCard
                      key={video.id.videoId}
                      video={video}
                      isFavorite={favorites.some((fav) => fav.id.videoId === video.id.videoId)}
                      onFavoriteToggle={handleFavoriteToggle}
                    />
                  ))}
                </div>
              </>
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                onFavoriteToggle={handleFavoriteToggle}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;