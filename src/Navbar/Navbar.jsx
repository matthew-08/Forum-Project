import React, { useState, useEffect } from 'react';
import {
  GoogleAuthProvider, getAuth, signInWithPopup,
} from 'firebase/auth';
import styles from './navbar.module.css';
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
    <nav
      className={styles.nav}
    >
      <header
        className={styles['header-top']}
      >
        <h1>A forum</h1>
      </header>
      <header
        className={styles['header-bottom']}
      >
        <div
          className={styles.container}
        >
          <ul>
            <li>Forums</li>
            <li>Latest</li>
            <li>Trending</li>

          </ul>
        </div>
        {!user.email ? (
          <button
            type="button"
            onClick={() => handleSignIn()}
          >
            Sign In
          </button>
        )
          : (
            <UserInfo
              name={user.displayName}
              img={user.photoURL}
            />
          )}
      </header>
    </nav>
  );
}
