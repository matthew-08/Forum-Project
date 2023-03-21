import React, { useState, useEffect } from 'react';
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
import ImageSelector from './ImageSelector';
import GifSelector from '../../Components/GifSelector/GifSelector';
import giphy from './gif.png';

export default function CreateThread() {
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(1);
  const [gif, setUserGif] = useState(null);
  const [showGifSelector, setShowGifSelector] = useState(false);
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
          imgId: image,
          gif,
        },
      });
    };
    createPost().then(() => {
      navigate(`/${data.sub}/${title}`, { state: { data: { sub: data.sub }, thread: { id } } });
    });
  };

  const getImage = (e) => {
    setImage(e);
  };

  const handleUserImageSelection = (img) => {
    setShowGifSelector(false);
    console.log(img);
    setUserGif(img);
  };

  const closeSelector = () => {
    setShowGifSelector(false);
  };
  return (
    <main
      className="main"
    >
      {showGifSelector && (
      <GifSelector
        handleUserImageSelection={handleUserImageSelection}
        closeSelector={closeSelector}
      />
      )}
      <section
        className={styles.container}
      >

        <div
          className={styles['gif-preview']}
        >
          {gif
          && <img src={gif} />}
        </div>

        <div
          className={styles['post-main']}
        >
          <header
            className={styles.header}
          >
            <p>
              New thread in:
              {' '}
              {data.sub}
            </p>
          </header>
          <form
            action="#"
            className={styles.form}
          >
            <div
              className={styles['title-block']}
            >
              <ImageSelector
                getImage={getImage}
              />
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post Title..."
              />
            </div>
            <div
              className={styles['text-area-section']}
            >
              <textarea
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Thread content..."
              />
              <div
                className={styles['container-bottom']}
              >
                <div
                  className={styles['gif-selector-container']}
                >
                  <button
                    type="button"
                    className={styles['gif-selector']}
                    onClick={(e) => setShowGifSelector(!showGifSelector)}
                  >
                    <img src={giphy} alt="gif" />
                  </button>
                </div>
                <div
                  className={styles['buttons-container']}
                >
                  <button
                    type="submit"
                    onClick={handleCreateThread}
                    className={styles.button}
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className={styles.button}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
