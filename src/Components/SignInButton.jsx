import React from 'react';

export default function SignInButton({ passClass, innerText, callBack }) {
  return (
    <button
      type="button"
      onClick={() => callBack()}
    >
      {innerText}
    </button>
  );
}
