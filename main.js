/* import the functions you need from the SDKs needed */
import { initializeApp } from 'firebase/app';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	getFirestore,
	query,
	where,
} from 'firebase/firestore';
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
	let cross = document.createElement('div');

	li.setAttribute('data-id', doc.id);
	name.textContent = doc.data().name;
	city.textContent = doc.data().city;
	cross.textContent = 'x';

	li.appendChild(name);
	li.appendChild(city);
	li.appendChild(cross);

	cafeList.appendChild(li);

	/* click event listener for deleting documents */
	cross.addEventListener('click', (e) => {
		e.stopPropagation();

		/* get document id */
		let id = e.target.parentElement.getAttribute('data-id');

		/* delete data */
		deleteDocument(id);
	});
}

/* get all documents from the cafes collection */
(async function getDocuments() {
	try {
		const cafeRef = collection(db, 'cafes');
		const qry = await query(cafeRef, where('city', '==', 'Mombasa'));
		const snapshot = await getDocs(qry);

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
		const cafeRef = await addDoc(collection(db, 'cafes'), {
			name: form.name.value,
			city: form.city.value,
		});

		console.log('Document written with ID: ', cafeRef.id);
	} catch (err) {
		console.error('Error adding document: ', err);
	}
}

/* click event listener for adding documents */
form.addEventListener('submit', (e) => {
	e.preventDefault();

	/* save data */
	addDocument();

	/* clear form */
	form.name.value = '';
	form.city.value = '';
});

/* delete document from the cafes collection */
async function deleteDocument(id) {
	await deleteDoc(doc(db, 'cafes', id));
}
