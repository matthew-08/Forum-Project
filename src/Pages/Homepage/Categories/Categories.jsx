import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Link, Route, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styles from './categories.module.css';
import app from '../../../Firebase';
import ForumCategory from './ForumCategory';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);

    const docRef = doc(db, 'Categories', 'Categories');

    const getData = async () => {
      const ok = await getDoc(docRef);
      return ok;
    };
    getData().then((res) => setCategories(res.data().AllCategories));

    return () => setCategories([]);
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);
  return (
    <section
      className={styles.container}
    >
      { categories.map((e) => (
        <ForumCategory
          categoryInfo={e}
        />

      )) }
    </section>
  );
}
