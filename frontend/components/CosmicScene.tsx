"use client";

import { useState } from "react";

const stars = Array.from({ length: 58 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  width: i % 9 === 0 ? 3 : 1.5,
  height: i % 9 === 0 ? 3 : 1.5,
  animationDelay: `${-(i % 11)}s`,
  animationDuration: `${5 + (i % 5)}s`,
}));

export function CosmicScene() {
  const [paused, setPaused] = useState(false);

  return (
    <div className={`cosmic-scene${paused ? " cosmic-paused" : ""}`}>
      <div className="cosmic-art" aria-hidden="true">
        <div className="cosmic-nebula" />
        <div className="cosmic-stars">
          {stars.map((style, i) => (
            <span key={i} style={style} />
          ))}
        </div>
        <div className="cosmic-orbit cosmic-orbit-outer" />
        <div className="cosmic-orbit cosmic-orbit-inner" />
        <div className="cosmic-planet" />
        <div className="cosmic-satellite-track">
          <span />
        </div>
        <div className="cosmic-shooting-star" />
      </div>
      <button
        className="cosmic-motion-toggle"
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? "Play animation" : "Pause animation"}
      </button>
    </div>
  );
}
