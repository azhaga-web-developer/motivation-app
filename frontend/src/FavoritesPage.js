// src/FavoritesPage.js
import React from 'react';
import VideoCard from './VideoCard';

function FavoritesPage({ favorites, onFavoriteToggle }) {
  return (
    <div>
      <h2>⭐ Your Favorite Videos</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet. Go add some!</p>
      ) : (
        <div className="video-grid">
          {favorites.map((video) => (
            <VideoCard
              key={video.id.videoId}
              video={video}
              isFavorite={true}
              onFavoriteToggle={onFavoriteToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;