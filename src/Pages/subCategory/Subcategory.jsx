import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import styles from './subcategory.module.css';
import ThreadBlock from './ThreadBlock';
import addIcon from './add.svg';
import LocationTracker from '../../LocationTracker/LocationTracker';
import Dropdown from '../../Components/Dropdown/Dropdown';

export default function Subcategory({ user }) {
  // In the subcategory, this location below has the title of the parent categor
  const [threads, setThreads] = useState([]);
  const [threadInfo, setThreadInfo] = useState([]);
  const [dropdown, showDropdown] = useState(false);
  const button = useRef();

  const location = useLocation();
  const data = location.state;

  const { title } = data;
  const { sub } = data;

  const checkForButton = (e) => {
    console.log(e.target);
    if (e.target === button.current) {
      showDropdown(true);
    }
  };

  useEffect(() => {
    document.body.addEventListener('mouseover', checkForButton);

    return () => document.body.removeEventListener('mouseover', checkForButton);
  });

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

  const sortByReplyCount = () => {
    const mergedList = threads.map((thread) => (
      { ...thread, reply: threadInfo[thread.id].replies.length }
    ));
    console.log(mergedList);
    const filteredSort = mergedList.sort((a, b) => b.reply - a.reply);
    /*  .map((thread) => {
        delete thread.reply;
        return thread;
      }); */
    console.log(filteredSort);
  };

  const handleDropdownClick = (e) => {
    if (e === 'reply') {
      sortByReplyCount();
    }
  };

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

            {user.email && (
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
            )}
            <div
              className={styles['dropdown-container']}
            >
              {dropdown
              && (
              <Dropdown
                handleDropdownClick={handleDropdownClick}
              />
              )}
              <button
                type="button"
                ref={button}
              >
                Filter
              </button>
            </div>
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
