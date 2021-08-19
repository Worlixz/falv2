import app from 'firebase/app'

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
        this.app = app.auth()
        this.db = app.firestore()
    }

    // Config des méthodes aux niveau de la db


}

export default Firebase