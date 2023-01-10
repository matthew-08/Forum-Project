import React from 'react';
import styles from './locationtrack.module.css';

export default function LocationTracker({ arrayOfLocations }) {
  return (
    <header>
      <div
        className={styles['header-top']}
      >
        Forums
        {' '}
        {'>'}
        {' '}
        {arrayOfLocations
          .filter((location, index) => index !== arrayOfLocations.length - 1)
          .map((e) => (
            <span>
              {e}
              {' '}
              {'>'}
              {' '}
            </span>
          ))}
      </div>
      <div
        className={styles['header-bottom']}
      >
        {arrayOfLocations[arrayOfLocations.length - 1]}
      </div>
    </header>
  );
}
