import React from 'react';

export default function UserInfo({ name, img }) {
  return (
    <div>
      {name}
      <img src={img} />

    </div>
  );
}
