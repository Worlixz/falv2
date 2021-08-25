import React from 'react'
import Accueil from './Accueil'
import Carte from './Carte'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <div className="sideBar">
        <ul>
            <li><Link to='/accueil'>Accueil</Link></li>
            <li><Link to='/carte'>Carte</Link></li>
        </ul>
            Hello Sidebar
        </div>
    )
}

export default Sidebar
