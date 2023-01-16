/* import the functions you need from the SDKs needed */
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
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
const form = document.querySelector('#add-cafe-form');

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
	try {
		const snapshot = await getDocs(collection(db, 'cafes'));

		snapshot.forEach((doc) => {
			renderCafe(doc);
		});

		console.log('Documents successfully retrieved...');
	} catch (err) {
		console.error('Error retrieving documents: ', err);
	}
})();

/* saving data to the cafes collection */
async function addDocument() {
	try {
		const docRef = await addDoc(collection(db, 'cafes'), {
			name: form.name.value,
			city: form.city.value,
		});

		console.log('Document written with ID: ', docRef.id);
	} catch (err) {
		console.error('Error adding document: ', err);
	}
}

/* click event listener */
form.addEventListener('submit', (e) => {
	e.preventDefault();

	/* save data */
	addDocument();

	/* clear form */
	form.name.value = '';
	form.city.value = '';
});
