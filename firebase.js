// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCp9ggHHSKc0rzqM2PMBXtZHjvNlPT0fsU',
	authDomain: 'thrifty-trucks.firebaseapp.com',
	projectId: 'thrifty-trucks',
	storageBucket: 'thrifty-trucks.appspot.com',
	messagingSenderId: '218071105757',
	appId: '1:218071105757:web:72d50cca5ff419ecfe9b34',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, auth, storage };
