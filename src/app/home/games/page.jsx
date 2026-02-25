"use client";

import TypingRaceGame from "./TypingRaceGame";

export default function GamesPage() {
  return (
    <section>
      <h2>Games</h2>
      <p className="section-hint">Race against my typing speed!</p>
      <TypingRaceGame />
    </section>
  );
}
