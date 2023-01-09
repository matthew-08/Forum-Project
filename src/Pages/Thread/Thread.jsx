import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { db } from '../../Firebase';

export default function Thread() {
  const [threadInfo, setThreadInfo] = useState(null);
  const location = useLocation();
  const data = location.state;
  console.log(data);

  useEffect(() => {
    console.log(data.data.title);
    const { id } = data.thread;
    const getThread = async () => {
      const docRef = doc(db, 'SubCategory', `${data.data.sub}`, 'ThreadInfo', 'ThreadInfo');
      await getDoc(docRef).then((res) => {
        setThreadInfo(res.data()[id]);
      });
    };
    getThread();
  }, []);

  useEffect(() => {
    console.log(threadInfo);
  }, [threadInfo]);

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
    </section>
  );
}
