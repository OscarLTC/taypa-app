import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA9zWC5Isj3y6NpUUgW4lcWVf-DcsZ8Cuc',
  authDomain: 'taypa-app.firebaseapp.com',
  projectId: 'taypa-app',
  storageBucket: 'taypa-app.appspot.com',
  messagingSenderId: '697008486580',
  appId: '1:697008486580:web:37fd817e4d6c1171087fe1',
  measurementId: 'G-B0RK735TVX',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const firestore = getFirestore(app);

export const storage = getStorage(app);
