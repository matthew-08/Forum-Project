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

  const docRef = doc(db, 'SubCategory', `${data.data.sub}`, 'ThreadInfo', 'ThreadInfo');
  const { id } = data.thread;

  useEffect(() => {
    getThread(id, docRef).then((res) => setThreadInfo(res));
  }, []);

  useEffect(() => {
  }, [threadInfo]);

  const handleNewComment = async () => {
    const currentUser = await getCurrentUser();
    await updateDoc(docRef, {
      [`${id.toString()}.replies`]: arrayUnion({
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
              gif={threadInfo.gif && threadInfo.gif}
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
              innerText="Login to post"
            />
          )}
      </div>
    </section>
  );
}
