import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
/* import { doc, updateDoc, deleteField } from "firebase/firestore"; */

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

    resetPassword = (email) => {
        return this.auth.sendPasswordResetEmail(email)
    }

    setNewCollectionCards = (uid, newCollection) => {
        console.log('je suis dans la fct firebase uid : ', uid)
        return this.db.doc(`users/${uid}/CartesCollection/${newCollection.nameCollection}`).set({
            categorie: newCollection.categorie,
            etiquette: newCollection.etiquette,
            cards: {}
        }, {merge: true})
    }

    // Permet la modification d'une carte nécessite : UID | LA COLLECTION | LES DATA DE LA CARTE
    modificationCards = (uid, dataCollection, modalData) => {
        return this.db.doc(`users/${uid}/CartesCollection/${dataCollection.nameCollection}`).set({
            cards : {
                [modalData.id]: {
                    question: modalData.question,
                        reponse: modalData.reponse,
                        type: modalData.type,
                        possibilite: {
                            p1: modalData.p1,
                            p2: modalData.p2,
                            p3: modalData.p3,
                            p4: modalData.p4
                        },
                        id_card: modalData.id,
                        revisionDate: Date.now()
                }
            }
        }, {merge: true})
    }

    creationCards = (uid, dataCollection, modalData) => {
        return this.db.doc(`users/${uid}/CartesCollection/${dataCollection.nameCollection}`).set({
            cards: {
                [modalData.id]: {
                    question: modalData.question,
                    reponse: modalData.reponse,
                    type: modalData.type,
                    possibilite : {
                        p1: modalData.p1,
                        p2: modalData.p2,
                        p3: modalData.p3,
                        p4: modalData.p4
                    },
                    id_card: modalData.id,
                    revisionDate: Date.now()

            }
            }   
        }, {merge: true})
    }

    deleteDataCards = (uid, dataCollection, creattionCards) => {
        const admin = require('firebase-admin');
        const FieldValue = admin.firestore.FieldValue; 
        console.log("dataCollection : ", dataCollection)
        let cards = dataCollection.cards.cards
        
        delete cards[creattionCards]
        return this.db.doc(`users/${uid}/CartesCollection/${dataCollection.nameCollection}`).update({cards})
       
    } 
 

    updateProfil = (uid, userName, email,nomPrenom, etude, profilPicture) => this.db.doc(`users/${uid}`).set({
        userName: userName,
        email: email,
        nomPrenom: nomPrenom,
        etude: etude,
        profilPicture: profilPicture
    })

    updateTimerFalse = (uid, nameCollection, idCards, event) => {
        let date

        switch(event){
            case 1 : date = Date.now()
            break
            
            case 3 : date = (Date.now() + 3*86400000)
            break

            case 7 : date = (Date.now() + 7*86400000)
            break
        }
        return this.db.doc(`users/${uid}/CartesCollection/${nameCollection}`).set({
            cards: {
                [idCards]: {
                    revisionDate: date
            }
            }   
        }, {merge: true})
    }
    


    /* user = (uid) => this.db.doc(`users/${uid}`) */
}

export default Firebase