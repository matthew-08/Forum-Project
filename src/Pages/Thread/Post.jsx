import React from 'react';
import styles from './thread.module.css';

export default function Post({
  title, content, userName, userImg, date,
}) {
  console.log(userImg);
  return (
    <div
      className={styles.post}
    >
      <div
        className={styles.userinfo}
      >
        <div
          className={styles['user-info-top']}
        >
          <div
            className={styles['img-container']}
          >
            <img src={userImg} alt="user-img" />
          </div>
          <p>{userName}</p>
        </div>
      </div>
      <div
        className={styles['post-content']}
      >
        <div
          className={styles['post-content-top']}
        >
          <small>{date}</small>
        </div>
        <div
          className={styles['post-content-main']}
        >
          <p>{content}</p>

        </div>

      </div>
    </div>
  );
}
