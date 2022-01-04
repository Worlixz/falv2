import React, {useState, useEffect, useContext, Fragment} from 'react'
import { Link } from 'react-router-dom'
import arow from '../assets/up-arrow-angle.svg'
import crossRed from '../assets/CardsManagement/crossRedClose.svg'
import pencil from '../assets/CardsManagement/pencil.svg'
import btnClose from '../assets/close.svg'
import check from '../assets/CardsManagement/check.svg'
import btnPlus from '../assets/plus.svg'
import btnReload from '../assets/reload.svg'
import { FirebaseContext } from './Firebase'
import { nanoid } from 'nanoid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initializeApp } from 'firebase-admin'

function JustCards(props) {
    console.log(props.dataCards)
    const affichage = props.dataCards

    const doublon = Object.values(affichage).map(element => {
        return (<h1>Ceci est la question {element.question}</h1>)
    })
    return (
        <div>
            <p>{doublon}</p>
        </div>
    )
}

export default JustCards
