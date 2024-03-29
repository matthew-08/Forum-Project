import { useState, useEffect } from 'react';
import {
  getFirestore, getDocs, collection,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import styles from './categories.module.css';
import app from '../../../Firebase';
import ForumCategory from './ForumCategory';

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
      console.log(array);
    };
    getCategories();
    return () => setCategories([]);
  }, []);
  return (
    <section
      className={styles.container}
    >
      { categories.map((e) => (
        <ForumCategory
          key={uuidv4()}
          categoryInfo={e}
        />

      ))}
    </section>
  );
}
