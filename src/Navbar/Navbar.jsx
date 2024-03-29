import React, { useState, useEffect } from 'react';
import {
  getAuth, onAuthStateChanged,
} from 'firebase/auth';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import UserInfo from './UserInfo';
import handleSignIn from '../APICalls/handleSignIn';
import SignInButton from '../Components/SignInButton';
import coffee from '../assets/coffee.svg';

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
        <h1>A Forum</h1>
        <img
          src={coffee}
          className={styles['coffee-img']}
          alt="logo"
        />
      </header>
      <header
        className={styles['header-bottom']}
      >
        <div
          className={styles.container}
        >
          <ul>
            <Link
              to="/"
            >
              <li><span>Forums</span></li>
            </Link>
            <li><span>Latest</span></li>
            <li><span>Trending</span></li>

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
