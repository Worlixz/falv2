import React, { Fragment, useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from './Firebase'
import OsCasse from '../assets/Cards/os-casse.svg'
import deleteSVG from '../assets/Cards/delete.svg'
import Physio from '../assets/Cards/poumons.svg'
import Play from '../assets/Cards/bouton-jouer.svg'
import btnPlus from '../assets/plus.svg'
import btnReload from '../assets/reload.svg'
import btnClose from '../assets/close.svg'
import interogationPoint from '../assets/Cards/interrogationPoint.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { freeCards } from './freeCards'


toast.configure()


function Collection(props) {

    const firebase = useContext(FirebaseContext)
    const assombrir = document.querySelector('.sombreModal')

    const propsHistory = props.propsHistory
    const dataNewCollection = {
        nameCollection : '',
        categorie: 'default',
        etiquette: '',
        cards: {}
    }

    const formatedData = []
    const formatedDataKeys = []

    const dataBrut = []
    const dataBrutKey = []

    
    const [modalCheck, setModalCheck] = useState(false)
    const [newCollection, setNewCollection] = useState(dataNewCollection)
    const [userSession, setUserSession] = useState(props.userSession.uid.toString())
    const [collectionCardsInDB, setCollectionCardsInDB] = useState([])
    const [userStatut, setUserStatut] = useState()

    let copyFreeCards = freeCards
    copyFreeCards.flat()
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

    const handleDeleteCollection = (collectionName) => {
        firebase.deleteCollection(userSession.uid, collectionName)
        .then(() => {
            console.log("suppression DB ok")
        }).catch((err) => {
            console.log(err)
        })
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

    
    // MISE EN FORME DES DONNEES POUR EXPLOITATION
    for(const [key, value] of Object.entries(collectionCardsInDB)){
        formatedData.push({[key]: value})
        formatedDataKeys.push(key)
    }
    for(const [key, value] of Object.entries(copyFreeCards)){
        dataBrut.push(value)
    }
    for(let i = 0; i < dataBrut.length; i++){
        const stock = Object.keys(dataBrut[i])
        const stringKey = stock[0]
        dataBrutKey.push(stringKey)
    }


    // CREATION DE DEUX TABLEAUX => arrayNoDoublons et arrayForDate : 
        // 1 - A toute les cartes valide question / reponse stockées en dur et fusionnées
        // 2 - Uniquement les cartes issus de la base de données mais avec la revisionDate correcte
    let arrayForMap = []
    arrayForMap = formatedData.concat(copyFreeCards)
    
    const arrayNoDoublons = arrayForMap.filter(element => {
        const stock = Object.keys(element)
        const stockBis = stock[0]
        return element[stockBis].etiquette !== undefined
    })
    const arrayForDate = formatedData.filter(element => {
        const stock = Object.keys(element)
        const stockBis = stock[0]
        return element[stockBis].etiquette == undefined
    })

    const displayCollection = arrayNoDoublons.map((element) => {

        const stock = Object.keys(element)
        const stockName = stock[0]

        let index = dataBrutKey.indexOf(stockName)
        let stockCardsDate = []
        console.log("element", element)
        if (index !== -1){            
            let stockValuesDate = []
            if(arrayForDate[index]){
                stockValuesDate = Object.values(arrayForDate[index])
                stockCardsDate = stockValuesDate[0].cards
            }
        }
    
        
        let dataCardsMap = {
            nbreCards: '',
            cards: '',
            nameCollection: '',
            categorie: ''
        }
        Object.values(element).map((cards) => {
            let saveNbre = cards.cards
            console.log(cards)
            dataCardsMap.nbreCards = Object.keys(saveNbre).length
            dataCardsMap.cards = cards
            dataCardsMap.categorie = cards.categorie
            dataCardsMap.abonnement = cards.abonnement
            dataCardsMap.deleteOption = cards.deleteOption
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
                    {dataCardsMap.deleteOption ? (<img id='deleteCollectionBTN' src={deleteSVG} onClick={() => handleDeleteCollection(dataCardsMap.nameCollection)} />) : (null)} 
                    
                <Link to={{pathname:"/carte", state:{dataCardsMap, element}}}>
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
                    <button onClick={() => reloadPage()}><img id='btnReload' src={btnReload}/></button>
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
