import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

function Header (dataUser) {
    console.log({
        datauserfromHader: dataUser
    })
    return (
        <header className="App-header">
            <h1><Link to="/">Flas Anatomy Learning</Link></h1>
        </header>
    )

}

export default Header