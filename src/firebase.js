import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCx9dgBm-zgTgGgw7HQWQM48hpy9UGKHnI",
    authDomain: "react-redux-app-5e607.firebaseapp.com",
    databaseURL: "https://react-redux-app-5e607.firebaseio.com",
    projectId: "react-redux-app-5e607",
    storageBucket: "react-redux-app-5e607.appspot.com",
    messagingSenderId: "1002459465865",
    appId: "1:1002459465865:web:5db5a940a75c16ac"
}

firebase.initializeApp(config);

export default firebase;