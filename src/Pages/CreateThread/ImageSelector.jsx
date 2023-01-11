import React, { useState } from 'react';
import cat from '../../assets/cat.svg';
import chat from '../../assets/chat.svg';
import chicken from '../../assets/chicken.svg';
import styles from './createthread.module.css';

export default function ImageSelector({ getImage }) {
  const [selected, setSelected] = useState(1);

  const handleSetImg = (n, img) => {
    setSelected(n);
    getImage(n);
  };

  return (
    <div
      className={styles['image-selector']}
    >
      <button
        type="button"
        style={{ border: selected === 1 && '4px solid black' }}
        onClick={() => handleSetImg(1, { chat })}
      >
        <img src={chat} />

      </button>
      <button
        type="button"
        style={{ border: selected === 2 && '4px solid black' }}
        onClick={() => handleSetImg(2, { cat })}
      >
        <img src={cat} />

      </button>
      <button
        type="button"
        style={{ border: selected === 3 && '4px solid black' }}
        onClick={() => handleSetImg(3, { chicken })}
      >
        <img src={chicken} />

      </button>

    </div>
  );
}
