"use client";
import { useState, useRef, useEffect } from "react";
import Carousel from "./Carousel";

function VideoThumbnail({ url, onClick }) {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setIsVisible(true);
        });
      },
      { rootMargin: "150px" }
    );

    if (videoRef.current) obs.observe(videoRef.current);

    return () => {
      if (videoRef.current) obs.unobserve(videoRef.current);
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
        <div className="video-placeholder" />
      )}
    </div>
  );
}

export default function AnniversaryClient({ photos, videos }) {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const playerRef = useRef(null);

  // ============================
  // FULL PRELOAD FIX (IMAGES + VIDEOS)
  // ============================
  useEffect(() => {
    const minLoad = new Promise(r => setTimeout(r, 1500));

    const imagePromises = photos.map(url => {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = url;
      });
    });

    const videoPromises = videos.map(url => {
      return new Promise(resolve => {
        const v = document.createElement("video");
        v.preload = "metadata";
        v.onloadedmetadata = resolve;
        v.onerror = resolve;
        v.src = url;
      });
    });

    Promise.all([minLoad, ...imagePromises, ...videoPromises])
      .then(() => setIsLoading(false));
  }, [photos, videos]);

  const goToPrevVideo = () => {
    setSelectedVideoIndex(prev => (prev - 1 + videos.length) % videos.length);
  };

  const goToNextVideo = () => {
    setSelectedVideoIndex(prev => (prev + 1) % videos.length);
  };

  const firstOpen = useRef(true);

    useEffect(() => {
    if (selectedVideoIndex !== null && firstOpen.current) {
        firstOpen.current = false;
        if (playerRef.current) {
        playerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
    }, [selectedVideoIndex]);

  const touchStartX = useRef(null);

  const handleTouchStart = e => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = e => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? goToNextVideo() : goToPrevVideo();
    }
    touchStartX.current = null;
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="heart-spinner">
            <span className="heart">❤️</span>
          </div>
          <h2>Loading memories...</h2>
        </div>
      </div>
    );
  }

  return (
    <main className="anniversary">
      <h1>❤️ Happy Anniversary Sara ❤️</h1>
      <Carousel items={photos} />

      <h2 className="video-title">a small amount of our amazing memories</h2>

      {selectedVideoIndex !== null && (
        <div
          ref={playerRef}
          className="video-player-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="close-player"
            onClick={() => setSelectedVideoIndex(null)}
          >
            ✕
          </button>

          <div className="video-player">
            <video
                src={videos[selectedVideoIndex]}
                controls
                autoPlay
                playsInline
                key={videos[selectedVideoIndex]}
                tabIndex="-1"
                autoFocus={false}
            />
          </div>

          <div className="video-nav-controls">
            <button className="nav-btn" onClick={goToPrevVideo}>
              ‹
            </button>
            <button className="nav-btn" onClick={goToNextVideo}>
              ›
            </button>
          </div>
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

      <div className="message-box">{"more to come"}</div>
    </main>
  );
}
