import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import styles from './subcategory.module.css';
import ThreadBlock from './ThreadBlock';
import addIcon from './add.svg';
import LocationTracker from '../../LocationTracker/LocationTracker';

export default function Subcategory() {
  // In the subcategory, this location below has the title of the parent categor
  const [threads, setThreads] = useState([]);
  const [threadInfo, setThreadInfo] = useState([]);

  const location = useLocation();
  const data = location.state;

  const { title } = data;
  const { sub } = data;

  useEffect(() => {
    const docRef = doc(db, 'SubCategory', `${data.sub}`);
    const setDocs = async () => {
      await getDoc(docRef).then((res) => {
        setThreads(res.data().Threads);
      });
    };
    setDocs();
    const threadInfoRef = doc(db, 'SubCategory', `${data.sub}`, 'ThreadInfo', 'ThreadInfo');
    const getThreadInfo = async () => {
      await getDoc(threadInfoRef).then((res) => {
        setThreadInfo(res.data());
        console.log(res.data());
      });
    };
    getThreadInfo();
  }, []);

  return (

    <section
      className="main"
    >
      <LocationTracker
        arrayOfLocations={[title, sub]}
      />
      {/* <header>
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
      </header> */}
      <div
        className={styles['main-container']}
      >
        <div
          className={styles['thread-container']}
        >
          <div
            className={styles['thread-container-top']}
          >

            <Link
              to="createThread"
              state={data}
            >
              <button
                type="button"
                className={styles['create-thread-button']}
              >
                <img src={addIcon} alt="" />
                Create Thread
              </button>
            </Link>
            <button
              type="button"
            >
              Filter

            </button>
          </div>
          {threads.map((thread) => (
            <ThreadBlock
              threadInfo={threadInfo[thread.id]}
              title={thread.title}
              thread={thread}
              data={data}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
