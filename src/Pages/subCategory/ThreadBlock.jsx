import React from 'react';
import { Link } from 'react-router-dom';
import styles from './subcategory.module.css';
import chat from '../../assets/chat.svg';
import cat from '../../assets/cat.svg';
import chicken from '../../assets/chicken.svg';

export default function ThreadBlock({
  title, thread, data, threadInfo,
}) {
  const getImg = (imgId) => {
    switch (imgId) {
      case 1: return chat;
      case 2: return cat;
      case 3: return chicken;
      default: return chat;
    }
  };
  return (
    <div
      className={styles['thread-block']}
    >
      <div
        className={styles['thread-block-left']}
      >
        {threadInfo && <img src={getImg(threadInfo.imgId || 1)} alt="thread img" />}
        <Link
          to={`${title}`}
          state={{ thread, data }}
        >
          {title}
        </Link>
      </div>
      <div
        className={styles['thread-info-container']}
      >
        <div>
          <p>Replies:</p>
          <span
            className={styles.length}
          >
            {threadInfo && threadInfo.replies.length}

          </span>
        </div>
        <div
          className={styles['user-block']}
        >
          <p>Author:</p>
          {' '}
          <span
            className={styles.username}
          >
            {threadInfo && threadInfo.userDisplayName}

          </span>
        </div>

      </div>
    </div>
  );
}
