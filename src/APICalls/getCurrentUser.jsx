import { onAuthStateChanged, getAuth } from 'firebase/auth';

const getCurrentUser = async () => {
  let username;
  const auth = getAuth();
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      username = user;
    } console.log('no user signed in');
  });
  return username;
};

export default getCurrentUser;
