/* eslint-disable no-unused-vars */
import {
  GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged,
} from 'firebase/auth';

const provider = new GoogleAuthProvider();
const auth = getAuth();

const handleSignIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const { user } = result;
      return result;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      const { email } = error.customData;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export default handleSignIn;
