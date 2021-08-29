import React, {useState, useEffect,useContext} from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from './Firebase/index'
import Loader from './Loader'

function Header (props) {

    const firebase = useContext(FirebaseContext)

    const handleDeconnexion = (e) => {
        firebase.signoutUser()
    }

    return props.props == null ? 
    (
        <header className="App-header">
                <h1><Link to="/">Flash Anatomy Learning</Link></h1>
                <button onClick={handleDeconnexion}>Déco</button>
        </header>
    ) : (
        <header className="App-header">
                <h1><Link to="/">Flash Anatomy Learning</Link></h1>
                <button onClick={handleDeconnexion}>Déco</button>
                <h2>Bienvenue : {props.props.userName}</h2> 
        </header>
    )
}

export default Header