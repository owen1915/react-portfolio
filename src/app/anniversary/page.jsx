"use client";

import { useEffect, useState } from "react";
import AnniversaryClient from "./AnniversaryClient";
import "./styles.css";

export default function AnniversaryPage() {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/anniversary/images.txt")
      .then((res) => res.text())
      .then((raw) => {
        const items = raw
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean);

        const _photos = items.filter((url) => !url.match(/\.(mp4|mov|webm)$/i));
        const _videos = items.filter((url) => url.match(/\.(mp4|mov|webm)$/i));

        setPhotos(_photos);
        setVideos(_videos);
      })
      .catch((err) => console.error("Error loading images.txt", err));
  }, []);

  const [input, setInput] = useState("");
  const [allowed, setAllowed] = useState(false);

  if (!allowed) {
    return (
      <div className="password-wrapper">
        <div className="password-box">
          <h1>Password</h1>
          <p>Fill in the Blank</p>
          <p>Fine Twee in a ______</p>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.toLowerCase())}
            placeholder="your answer..."
          />

          <button
            onClick={() => {
              if (input.trim() === "romper") setAllowed(true);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return <AnniversaryClient photos={photos} videos={videos} />;
}
