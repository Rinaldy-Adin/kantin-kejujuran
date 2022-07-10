import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyD80pqn-HlAvaRjFO8jWq_S1un37OuzfhU',
    authDomain: 'kantin-kejujuran-cc7a9.firebaseapp.com',
    projectId: 'kantin-kejujuran-cc7a9',
    storageBucket: 'kantin-kejujuran-cc7a9.appspot.com',
    messagingSenderId: '275354429419',
    appId: '1:275354429419:web:1b505302194c0d9002dbae',
};

const initialize = () => {
    initializeApp(firebaseConfig);
};

export { initialize };
