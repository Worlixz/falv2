import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
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

    /* userCollection = () => {
        let refCollection = this.db.listCollections()
        console.log(refCollection)
        return refCollection
    } */
    
    /* userCollection = (uid) => {
        let refCollection = this.db.doc(`users/${uid}`).collection()
        .get()
        .then((collection) => {
            console.log("je suis dans le then",collection)
        })
        console.log(refCollection)
    } */
    
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
            [modalData.id]: {
                question: modalData.question,
                    reponse: modalData.reponse,
                    type: modalData.type,
                    p1: modalData.p1,
                    p2: modalData.p2,
                    p3: modalData.p3,
                    p4: modalData.p4
            }
        }, {merge: true})
    }

    creationCards = (uid, dataCollection, modalData) => {
        return this.db.doc(`users/${uid}/CartesCollection/${dataCollection.nameCollection}`).set({
            [modalData.id]: {
                question: modalData.question,
                    reponse: modalData.reponse,
                    type: modalData.type,
                    p1: modalData.p1,
                    p2: modalData.p2,
                    p3: modalData.p3,
                    p4: modalData.p4
            }
        }, {merge: true})
    }

    deleteDataCards = (uid, dataCollection, creattionCards) => {
        /* let selectedCardsBis */
        const admin = require('firebase-admin');
        const FieldValue = admin.firestore.FieldValue; 
        console.log("dataCollection : ", dataCollection)
        /* let refCollection = this.db.collection('CartesCollection').doc(dataCollection.nameCollection); */
        let refCards = dataCollection.cards
        /* console.log(creattionCards) */
       
        /* let selectedCards = dataCollection.cards.creattionCards
        selectedCardsBis = {...dataCollection.cards[creattionCards]}
        let selectedCardsBisBis = dataCollection.cards['creattionCards'] */
        /* console.log("refCards : " ,refCards) 
        console.log("creationCards", creattionCards)
        console.log("selectedCards : ", selectedCardsBis) */
        delete refCards[creattionCards]
        console.log(refCards)
        debugger
        return this.db.doc(`users/${uid}/CartesCollection/${dataCollection.nameCollection}`).update({refCards})
        /* console.log("refCards delet : ", refCards.creattionCards)
        return this.db.doc(`users/${uid}/CartesCollection/${dataCollection.nameCollection}`).update({
            refCards: FieldValue.arrayRemove(creattionCards)
        }) */
        //console.log(refCollection)
        /* let refCards = refCollection.id 
        delete dataCollection.cards[creattionCards] */
        /* Modifier dataCollectyion.cards pour supp données */
        /* const deleteCards = refCollection.update({
            refCards: FieldValue.arrayRemove(creattionCards)
        }); */


        //Modifier la position de lka DB
        //return deleteCards;

        /* return this.db.doc(`users/${uid}/CartesCollection/${dataCollection.nameCollection}`).set({
            dataCollection: dataCollection
        }, {merge: true}) */
    } 
 

    updateProfil = (uid, userName, email,nomPrenom, etude, profilPicture) => this.db.doc(`users/${uid}`).set({
        userName: userName,
        email: email,
        nomPrenom: nomPrenom,
        etude: etude,
        profilPicture: profilPicture
    })
    user = (uid) => this.db.doc(`users/${uid}`)
}

export default Firebase