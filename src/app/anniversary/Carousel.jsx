"use client";
import { useState, useRef, useEffect } from "react";

export default function Carousel({ items }) {
  const [rotation, setRotation] = useState(0);
  const [mounted, setMounted] = useState(false);
  const dragStartX = useRef(null);
  const dragStartRotation = useRef(0);
  const isAutoRotating = useRef(false);
  
  const totalItems = items.length;
  const anglePerItem = 2880 / totalItems;

  // Wait for mount before starting animation
  useEffect(() => {
    setMounted(true);
    // Start auto-rotating after mount
    setTimeout(() => {
      isAutoRotating.current = true;
    }, 100);
  }, []);

  // Auto-rotate continuously
  useEffect(() => {
    if (!mounted) return;
    
    let animationFrame;
    let lastTime = Date.now();
    
    const animate = () => {
      if (isAutoRotating.current) {
        const currentTime = Date.now();
        const delta = (currentTime - lastTime) / 1000;
        lastTime = currentTime;
        
        setRotation(prev => prev + (10 * delta));
      } else {
        lastTime = Date.now();
      }
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [mounted]);

  // Drag support
  const handleMouseDown = (e) => {
    isAutoRotating.current = false;
    dragStartX.current = e.clientX;
    dragStartRotation.current = rotation;
  };

  const handleMouseMove = (e) => {
    if (dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    setRotation(dragStartRotation.current - diff * 0.3);
  };

  const handleMouseUp = () => {
    dragStartX.current = null;
    setTimeout(() => {
      isAutoRotating.current = true;
    }, 2000);
  };

  const handleClick = (direction) => {
    isAutoRotating.current = false;
    setRotation(prev => prev + (direction * anglePerItem));
    setTimeout(() => {
      isAutoRotating.current = true;
    }, 2000);
  };

  // Don't render carousel content until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="carousel3d">
        <button className="nav-btn left">‹</button>
        <div className="carousel-track"></div>
        <button className="nav-btn right">›</button>
      </div>
    );
  }

  return (
    <div 
      className="carousel3d"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <button className="nav-btn left" onClick={() => handleClick(-1)}>
        ‹
      </button>
      
      <div className="carousel-track">
        {items.map((url, i) => {
          const angle = (i * anglePerItem) - rotation;
          const radians = (angle * Math.PI) / 180;
          
          const radius = 450;
          const x = Math.sin(radians) * radius;
          const z = Math.cos(radians) * radius - 200;
          
          const scale = 0.4 + (z + 400) / 1000;
          const opacity = Math.max(0.2, Math.min(1, (z + 400) / 500));
          const blur = Math.abs(x) > 350 ? 4 : 0;
          
          return (
            <div
              key={i}
              className="card"
              style={{
                transform: `translateX(${x}px) translateZ(${z}px) rotateY(${-angle}deg) scale(${scale})`,
                opacity: opacity,
                filter: `blur(${blur}px)`,
                zIndex: Math.round(z)
              }}
            >
              <img src={url} alt="" draggable="false" />
            </div>
          );
        })}
      </div>
      
      <button className="nav-btn right" onClick={() => handleClick(1)}>
        ›
      </button>
    </div>
  );
}