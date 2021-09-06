import React, { Fragment, useContext} from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import ListeCollection from './ListeCollection'
import { FirebaseContext } from './Firebase/index'
import OsCasse from '../assets/Cards/os-casse.svg'
import Physio from '../assets/Cards/poumons.svg'
import Play from '../assets/Cards/bouton-jouer.svg'

function Carte(props) {

    const mapDataCards = props.dataCards
    console.log("je suis dans mapDataCards : ", mapDataCards)
 
    for (const [key, value] of Object.entries(mapDataCards)) {
        console.log(`${key}: ${value}`);
        console.log(Object.keys(value).length)
        return <ListeCollection />
    } 

    /* console.log('Test ', Object.keys(mapDataCards))
    console.log('Test bis : ', Object.values(mapDataCards)) */
    

    const  handleClick = (e) => {
        console.log(e)
        console.log('je viens de lancer le quiz')
    }

    return (
        <Fragment>
            <div className="containerUl">
                <ul className="mapCollectionCards">
                    <li className='liMapCollectionCards'>
                        <img src={OsCasse} />
                        <div className="divLiMapCollectionCards">
                            <h3>Titre de la carte</h3>
                            <p>10 Cartes</p>
                        </div>
                        <img src={Play} id="btnPlay" onClick={handleClick}/>
                    </li>
                    <li className='liMapCollectionCards'>
                        <img src={OsCasse} />
                        <div className="divLiMapCollectionCards">
                            <h3>Titre de la carte bis</h3>
                            <p>18 Cartes</p>
                        </div>
                        <img src={Play} id="btnPlay" onClick={handleClick}/>
                    </li>
                </ul>
            </div>
        </Fragment>
        
    )
}

export default Carte
