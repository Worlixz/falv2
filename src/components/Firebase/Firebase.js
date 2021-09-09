import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


const config = {
    apiKey: "AIzaSyBaMKAKMaQQYx-iCgZ6TzlCpJ2EtoaGtXc",
    authDomain: "flash-anatomy-learning.firebaseapp.com",
    projectId: "flash-anatomy-learning",
    storageBucket: "flash-anatomy-learning.appspot.com",
    messagingSenderId: "273500566620",
    appId: "1:273500566620:web:be15de505d1b9c2a84a299",
    measurementId: "G-6QKN8HD5B5"
}


class Firebase {
    constructor(){
        app.initializeApp(config)
        this.auth = app.auth()
        this.db = app.firestore()
    }

    signupUser = (email, password) => {
        return (this.auth.createUserWithEmailAndPassword(email, password))
    }

    loginUser = (email, password) => {
        return (this.auth.signInWithEmailAndPassword(email, password))
    }

    user = (uid) => this.db.doc(`users/${uid}`)

    userData = (uid) => this.db.doc(`users/${uid}`)
    
    userCollection = (uid) => this.db.doc(`users/${uid}`).collection('CartesCollection')
    
    signoutUser = () => this.auth.signOut()
    // Config des méthodes aux niveau de la db

    setNewCollectionCards = (uid, newCollection) => this.db.collection(`users/${uid}/CartesCollection/${newCollection}`)


}

export default Firebase