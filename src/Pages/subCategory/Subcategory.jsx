import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

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
        setThreads(res.data());
      });
    };
    setDocs();
  }, []);

  useEffect(() => {
    console.log(threads);
  }, [threads]);
  return (
    <div>
      {data.sub}
      {' '}
      {data.sub}
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
  );
}
