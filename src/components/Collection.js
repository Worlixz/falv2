import React, { Fragment, useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from './Firebase'
import OsCasse from '../assets/Cards/os-casse.svg'
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

    let arrayForMap = []
    arrayForMap = formatedData.concat(copyFreeCards)
    
    const arrayTest = arrayForMap.filter(element => {
        const stock = Object.keys(element)
        const stockBis = stock[0]
        return element[stockBis].etiquette !== undefined
    })
    // Dans ArrayTest j'ai toutes les cartes fusionné entre la db et le stokage brut sans doublon car élimination des cartes de la DB manque 'etiquette'
    console.log(" arrayTest : ",arrayTest)

    // Je doit remplacer la date de revision des cartes en doublons entre la DB et le stockage brut 
    // parcourrir ArrayTest pour chaque itération 
    for(var a = 0; a < arrayTest.length; a++){
        const stock = Object.keys(arrayTest[a])
        const stringKeys = stock[0]
        console.log("stringKeys : ",stringKeys)
        let index = formatedDataKeys.indexOf(stringKeys)
        if (index !== -1){
            console.log("correspondance")
            console.log("arrayTest [a] : ",arrayTest[a])
            console.log("dataBrut : ", formatedData[index])
        }
        /* console.log("dataBrutKey : ", dataBrutKey.indexOf(stringKeys)) */

        
    }
        // Vérifier que le nom de la collection correspond
            // Si correspondance alors
                // Ecraser la date de résivion de arrayTest par freeCards
            // Sinon passer à l'itération suivante

    const displayCollection = arrayTest.map((element) => {
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
