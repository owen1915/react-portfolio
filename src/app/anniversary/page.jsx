import fs from "fs";
import path from "path";
import AnniversaryClient from "./AnniversaryClient";
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

  return <AnniversaryClient photos={photos} videos={videos} />;
}