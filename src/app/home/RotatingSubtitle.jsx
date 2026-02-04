"use client";

import { useEffect, useState } from "react";

const TITLES = [
  "software developer",
  "problem solver",
  "computer scientist",
  "ai engineer"
];

const TYPING_MS = 90;
const DELETING_MS = 55;
const PAUSE_AFTER_TYPED_MS = 1200;
const PAUSE_AFTER_DELETED_MS = 250;
const STORAGE_KEY = "subtitleIndex";

export default function RotatingSubtitle({ className = "" }) {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const storedIndex = Number(localStorage.getItem(STORAGE_KEY));
    if (!Number.isNaN(storedIndex) && storedIndex >= 0 && storedIndex < TITLES.length) {
      setIndex(storedIndex);
    }
  }, []);

  useEffect(() => {
    let timeoutId;
    const fullText = TITLES[index];

    if (!isDeleting && displayText.length < fullText.length) {
      timeoutId = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, TYPING_MS);
    } else if (!isDeleting && displayText.length === fullText.length) {
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, PAUSE_AFTER_TYPED_MS);
    } else if (isDeleting && displayText.length > 0) {
      timeoutId = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length - 1));
      }, DELETING_MS);
    } else if (isDeleting && displayText.length === 0) {
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        const nextIndex = (index + 1) % TITLES.length;
        setIndex(nextIndex);
        localStorage.setItem(STORAGE_KEY, String(nextIndex));
      }, PAUSE_AFTER_DELETED_MS);
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, index, isDeleting]);

  return (
    <p className={className} aria-live="polite">
      {displayText}
      <span className="typing-cursor" aria-hidden="true">_</span>
    </p>
  );
}
