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
            to={`/${sub.title}`}
            state={{ sub, categoryInfo }}
          >
            {sub.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
