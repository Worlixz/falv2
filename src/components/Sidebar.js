import React, { Fragment, useContext, useState, useEffect} from 'react'
import User from './User'
import Collection from './Collection'
import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom'
import { Link } from 'react-router-dom'
import {FirebaseContext} from './Firebase/index'
import logoSignOut from "../assets/sidebar/logout.svg"
import rightArrow from '../assets/sidebar/rightArrow.png'
import imgHouse from '../assets/sidebar/house_grey.svg'
import cardsImg from '../assets/sidebar/cards_grey.svg'
import profilImg from '../assets/sidebar/profil_grey.svg'
import arrowRightSidebard from '../assets/sidebar/arrowRightSidebard.png'


function Sidebar(props) {

    const firebase = useContext(FirebaseContext)

    const hangleSignOut = (e) => {
        firebase.signoutUser()
    }

    const [imgCheck, setImgCheck] = useState(true)
    const [userSession, setUserSession] = useState(null)
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged((user) => {
            user ? (setUserSession(user)) : props.history.push('/')
        })
        if(userSession !== null){
            firebase.userData(userSession.uid)
            .get()
            .then((doc) => {
                const myData = doc.data()
                setUserData(myData)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        return () => {
            listener()
        }
    }, [userSession])
    
    const imgArow = document.querySelector('.rightArrow')
    const sidebar = document.querySelector('.sideBar')
    
    const handleModifImg = () => {
        setImgCheck(!imgCheck)
        if(imgCheck){
            imgArow.classList.remove('noDisplayRightArow')
            imgArow.classList.add('displayRightArow')
            sidebar.classList.add('sideBarDisplay')
            sidebar.classList.remove('noSideBarDisplay')
        }else{
            imgArow.classList.add('noDisplayRightArow')
            imgArow.classList.remove('displayRightArow')
            sidebar.classList.add('noSideBarDisplay')
            sidebar.classList.remove('sideBarDisplay')
        }
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
        <img onClick={handleModifImg} className="rightArrow" src={arrowRightSidebard} />
        <ul>
        {imgCheck ? (<Fragment>
            <li className='profilLi' id="liSidebar">
                <img src={userData ? (userData.profilPicture) : (profilImg)}/>
            </li>
            <li id="liSidebar">
                <NavLink activeClassName="active" to='/user'><img src={imgHouse}/></NavLink>
            </li>
            <li id="liSidebar">
                <NavLink activeClassName="active" to='/collection'><img src={cardsImg}/></NavLink>
            </li>
            <li id="liSidebar"> 
                <NavLink activeClassName="active" to='/profil'><img src={userData ? (userData.profilPicture) : (profilImg)}/></NavLink>
            </li>
        </Fragment>) : (<Fragment>
            <li className='profilLi' id="liSidebar">
                <img src={userData ? (userData.profilPicture) : (profilImg)}/>
                <h2>{props.props.userName}</h2>
            </li>
            <li id="liSidebar">
                <img src={imgHouse}/>
                <NavLink activeClassName="active" to='/user'>Accueil</NavLink>
            </li>
            <li id="liSidebar">
                <img src={cardsImg}/>
                <NavLink activeClassName="active" to='/collection'>Mes collections</NavLink>
            </li>
            <li id="liSidebar">
                <img src={userData ? (userData.profilPicture) : (profilImg)}/>
                <NavLink activeClassName="active" to='/profil'>Profil</NavLink>
            </li>
        </Fragment>)}
        
            
        </ul>
        <div className="signOut">
            <button onClick={hangleSignOut}><img id="logoSignOut" src={logoSignOut}/></button>
            {imgCheck ? (null) : (<h4>Déconnexion</h4>)}
        </div>
        </div>
    )
}

export default Sidebar
