import React, { Fragment, useContext, useState} from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import ListeCollection from './ListeCollection'
import Quiz from './Quiz'
import { FirebaseContext } from './Firebase/index'
import OsCasse from '../assets/Cards/os-casse.svg'
import Physio from '../assets/Cards/poumons.svg'
import Play from '../assets/Cards/bouton-jouer.svg'


function Carte(props) {

    const mapDataCards = []
    const mapDataCardsCopie = props.dataCards
        
    for(const [key, value] of Object.entries(mapDataCardsCopie)){
        mapDataCards.push({[key]: value})
    } 
    
    const  handleClick = (dataID) => {
        console.log('je suis dans : ', dataID)
    } 
    
    const displayCollection = mapDataCards.map((element) => {
        let nbreCards = 0
        Object.values(element).map((test) => {
            nbreCards = Object.keys(test).length
            return nbreCards
        })
        let nameCollection = Object.keys(element).toString()
        return (
            <li className="liMapCollectionCards">
                <img src={OsCasse} />
                <div className="divLiMapCollectionCards">
                    <h3>{nameCollection}</h3>
                    { <p>{nbreCards} Cartes</p> }
                </div>
                <img src={Play} onClick={() => handleClick(nameCollection)} />
            </li>
        )
    })

    return (
        <Fragment>
            <div className="containerUl">
                <ul>
                    {displayCollection}
                </ul>
            </div>
        </Fragment>
        
    )
}

export default Carte
