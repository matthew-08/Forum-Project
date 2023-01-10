import React from 'react';
import { Link } from 'react-router-dom';
import styles from './subcategory.module.css';

export default function ThreadBlock({ title, thread, data }) {
  return (
    <div
      className={styles['thread-block']}
    >
      <Link
        to={`${title}`}
        state={{ thread, data }}
      >
        {title}
      </Link>
    </div>
  );
}
