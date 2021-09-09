import React, { Fragment, useState} from 'react'
import { Link } from 'react-router-dom'
import OsCasse from '../assets/Cards/os-casse.svg'
import Physio from '../assets/Cards/poumons.svg'
import Play from '../assets/Cards/bouton-jouer.svg'
import btnPlus from '../assets/plus.svg'
import btnClose from '../assets/close.svg'


function Carte(props) {

    const propsHistory = props.propsHistory
    const dataUser = props.dataUser
    const dataCards = props.dataCards
    const dataNewCollection = {
        nameCollection : '',
        categorie: ''
    }

    console.log(props)

    const mapDataCards = []
    const mapDataCardsCopie = props.dataCards

    const [modalCheck, setModalCheck] = useState(false)
    const [newCollection, setNewCollection] = useState(dataNewCollection)

    const handleClickBtn = () => {
        setModalCheck(true)
    }

    const handleCloseModal = () => {
        setModalCheck(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(newCollection)
    }

    const handleChange = (e) => {
        setNewCollection({...newCollection, [e.target.id]: e.target.value})
        console.log(newCollection)
    }

    const modal = (
        <div className="modal">
            <button className="btnCloseModal" onClick={() => handleCloseModal()}><img src={btnClose}  /></button>
            <form onSubmit={handleSubmit} className="formModal">
                <label id="nameCollection">Créer ta nouvelle collection : </label>
                <input type="text" id="nameCollection" onChange={handleChange}/>
                <label id="categorie">Catégorie :</label>
                <select id="categorie" onChange={handleChange}>
                    <option value="default">--Default--</option>
                    <option value="anatomy">Anatomie</option>
                    <option value="physio">Physiologie</option>
                    <option value="autre">Autres</option>
                </select>
                <button>Créer</button>
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
            dataCardsMap.nbreCards = Object.keys(cards).length
            dataCardsMap.cards = cards
            dataCardsMap.categorie = cards.categorie
            return dataCardsMap
        })
        dataCardsMap.nameCollection = Object.keys(element).toString()
        return (
            <li className="liMapCollectionCards">
                <img src={dataCardsMap.categorie == "anatomy" ? OsCasse : Physio} />
                <div className="divLiMapCollectionCards">
                    <h3>{dataCardsMap.nameCollection}</h3>
                    { <p>{dataCardsMap.nbreCards} {dataCardsMap.nbreCards > 1 ? 'Cartes' : 'Carte'}</p> }
                </div>
                <Link to={{pathname:"/quiz", state:{dataCardsMap}}}> 
                    <img src={Play}/>
                </Link>
            </li>
        )
    })

    return (
        <Fragment>
            <div className="containerUl">
                <ul>
                    {displayCollection}
                    <div className='divBtnPlus'>
                        <button onClick={() => handleClickBtn()}><img id='btnPlus' src={btnPlus}/></button>
                    </div>
                </ul>
                {modalCheck ? (modal) : (null)}
            </div>
        </Fragment>
        
    )
}

export default Carte
