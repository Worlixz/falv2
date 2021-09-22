import React, { Fragment, useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from './Firebase'
import OsCasse from '../assets/Cards/os-casse.svg'
import Physio from '../assets/Cards/poumons.svg'
import Play from '../assets/Cards/bouton-jouer.svg'
import btnPlus from '../assets/plus.svg'
import btnClose from '../assets/close.svg'
import interogationPoint from '../assets/Cards/interrogationPoint.svg'


function Collection(props) {

    const firebase = useContext(FirebaseContext)

    const assombrir = document.querySelector('.sombreModal')

    const propsHistory = props.propsHistory
    const dataNewCollection = {
        nameCollection : '',
        categorie: 'default',
        etiquette: ''
    }
    const mapDataCards = []
    const mapDataCardsCopie = props.dataCards
    
    const [modalCheck, setModalCheck] = useState(false)
    const [newCollection, setNewCollection] = useState(dataNewCollection)
    const [userSession, setUserSession] = useState(props.userSession.uid.toString())
    


    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : propsHistory.push('/')
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
        console.log(newCollection)
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
        
    for(const [key, value] of Object.entries(mapDataCardsCopie)){
        mapDataCards.push({[key]: value})
    } 
       
    const displayCollection = mapDataCards.map((element) => {
        let dataCardsMap = {
            nbreCards: '',
            cards: '',
            nameCollection: '',
            categorie: ''
        }
        Object.values(element).map((cards) => {
            dataCardsMap.nbreCards = Object.keys(cards).length -1
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
