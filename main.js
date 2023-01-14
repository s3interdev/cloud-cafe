/* import the functions you need from the SDKs needed */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
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

/* html dom elements */
const cafeList = document.querySelector('#cafe-list');

/* create element and render cafes */
function renderCafe(doc) {
	let li = document.createElement('li');
	let name = document.createElement('span');
	let city = document.createElement('span');

	li.setAttribute('data-id', doc.id);
	name.textContent = doc.data().name;
	city.textContent = doc.data().city;

	li.appendChild(name);
	li.appendChild(city);

	cafeList.appendChild(li);
}

/* get all documents from the cafes collection */
(async function getDocuments() {
	const snapshot = await getDocs(collection(db, 'cafes'));

	snapshot.forEach((doc) => {
		renderCafe(doc);
	});
})();
