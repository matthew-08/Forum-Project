import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function CreateThread() {
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();
  const data = location.state;
  console.log(data);

  const handleThreadCreate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(inputValue);
  };

  return (
    <main>
      <form action="#">
        <textarea
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          onClick={(e) => handleThreadCreate(e)}
        >
          Create

        </button>
      </form>
    </main>
  );
}
