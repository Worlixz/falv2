import React, {useState, useEffect,useContext} from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from './Firebase/index'
import Loader from './Loader'

function Header () {

    return (
        <header className="App-header">
                <h1><Link to="/">Flash Anatomy Learning</Link></h1>
        </header>
    )
}

export default Header