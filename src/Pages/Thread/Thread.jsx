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
import getCurrentUser from '../../APICalls/getCurrentUser';
import SignInButton from '../../Components/SignInButton';
import handleSignIn from '../../APICalls/handleSignIn';

export default function Thread({ user }) {
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
    const currentUser = await getCurrentUser();
    await updateDoc(docRef, {
      [`${id}.replies`]: arrayUnion({
        content: comment,
        userDisplayName: currentUser.displayName,
        userId: currentUser.uid,
        userImg: currentUser.photoURL,
        date: new Date().toISOString().slice(0, 10),
      }),
    }).then(() => getThread(id, docRef).then((res) => setThreadInfo(res)));
  };

  return (
    <section
      className={['main', styles.split].join(' ')}
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
              count={1}
            />
          </>
        )
}
      {' '}
      {threadInfo && threadInfo.replies.map((reply, index) => (
        <Post
          content={reply.content}
          userName={reply.userDisplayName}
          userImg={reply.userImg}
          date={reply.date}
          count={index + 2}
        />
      ))}
      <div
        className={styles['comment-section']}
      >
        {user.email && (
        <textarea
          name="Comment"
          id=""
          cols="30"
          rows="10"
          onChange={(e) => setComment(e.target.value)}
        />
        )}
        {user.email ? (
          <button
            onClick={handleNewComment}
            type="button"
          >
            Comment
          </button>
        )
          : (
            <SignInButton
              callBack={handleSignIn}
              innerText="Login"
            />
          )}
      </div>
    </section>
  );
}
