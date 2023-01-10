import React, { useEffect, useState } from 'react';
import {
  doc, updateDoc, arrayUnion,
} from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { db } from '../../Firebase';
import getThread from '../../APICalls/APICall';

export default function Thread() {
  const [threadInfo, setThreadInfo] = useState(null);
  const [comment, setComment] = useState('');
  const location = useLocation();
  const data = location.state;

  const docRef = doc(db, 'SubCategory', `${data.data.sub}`, 'ThreadInfo', 'ThreadInfo');
  const { id } = data.thread;
  /* const getThread = async () => {
    const threadData = await getDoc(docRef).then((res) => res.data()[id]);
    return threadData;
  }; */

  useEffect(() => {
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
    <section>
      <div>
        {threadInfo && threadInfo.title}
      </div>
      <div>
        {threadInfo && threadInfo.content}
      </div>
      <div>
        {threadInfo && threadInfo.userDisplayName}
      </div>
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
