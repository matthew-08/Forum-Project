import React from 'react';
import { Link } from 'react-router-dom';
import Subcategory from '../../subCategory/Subcategory';

export default function ForumCategory({ categoryInfo }) {
  const { subCategories } = categoryInfo;
  return (
    <div>
      { categoryInfo.title}
      <div>
        {subCategories && subCategories.map((sub) => (
          <Link
            to={`/${sub}`}
            state={{ sub }}
           /*  state={{ sub, categoryInfo }} */
          >
            {sub}
          </Link>
        ))}
      </div>
    </div>
  );
}
