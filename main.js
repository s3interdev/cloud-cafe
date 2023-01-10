/* import the functions you need from the SDKs needed */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import './style.css';

/* the web app's firebase configuration */
const firebaseConfig = {
	apiKey: 'AIzaSyCVsE6p3pJLtidHAwtJwed6QwESZpaRp-4',
	authDomain: 'coffee-shop-database.firebaseapp.com',
	projectId: 'coffee-shop-database',
	storageBucket: 'coffee-shop-database.appspot.com',
	messagingSenderId: '825225423565',
	appId: '1:825225423565:web:afe07c96324cd96ff91784',
};

/* initialize firebase */
const app = initializeApp(firebaseConfig);

/* initialize services */
const db = getFirestore(app);
