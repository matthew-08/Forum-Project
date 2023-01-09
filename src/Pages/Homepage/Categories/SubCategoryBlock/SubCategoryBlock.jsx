import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../categories.module.css';
import icon from './chat.png';

export default function SubCategoryBlock({ sub, title }) {
  return (
    <div
      className={styles['sub-block']}
    >
      <div
        className={styles['sub-title']}
      >
        <img src={icon} alt="icon" />
        <Link
          to={`/${sub}`}
          state={{ sub, title }}
        >
          {sub}
        </Link>
      </div>
    </div>
  );
}
