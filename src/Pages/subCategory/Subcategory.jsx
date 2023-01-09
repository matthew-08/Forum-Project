import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import styles from './subcategory.module.css';
import ThreadBlock from './ThreadBlock';

export default function Subcategory() {
  // In the subcategory, this location below has the title of the parent categor
  const [threads, setThreads] = useState([]);

  const location = useLocation();
  const data = location.state;
  console.log(data);

  useEffect(() => {
    const docRef = doc(db, 'SubCategory', `${data.sub}`);
    const setDocs = async () => {
      await getDoc(docRef).then((res) => {
        setThreads(res.data().Threads);
      });
    };
    setDocs();
  }, []);

  useEffect(() => {
    console.log(threads);
  }, [threads]);
  return (

    <section
      className="main"
    >
      <header>
        <div
          className={styles['header-top']}
        >
          Forums
          {' '}
          {'>'}
          {' '}
          {data.title}
        </div>
        <div
          className={styles['header-bottom']}
        >
          {data.sub}
        </div>
      </header>
      <div>
        <div
          className={styles['thread-container']}
        >
          <div
            className={styles['thread-container-top']}
          >
            <button
              type="button"
            >
              Filter

            </button>
          </div>
          {threads.map((thread) => (

            <Link
              to={`${thread.title}`}
              state={{ thread, data }}
            >
              {thread.title}
            </Link>
          ))}
        </div>
        <Link
          to="/createThread"
          state={data}
        >
          <button
            type="button"
          >
            Create Thread
          </button>
        </Link>
      </div>
    </section>
  );
}
