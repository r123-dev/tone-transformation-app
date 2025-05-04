import React from 'react';

export default function ToneSlider({ tone, setTone }) {
  return (
    <div className="slider-wrapper">
      <label>Tone: {tone}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={tone}
        onChange={(e) => setTone(Number(e.target.value))}
      />
    </div>
  );
}