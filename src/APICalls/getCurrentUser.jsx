import { onAuthStateChanged, getAuth } from 'firebase/auth';

const getCurrentUser = () => {
  let username;
  const auth = getAuth();
  const user = auth.currentUser;
  return user;
};

export default getCurrentUser;
