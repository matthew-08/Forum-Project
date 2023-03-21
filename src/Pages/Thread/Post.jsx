import React from 'react';
import styles from './thread.module.css';
import approve from './approve.svg';

export default function Post({
  content, userName, userImg, date,
  count, gif,
}) {
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
          <div
            className={styles.verified}
          >
            <img src={approve} alt="approved user img" />
            Verified User

          </div>
        </div>
      </div>
      <div
        className={styles['post-content']}
      >
        <div
          className={styles['post-content-top']}
        >
          <small>{date}</small>
          <small
            className={styles.count}
          >
            #
            {count}

          </small>
        </div>
        <div
          className={styles['post-content-main']}
        >
          <p>{content}</p>
          {gif
          && (
          <div
            className={styles['gif-container']}
          >

            <img
              src={gif}
              alt="user-selected-gif"
            />

          </div>
          )}
        </div>

      </div>
    </div>
  );
}
