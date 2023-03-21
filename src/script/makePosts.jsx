import { useEffect, useState } from 'react';
import {
  getFirestore, collection, getDocs, doc, updateDoc, arrayUnion,
} from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import app from '../Firebase';
// A script written to automically write a batch of posts

// Get subcategories

const db = getFirestore(app);

const userNames = [
  'cat2',
  'aCatThatTypes',
  'TheProgrammingCat',
  'AmazingCat',
  'CoolCat',
];

const createRandomContent = () => ({
  content: 'test',
  displayName: userNames[Math.floor(Math.random() * 4)],
  title: 'I wrote these threads using a script. Cool!',
  photoURL: 'https://cdn-images-1.medium.com/max/1600/1*mONNI1lG9VuiqovpnYqicA.jpeg',
});

export default function MakePosts() {
  const [categories, setCategories] = useState([]);
  /* const [categoryPair, ] */

  const getSub = () => {
    const randomSubCategory = () => {
      const mainCategory = categories[Math.floor(Math.random() * categories.length)];
      const subCategory = mainCategory
        .subCategories[Math.floor(Math.random() * mainCategory.subCategories.length)];
      const passMainCategory = mainCategory.mainCategory;
      return { mainCategory: passMainCategory, subCategory };
    };

    // loop
    const createPost = async () => {
      const subToPost = randomSubCategory();
      const id = uuidv4();
      const currentUser = createRandomContent();
      const { title } = currentUser;
      const categoryRef = doc(db, 'SubCategory', `${subToPost.subCategory}`);
      const threadInfoRef = doc(db, 'SubCategory', `${subToPost.subCategory}`, 'ThreadInfo', 'ThreadInfo');
      await updateDoc(categoryRef, {
        Threads: arrayUnion({ title, id }),
      });
      await updateDoc(threadInfoRef, {
        [id]: {
          replies: [],
          content: currentUser.content,
          title: currentUser.title,
          userDisplayName: currentUser.displayName,
          userId: 'randomly generated user',
          userImg: currentUser.photoURL,
          date: new Date().toISOString().slice(0, 10),
          imgId: 1,
        },
      });
    };
    for (let i = 0; i <= 2; i++) {
      createPost();
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const array = [];
      const citiesRef = collection(db, 'Categories');
      const querySnapshot = await getDocs(citiesRef);
      querySnapshot.forEach((doc) => array.push({ ...doc.data(), mainCategory: doc.id }));
      setCategories(array);
    };
    getCategories();

    return () => setCategories([]);
  }, []);

  useEffect(() => {
    if (categories.length) {
      /*  getSub(); */
    }
  }, [categories]);
  return (

    <h2>He</h2>
  );
}
