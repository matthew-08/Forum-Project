import { useState, useEffect } from 'react';
import {
  getFirestore, doc, getDocs, collection,
} from 'firebase/firestore';
import { Link, Route, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styles from './categories.module.css';
import app from '../../../Firebase';
import ForumCategory from './ForumCategory';

const db = getFirestore(app);

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);
    const getCategories = async () => {
      const array = [];
      const citiesRef = collection(db, 'Categories');
      const querySnapshot = await getDocs(citiesRef);
      querySnapshot.forEach((doc) => array.push({ ...doc.data(), title: doc.id }));
      setCategories(array);
    };
    getCategories();
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

      ))}
    </section>
  );
}
