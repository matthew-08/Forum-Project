import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Subcategory() {
  // In the subcategory, this location below has the title of the parent categor
  const location = useLocation();
  const data = location.state;
  console.log(data);
  return (
    <div>sub.title</div>
  );
}
