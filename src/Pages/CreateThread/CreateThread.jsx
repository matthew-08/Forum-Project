import React, { useState } from 'react';
import {
  useLocation, useNavigate,
} from 'react-router-dom';
import {
  doc, updateDoc, arrayUnion,
} from 'firebase/firestore';
// eslint-disable-next-line import/no-extraneous-dependencies
import { uuidv4 } from '@firebase/util';
import { db } from '../../Firebase';
import styles from './createthread.module.css';
import getCurrentUser from '../../APICalls/getCurrentUser';

export default function CreateThread() {
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState('');
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const handleCreateThread = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = uuidv4();
    const categoryRef = doc(db, 'SubCategory', `${data.sub}`);
    const threadInfoRef = doc(db, 'SubCategory', `${data.sub}`, 'ThreadInfo', 'ThreadInfo');

    const createPost = async () => {
      const currentUser = await getCurrentUser();
      await updateDoc(categoryRef, {
        Threads: arrayUnion({ title, id }),
      });
      await updateDoc(threadInfoRef, {
        [id]: {
          replies: [],
          content: inputValue,
          title,
          userDisplayName: currentUser.displayName,
          userId: currentUser.uid,
          userImg: currentUser.photoURL,
          date: new Date().toISOString().slice(0, 10),
        },
      });
    };
    createPost().then(() => {
      navigate(`/${data.sub}/${title}`, { state: { data: { sub: data.sub }, thread: { id } } });
    });
  };

  return (
    <main
      className="main"
    >
      <section
        className={styles.container}
      >
        <header
          className={styles.header}
        >
          <p>
            New thread

          </p>
        </header>
        <form action="#">
          <div
            className={styles['title-block']}
          >
            <p>Post Title</p>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div
            className={styles['text-area-section']}
          >
            <textarea
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              onClick={handleCreateThread}
            >
              Create
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
