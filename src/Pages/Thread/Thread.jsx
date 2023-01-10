import React, { useEffect, useState } from 'react';
import {
  doc, updateDoc, arrayUnion,
} from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { db } from '../../Firebase';
import getThread from '../../APICalls/APICall';
import styles from './thread.module.css';
import Post from './Post';
import LocationTracker from '../../LocationTracker/LocationTracker';

export default function Thread() {
  const [threadInfo, setThreadInfo] = useState(null);
  const [comment, setComment] = useState('');
  const location = useLocation();
  const data = location.state;
  console.log(data);

  const docRef = doc(db, 'SubCategory', `${data.data.sub}`, 'ThreadInfo', 'ThreadInfo');
  const { id } = data.thread;
  /* const getThread = async () => {
    const threadData = await getDoc(docRef).then((res) => res.data()[id]);
    return threadData;
  }; */

  useEffect(() => {
    console.log(docRef);
    console.log(id);
    getThread(id, docRef).then((res) => setThreadInfo(res));
  }, []);

  useEffect(() => {
    console.log(threadInfo);
  }, [threadInfo]);

  const handleNewComment = async () => {
    console.log('test');
    console.log([`Threads.${id}.replies`]);
    await updateDoc(docRef, {
      [`${id}.replies`]: arrayUnion(comment),
    });
  };

  return (
    <section
      className="main"
    >
      {
        threadInfo
        && (
          <>
            <LocationTracker
              arrayOfLocations={[data.data.sub, data.data.title, threadInfo.title]}
            />
            <Post
              title={threadInfo.title}
              content={threadInfo.content}
              userName={threadInfo.userDisplayName}
              userImg={threadInfo.userImg}
              date={threadInfo.date}
            />
          </>
        )
}
      {/* <div>
        {threadInfo && threadInfo.title}
      </div>
      <div>
        {threadInfo && threadInfo.content}
      </div>
      <div>
        {threadInfo && threadInfo.userDisplayName}
      </div> */}
      <textarea
        name="Comment"
        id=""
        cols="30"
        rows="10"
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleNewComment}
        type="button"
      >
        Comment
      </button>
    </section>
  );
}
