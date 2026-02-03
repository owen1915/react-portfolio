"use client";

import { useEffect, useState } from "react";

const TITLES = [
  "software developer",
  "problem solver",
  "computer scientist",
  "ai engineer"
];

const ROTATE_MS = 2400;
const STORAGE_KEY = "subtitleStartTime";

export default function RotatingSubtitle({ className = "" }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let startTime = Number(localStorage.getItem(STORAGE_KEY));
    if (!startTime) {
      startTime = Date.now();
      localStorage.setItem(STORAGE_KEY, String(startTime));
    }

    const updateIndex = () => {
      const elapsed = Date.now() - startTime;
      const nextIndex = Math.floor(elapsed / ROTATE_MS) % TITLES.length;
      setIndex(nextIndex);
    };

    updateIndex();
    const interval = setInterval(updateIndex, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className={className} aria-live="polite">
      {TITLES[index]}
    </p>
  );
}
