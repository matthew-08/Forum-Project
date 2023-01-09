import React from 'react';
import styles from './navbar.module.css';

export default function UserInfo({ name, img }) {
  return (
    <div
      className={styles['user-info']}
    >
      {name}
      <div className={styles['img-container']}><img src={img} alt="img" /></div>

    </div>
  );
}
