import React, { useRef, useEffect } from 'react';
import styles from './dropdown.module.css';

export default function Dropdown({ handleDropdownClick }) {
  const dropdown = useRef();

  const checkForDropdown = (e) => {
    if (!dropdown === e.target || !dropdown.contains(e.target)) {

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
