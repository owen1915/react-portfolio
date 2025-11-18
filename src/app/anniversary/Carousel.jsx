"use client";

import { useState, useRef, useEffect } from "react";

export default function Carousel({ items }) {
  const [index, setIndex] = useState(0);
  const dragStartX = useRef(null);

  const loop = (i) => (i + items.length) % items.length;

  // Visible cards: outer-left, left, center, right, outer-right
  const order = [
    loop(index - 2),
    loop(index - 1),
    loop(index),
    loop(index + 1),
    loop(index + 2),
  ];

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((n) => n + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Drag support
  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    if (diff > 50) setIndex((i) => i - 1);
    if (diff < -50) setIndex((i) => i + 1);
    dragStartX.current = null;
  };

  return (
    <div
      className="carousel3d"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <button className="nav-btn left" onClick={() => setIndex(index - 1)}>
        ‹
      </button>

      <div className="carousel-track">
        {order.map((itemIndex, i) => {
          const url = items[itemIndex];
          return (
            <div key={i} className={`card pos${i}`}>
              <img src={url} alt="" />
            </div>
          );
        })}
      </div>

      <button className="nav-btn right" onClick={() => setIndex(index + 1)}>
        ›
      </button>
    </div>
  );
}
