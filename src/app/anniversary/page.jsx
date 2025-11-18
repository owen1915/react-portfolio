import fs from "fs";
import path from "path";
import Carousel from "./Carousel";
import "./styles.css";

export default function AnniversaryPage() {
  const filePath = path.join(process.cwd(), "src/app/anniversary/images.txt");
  const raw = fs.readFileSync(filePath, "utf-8");

  const items = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const photos = items.filter((url) => !url.match(/\.(mp4|mov|webm)$/i));
  const videos = items.filter((url) => url.match(/\.(mp4|mov|webm)$/i));

  return (
    <main className="anniversary">
      <h1>❤️ Happy Anniversary Sara ❤️</h1>

      <Carousel items={photos} />

      <h2 className="video-title">a small amount of our amazing memories</h2>

      <div className="video-grid">
        {videos.map((url, i) => (
          <div key={i} className="video-item">
            <video src={url} controls playsInline />
          </div>
        ))}
      </div>

      <div className="message-box">
        {"Happy Anniversary Sara! I love you so much and I'm so grateful for every moment we shared together and I cannot wait to create more and more! - Owen"}
      </div>
    </main>
  );
}
