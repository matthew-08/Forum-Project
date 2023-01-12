import React from 'react';
import styles from './gifselector.module.css';

export default function GifSelector() {
  return (
    <div
      className="overlay"
    >
      <div className="container">
        <h2>Search for a GIF:</h2>
        <input type="text" />
      </div>
    </div>
  );
}
