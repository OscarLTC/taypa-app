import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBsYqFVfApxZpf-8DxgqFSeh41VbKLyjmQ',
  authDomain: 'taypa-app-dcee4.firebaseapp.com',
  projectId: 'taypa-app-dcee4',
  storageBucket: 'taypa-app-dcee4.appspot.com',
  messagingSenderId: '388810322838',
  appId: '1:388810322838:web:e6b5f22abb7ea9948723b7',
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
