import React from 'react';
import { Link } from 'react-router-dom';
import Subcategory from '../../subCategory/Subcategory';
import styles from './categories.module.css';
import SubCategoryBlock from './SubCategoryBlock/SubCategoryBlock';

export default function ForumCategory({ categoryInfo }) {
  const { subCategories } = categoryInfo;
  const { title } = categoryInfo;
  return (
    <div
      className={styles.container}
    >
      <div
        className={styles.header}
      >
        { categoryInfo.title}

      </div>
      <div
        className={styles['subcategory-container']}
      >
        {subCategories && subCategories.map((sub) => (
          <SubCategoryBlock
            sub={sub}
            title={title}
          />

        ))}
      </div>
    </div>
  );
}
