import { onAuthStateChanged, getAuth } from 'firebase/auth';

const getCurrentUser = async () => {
  let username;
  const auth = getAuth();
  const awaitUser = await onAuthStateChanged(auth, (user) => {
    if (user) {
      username = user;
    }
  });
  return username;
};

export default getCurrentUser;
