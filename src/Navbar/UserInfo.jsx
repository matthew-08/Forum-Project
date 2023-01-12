import React from 'react';
import styles from './navbar.module.css';
import cat from '../assets/cat.svg';

export default function UserInfo({ name, img }) {
  console.log(img);
  return (
    <div
      className={styles['user-info']}
    >
      {name}
      <div className={styles['img-container']}><img src={img || cat} alt="profile-pic" /></div>

    </div>
  );
}
