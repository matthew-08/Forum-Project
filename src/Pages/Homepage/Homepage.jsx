import React from 'react';
import styles from './homepage.module.css';
import Categories from './Categories/Categories';

/* const categories = [
  {
    title: 'Entertainment',
    subCategories: [
      { title: 'Anime', threads: [] },
      { title: 'TV', threads: [] },
      { title: 'Books', threads: [] },
      { title: 'K-Drama', threads: [] },
      { title: 'YouTube', threads: [] },
    ],
  },
  {
    title: 'Software Development',
    subCategories: [
      { title: 'Web Dev', threads: [] },
      { title: 'Computer Science', threads: [] },
      { title: 'LeetCode', threads: [] },
      { title: 'Python', threads: [] },
      { title: 'Java', threads: [] },
      { title: 'C++', threads: [] },
      { title: 'Job Listings', threads: [] },

    ],
  },
  {
    title: 'Video Games',
    subCategories: [
      { title: 'MMO / Online', threads: [] },
      { title: 'Nintendo', threads: [] },
      { title: 'Xbox', threads: [] },
      { title: 'PC', threads: [] },
      { title: 'Modding', threads: [] },

    ],
  },
  {
    title: 'PC',
    subCategories: [
      { title: 'Build-A-PC', threads: [] },
      { title: 'Parts Exchange', threads: [] },
      { title: 'Overclocking', threads: [] },
      { title: 'Discussion', threads: [] },
      { title: 'Laptop', threads: [] },

    ],
  },

];

const washingtonRef = doc(db, 'Categories', 'Categories');
await updateDoc(washingtonRef, {
  AllCategories: arrayUnion(
    { name: 'Poop' },
  ),
});

categories.forEach((e) => {
  updateDoc(washingtonRef, {
    AllCategories: arrayUnion(
      e,
    ),
  });
}); */

export default function Homepage() {
  return (
    <main
      className={styles['homepage-main']}
    >
      <Categories />
    </main>
  );
}
