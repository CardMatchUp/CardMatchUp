import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyD8blZxzCHPXxHx4d-InSMTAVTH0MHx6D8",
    authDomain: "cardmatchup.firebaseapp.com",
    projectId: "cardmatchup",
    storageBucket: "cardmatchup.appspot.com",
    messagingSenderId: "281629057006",
    appId: "1:281629057006:web:cb3e51120d14cf2d8bb8ff",
    measurementId: "G-58L4E1P9BZ"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;