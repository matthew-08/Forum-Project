import React, { useState, useEffect } from 'react';
import {
  getAuth, onAuthStateChanged,
} from 'firebase/auth';
import styles from './navbar.module.css';
import UserInfo from './UserInfo';
import handleSignIn from '../APICalls/handleSignIn';
import SignInButton from '../Components/SignInButton';

export default function Navbar() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const auth = await getAuth();
      await onAuthStateChanged(auth, (u) => {
        if (u) {
          setUser(u);
        }
      });
    };
    getUser();
  }, []);

  const signIn = () => {
    handleSignIn().then((res) => setUser(res));
  };

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
          <SignInButton
            callBack={signIn}
            innerText="Sign In"
          />
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
