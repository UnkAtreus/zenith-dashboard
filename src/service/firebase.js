/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { decode as base64_decode } from 'base-64';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebase_decode = JSON.parse(base64_decode(import.meta.env.VITE_FIREBASE_CONFIG));

// Initialize Firebase
const app = initializeApp(firebase_decode);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export const signIn = async (email, password) => {
	await signInWithEmailAndPassword(auth, email, password)
		.then(userCredential => {
			// Signed in
			const user = userCredential.user;
			// ...
		})
		.catch(error => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
};
