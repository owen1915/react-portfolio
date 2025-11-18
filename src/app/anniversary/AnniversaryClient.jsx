"use client";
import { useState, useRef, useEffect } from "react";
import Carousel from "./Carousel";

function VideoThumbnail({ url, onClick }) {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { rootMargin: "100px" }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={videoRef}
      className="video-item"
      onClick={onClick}
    >
      {isVisible ? (
        <>
          <video src={url} playsInline preload="metadata" />
          <div className="play-overlay">▶</div>
        </>
      ) : (
        <div className="video-placeholder"></div>
      )}
    </div>
  );
}

export default function AnniversaryClient({ photos, videos }) {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);

  const goToPrevVideo = () => {
    setSelectedVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const goToNextVideo = () => {
    setSelectedVideoIndex((prev) => (prev + 1) % videos.length);
  };

  return (
    <main className="anniversary">
      <h1>❤️ Happy Anniversary Sara ❤️</h1>
      <Carousel items={photos} />
      <h2 className="video-title">a small amount of our amazing memories</h2>
      
      {selectedVideoIndex !== null && (
        <div className="video-player-wrapper">
          <button 
            className="close-player" 
            onClick={() => setSelectedVideoIndex(null)}
          >
            ✕
          </button>
          
          <button 
            className="nav-btn video" 
            onClick={goToPrevVideo}
          >
            ‹
          </button>
          
          <div className="video-player">
            <video 
              src={videos[selectedVideoIndex]} 
              controls 
              autoPlay 
              playsInline
              key={videos[selectedVideoIndex]}
            />
          </div>
          
          <button 
            className="nav-btn video" 
            onClick={goToNextVideo}
          >
            ›
          </button>
        </div>
      )}
      
      <div className="video-grid">
        {videos.map((url, i) => (
          <VideoThumbnail
            key={i}
            url={url}
            onClick={() => setSelectedVideoIndex(i)}
          />
        ))}
      </div>
      <div className="message-box">
        {"To more memories :)"}
      </div>
    </main>
  );
}