import React from 'react';
import styles from './homepage.module.css';
import Categories from './Categories/Categories';

export default function Homepage() {
  return (
    <main
      className={styles['homepage-main']}
    >
      <Categories />
    </main>
  );
}
