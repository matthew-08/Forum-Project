import { onAuthStateChanged, getAuth } from 'firebase/auth';

const getCurrentUser = async () => {
  let username;
  const auth = getAuth();
  const okay = await onAuthStateChanged(auth, (user) => {
    if (user) {
      username = user;
    }
  });
  return username;
};

export default getCurrentUser;
