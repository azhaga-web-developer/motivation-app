import React from 'react';


function VideoCard({ video, isFavorite, onFavoriteToggle }) {
  const { title } = video.snippet;
  const videoId = video.id.videoId;

  return (
    <div className="video-card">
      <h3>{title}</h3>
      <iframe
        width="300"
        height="200"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allowFullScreen
        title={title}
      ></iframe>
      <button onClick={() => onFavoriteToggle(video)}>
        {isFavorite ? '💔 Remove Favorite' : '❤️ Add to Favorites'}
      </button>
    </div>
  );
}

export default VideoCard;