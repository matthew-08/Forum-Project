import React, { useRef, useEffect, useState } from 'react';
import styles from './dropdown.module.css';

export default function Dropdown({ handleDropdownClick }) {
  const [hover, setHover] = useState(false);
  const dropdown = useRef();

  const checkForDropdown = (e) => {
    if (!dropdown === e.target || !dropdown.contains(e.target)) {
      setHover(false);
    } else {
      setHover(true);
    }
  };

  useEffect(() => {
    document.body.addEventListener('mouseover', checkForDropdown);

    return document.body.removeEventListener('mouseover', checkForDropdown);
  }, []);

  return (
    <div
      className={styles.dropdown}
      ref={dropdown}
      style={{
        display: hover ? 'flex' : 'none',
      }}
    >
      <button
        type="button"
        onClick={() => handleDropdownClick('reply')}
      >
        Reply ↑
      </button>
      <button
        type="button"
        onClick={() => handleDropdownClick('author')}
      >
        Author
      </button>
      <button
        type="button"
      >
        Date Created
      </button>
    </div>
  );
}
