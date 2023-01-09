import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  doc, updateDoc, arrayUnion, arrayRemove, addDoc, collection,
} from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import app, { db } from '../../Firebase';

export default function CreateThread() {
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState('');
  const location = useLocation();
  const data = location.state;

  const handleCreateThread = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = uuidv4();
    const categoryRef = doc(db, 'SubCategory', `${data.sub}`);
    const threadInfoRef = doc(db, 'SubCategory', `${data.sub}`, 'ThreadInfo', 'ThreadInfo');
    console.log(threadInfoRef);
    const createPost = async () => {
      await updateDoc(categoryRef, {
        Threads: arrayUnion({ title, id }),
      });
      await updateDoc(threadInfoRef, {
        [id]: 'hello',
      });
    };
    createPost();
  };

  return (
    <main>
      <p>
        Creating a thread in
        {' '}
        {data.sub}
      </p>
      <form action="#">
        <p>Post Title</p>
        <input
          type="text"
          onChange={(e) => setTitle(title)}
        />
        <textarea
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleCreateThread}
        >
          Create

        </button>
      </form>
    </main>
  );
}
