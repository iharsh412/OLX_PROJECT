import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signOut,
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA3gGG9K5xsKN7nve2WjJHZ4TBr3rc8e6U',
  authDomain: 'olx-project-d487b.firebaseapp.com',
  projectId: 'olx-project-d487b',
  storageBucket: 'olx-project-d487b.appspot.com',
  messagingSenderId: '598465242138',
  appId: '1:598465242138:web:45e4603266c770e11a5da3',
  measurementId: 'G-Q84Y13R4P6',
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
console.log('firebase');

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<UserCredential | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    return result;
  } catch (error) {
    return null;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error during Google Sign-In:', error);
  }
};

export { auth, app };
