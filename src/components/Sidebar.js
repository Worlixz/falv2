import React, { useContext} from 'react'
import User from './User'
import Carte from './Carte'
import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom'
import { Link } from 'react-router-dom'
import iconCards from '../assets/sidebar/icon_cards_gris.png'
import iconProfil from '../assets/sidebar/icon_profil_gris.png'
import {FirebaseContext} from './Firebase/index'
import logoSignOut from "../assets/sidebar/logout.svg"


function Sidebar(props) {

    const firebase = useContext(FirebaseContext)

    const hangleSignOut = (e) => {
        firebase.signoutUser()
    }

    return props.props == null ? (
        <div className="sideBar">
        <ul>
            <li><Link to='/accueil'>Accueil</Link></li>
            <li><Link to='/carte'>Mes collections</Link></li>
            <li><Link to='/profil'>Profil</Link></li>
        </ul>
        </div>
    ) : (
        <div className="sideBar">
        <ul>
        <li id='profilLi'>
                <img src={iconProfil}/>
                <h2>{props.props.userName}</h2>
            </li>
            <li>
                <img src={iconCards}/>
                <NavLink activeClassName="active" to='/user'>Accueil</NavLink>
            </li>
            <li>
                <img src={iconCards}/>
                <NavLink activeClassName="active" to='/carte'>Mes collections</NavLink>
            </li>
            <li>
                <img src={iconProfil}/>
                <NavLink activeClassName="active" to='/profil'>Profil</NavLink>
            </li>
        </ul>
        <div className="signOut">
            <button onClick={hangleSignOut}><img id="logoSignOut" src={logoSignOut}/></button>
            <h4>Déconnexion</h4>
        </div>
        </div>
    )
}

export default Sidebar
