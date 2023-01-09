import React, { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { db } from '../../Firebase';

export default function Thread() {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  useEffect(() => {
    console.log(data.data.title);
    const { id } = data.thread;
    const getThread = async () => {
      const docRef = doc(db, 'SubCategory', `${data.data.sub}`, 'ThreadInfo', 'ThreadInfo');
      await getDoc(docRef).then((res) => {
        console.log(res.data()[id]);
      });
    };
    getThread();
  }, []);

  return (
    <div>Thread</div>
  );
}
