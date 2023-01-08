import React, { useState, useEffect } from 'react';
import {
  GoogleAuthProvider, getAuth, signInWithPopup,
} from 'firebase/auth';
import UserInfo from './UserInfo';

const provider = new GoogleAuthProvider();
const auth = getAuth();

export default function Navbar() {
  const [user, setUser] = useState({});

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        console.log(result);
        const { user } = result;
        console.log(user);
        setUser(user);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const { email } = error.customData;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <nav>

      <button
        type="button"
        onClick={() => handleSignIn()}
      >
        Sign In

      </button>
      {user.email && (
      <UserInfo
        name={user.displayName}
        img={user.photoURL}
      />
      )}
    </nav>
  );
}
