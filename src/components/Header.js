import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

function Header (props) {
    console.log('je suis dans header props : ', props)
    const [idUser, setIdUser] = useState('Bienvenue : ', props.props)

    
    return (
        <header className="App-header">
                <h1><Link to="/">Flas Anatomy Learning</Link></h1>
                <h2>{idUser}</h2>
        </header>
    )
}

export default Header