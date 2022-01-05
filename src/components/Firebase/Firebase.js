import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
/* import { doc, updateDoc, deleteField } from "firebase/firestore"; */

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
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

    downloadDocument = (uid, document) => {
        return this.db.doc(`users/${uid}/CartesCollection/${document}`)
    }

    setNewCollectionCards = (uid, newCollection) => {
        return this.db.doc(`users/${uid}/CartesCollection/${newCollection.nameCollection}`).set({
            categorie: newCollection.categorie,
            etiquette: newCollection.etiquette,
            abonnement: false,
            deleteOption: true,
            cards: {}
        }, {merge: true})
    }

    // Permet la modification d'une carte nécessite : UID | LA COLLECTION | LES DATA DE LA CARTE
    modificationCards = (uid, dataCollection, modalData) => {
        if(modalData.type === 'quiz'){
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
        }else {
            return this.db.doc(`users/${uid}/CartesCollection/${dataCollection.nameCollection}`).set({
                cards : {
                    [modalData.id]: {
                        question: modalData.question,
                            reponse: modalData.reponse,
                            type: modalData.type,
                            id_card: modalData.id,
                            revisionDate: Date.now()
                    }
                }
            }, {merge: true})
        }
    }

    creationCards = (uid, dataCollection, modalDataCreation) => {
        if(modalDataCreation.type === "quiz"){
            return this.db.doc(`users/${uid}/CartesCollection/${dataCollection.nameCollection}`).set({
                cards: {
                    [modalDataCreation.id]: {
                        question: modalDataCreation.question,
                        reponse: modalDataCreation.reponse,
                        type: modalDataCreation.type,
                        possibilite : {
                            p1: modalDataCreation.p1,
                            p2: modalDataCreation.p2,
                            p3: modalDataCreation.p3,
                            p4: modalDataCreation.p4
                        },
                        id_card: modalDataCreation.id,
                        revisionDate: Date.now()
    
                }
                }   
            }, {merge: true})
        }else{
            return this.db.doc(`users/${uid}/CartesCollection/${dataCollection.nameCollection}`).set({
                cards: {
                    [modalDataCreation.id]: {
                        question: modalDataCreation.question,
                        reponse: modalDataCreation.reponse,
                        type: modalDataCreation.type,
                        id_card: modalDataCreation.id,
                        revisionDate: Date.now()
    
                }
                }   
            }, {merge: true})
        }
    }

    deleteCollection = (uid, collectionName) => {
        return this.db.doc(`users/${uid}/CartesCollection/${collectionName}`).delete()
    }

    deleteDataCards = (uid, dataCollection, creattionCards) => {
        const admin = require('firebase-admin');
        const FieldValue = admin.firestore.FieldValue; 
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

    updateTimerFalse = (uid, nameCollection, idCards, event, dataQuizDisplay) => {
        let date
        console.log('event :', event)
        switch(event){
            case 1 : date = Date.now()
            break
            
            case 3 : date = (Date.now() + 3*86400000)
            break

            case 7 : date = (Date.now() + 7*86400000)
            break
            
            default : date = Date.now()
        }
        console.log('date firebase : ', date)
        console.log('date now :', Date.now())
        const diff = date - Date.now()
        console.log("diff date : ", diff)
        if ( dataQuizDisplay.possibilite) {
            return this.db.doc(`users/${uid}/CartesCollection/${nameCollection}`).set({
                cards: {
                    [idCards]: {
                        question: dataQuizDisplay.question,
                        reponse: dataQuizDisplay.reponse,
                        type: dataQuizDisplay.type,
                        possibilite : {
                            p1: dataQuizDisplay.possibilite.p1, 
                            p2: dataQuizDisplay.possibilite.p2, 
                            p3: dataQuizDisplay.possibilite.p3, 
                            p4: dataQuizDisplay.possibilite.p4 
                        },
                        id_card: idCards,
                        revisionDate: date
                }
                }   
            }, {merge: true}) 
        }else {
            return this.db.doc(`users/${uid}/CartesCollection/${nameCollection}`).set({
                cards: {
                    [idCards]: {
                        question: dataQuizDisplay.question,
                        reponse: dataQuizDisplay.reponse,
                        type: dataQuizDisplay.type,
                        id_card: idCards,
                        revisionDate: date
                }
                }   
            }, {merge: true})

        }
    }
    


    /* user = (uid) => this.db.doc(`users/${uid}`) */
}

export default Firebase