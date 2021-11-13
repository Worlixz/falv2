import React, { Fragment, useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from './Firebase'
import OsCasse from '../assets/Cards/os-casse.svg'
import Physio from '../assets/Cards/poumons.svg'
import Play from '../assets/Cards/bouton-jouer.svg'
import btnPlus from '../assets/plus.svg'
import btnClose from '../assets/close.svg'
import interogationPoint from '../assets/Cards/interrogationPoint.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { freeCards } from './freeCards'


toast.configure()


function Collection(props) {

    const firebase = useContext(FirebaseContext)
    const assombrir = document.querySelector('.sombreModal')

    const urlCardsFreeAcces = "gs://flash-anatomy-learning.appspot.com/CarteFreeAccess"

    const propsHistory = props.propsHistory
    const dataNewCollection = {
        nameCollection : '',
        categorie: 'default',
        etiquette: '',
        cards: {}
    }
    const mapDataCards = []
    const mapDataCardsCopie = props.dataCards
    let mapDataTest = []
    const formatedData = []
    
    const [modalCheck, setModalCheck] = useState(false)
    const [newCollection, setNewCollection] = useState(dataNewCollection)
    const [userSession, setUserSession] = useState(props.userSession.uid.toString())
    const [collectionCardsInDB, setCollectionCardsInDB] = useState([])

    const copyFreeCards = freeCards

    let collection_CardsInDB = {}

    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : propsHistory.push('/')
        })
        firebase.userCollection(userSession.uid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.docs.map((doc) => {
                collection_CardsInDB = {...collection_CardsInDB, [doc.id]: doc.data()}
                setCollectionCardsInDB(collection_CardsInDB)
            })
        })
        return () => {
            listener()
        }
    }, [userSession])

    const handleClickBtn = () => {
        setModalCheck(true)
        assombrir.style.zIndex = "2"
    }
    
    const handleCloseModal = () => {
        setModalCheck(false)
        setNewCollection(dataNewCollection)
        assombrir.style.zIndex = "-2"
    }

    function reloadPage () {
        window.location.reload()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.setNewCollectionCards(userSession.uid, newCollection)
        .then(() => {
            reloadPage()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleChange = (e) => {
        setNewCollection({...newCollection, [e.target.id]: e.target.value})
    }

    const btnCreation = newCollection.nameCollection == '' ? 
        (<button disabled style={{background: "lightgray"}}>Créer</button>) : (newCollection.categorie === 'default') ? 
        (<button disabled style={{background: "lightgray"}}>Créer</button>) : (newCollection.etiquette === '') ?
        (<button disabled style={{background: "lightgray"}}>Créer</button>) : (<button>Créer</button>)

    const modal = (
        <div className="modal">
            <button className="btnCloseModal" onClick={() => handleCloseModal()}><img src={btnClose}  /></button>
            <form onSubmit={handleSubmit} className="formModal">
                <label id="nameCollection">Créer ta nouvelle collection : </label>
                <input type="text" id="nameCollection" onChange={handleChange}/>
                <label id="categorie">Catégorie :</label>
                <select id="categorie" onChange={handleChange}>
                    <option value="default" selected>--Default--</option>
                    <option value="anatomy">Anatomie</option>
                    <option value="physio">Physiologie</option>
                    <option value="autre">Autres</option>
                </select>
                <label id="etiquette">Etiquette :</label>
                <input type="text" id="etiquette" onChange={handleChange}/>
                {btnCreation}
            </form>
        </div>
    )
    
    let nameCollectionStorageLocal = []
    for(const [key, value] of Object.entries(mapDataCardsCopie)){
        mapDataCards.push({[key]: value})
    }  
    /* for(const [key, value] of Object.entries(freeCards)){
        mapDataTest.push({[key]: value})
    } */
    //Les données sont formaté et issue de la DB
    for(const [key, value] of Object.entries(collectionCardsInDB)){
        formatedData.push({[key]: value})
    }
    let collectionNameInDB = []
    for(const [key, value] of Object.entries(collectionCardsInDB)){
        collectionNameInDB.push(key)
    }

    console.log("copyFreeCards : ",copyFreeCards)
    for(let i = 0; i < copyFreeCards.length; i++){
        console.log("collectionCardsInDB : ",formatedData)
        //Faire une boucle qui permet de vérifier si les deux collections sont exact si ok faire la modif des data revisionDate 
        const stockKeys = Object.keys(copyFreeCards[i])
        console.log("stockKeys : ",stockKeys)
        // permet d'acceder au cartes dans l'élément cards de chaque collection de freeCopyCards
        let refCards = copyFreeCards[i][stockKeys].cards
        let keysCards = Object.keys(refCards)
        for(let x = 0 ; x < keysCards.length; x++){
            const stockBis = keysCards[x]
            console.log('je suis dans une deuxième boucle : ', keysCards[x])
            console.log('refCards', refCards[stockBis].revisionDate )
        }

    
    }
    
    
    const filterCollection = collectionNameInDB.filter(element => {
        /* console.log(element) */
    })
    
    
    const arrarayTest = mapDataCards.concat(freeCards)
    
    /* copyFreeCards.forEach(element => {
        const stock = Object.values(element).map((cards) => console.log("cards ds map : ",cards))
        console.log('stock : ', stock[0].cards)

    }); */
    
    const displayCollection = arrarayTest.map((element) => {
        let dataCardsMap = {
            nbreCards: '',
            cards: '',
            nameCollection: '',
            categorie: ''
        }
        Object.values(element).map((cards) => {
            let saveNbre = cards.cards
            dataCardsMap.nbreCards = Object.keys(saveNbre).length
            dataCardsMap.cards = cards
            dataCardsMap.categorie = cards.categorie
            return dataCardsMap
        })
        dataCardsMap.nameCollection = Object.keys(element).toString()
        return (
            <li className="liMapCollectionCards">
                <img src={dataCardsMap.categorie == "anatomy" ? OsCasse : dataCardsMap.categorie == "physio" ? Physio : interogationPoint} />
                <div className="divLiMapCollectionCards">
                    <h3>{dataCardsMap.nameCollection}</h3>
                    { <p>{dataCardsMap.nbreCards} {dataCardsMap.nbreCards > 1 ? 'Cartes' : 'Carte'}</p> }
                </div>
                <Link to={{pathname:"/carte", state:{dataCardsMap}}}> 
                    <img src={Play}/>
                </Link>
            </li>
        )
    })

    return (
        <Fragment>
            <div className="sombreModal">
                {modalCheck ? (modal) : (null)}
            </div>
            <div className="containerUl">
                <h2>Mes collections</h2>
                <div className='divBtnPlus'>
                    <button onClick={() => handleClickBtn()}><img id='btnPlus' src={btnPlus}/></button>
                </div>
                <ul>
                    {displayCollection}
                </ul>
            </div>
        </Fragment>
        
    )
}

export default Collection
