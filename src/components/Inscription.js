import React, {useEffect, useState, useContext, Fragment} from 'react'
import {FirebaseContext} from '../components/Firebase/index'
import Header from './Header'

function Inscription(props) {

    const firebase = useContext(FirebaseContext)

    let data = {
        userName: "",
        email: "",
        password: "",
    }

    const [confirmPassword, setConfirmPassword] = useState("")
    const [loginData, setLoginData] = useState(data)

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.signupUser(loginData.email, loginData.password)
        .then((authUser)=>{
            return (firebase.user(authUser.user.uid).set({
                userName: loginData.userName,
                email: loginData.email
            }))
        })
        .then(()=>{
            props.history.push('/user')
        })
        .catch((e) => {
            console.error(e)
        })
    }

    // Mise en place d'un Regex pour la vérification de la condition du mot de passe

    /* let strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g")
    console.log(strongRegex.test(loginData.password)) */
    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.id]: e.target.value})
    }
    
    const btn = loginData.password === confirmPassword && loginData.password !== "" ? (<button id="inscriptionFormSubmit">Inscription</button>) : (<button id="inscriptionFormSubmit" className="disabled" disabled>Inscription</button>)
    

    return (
        <Fragment>
            <Header/>
        <div className="containerSignUp">
            <form onSubmit={handleSubmit} id="form">
                <h3 id="inscriptionFormH3">INSCRIPTION</h3>
                <div className="containerInForm">
                    <div>
                        <label>Nom d'utilisateur</label>
                        <input required onChange={handleChange} id="userName" type="text"/>
                    </div>
                    <div>
                        <label>Email</label>
                        <input required onChange={handleChange} id="email" type="email"/>
                    </div>
                    <div>
                        <label>Mot de passe</label>
                        <input onChange={handleChange} id="password" type="password"/>
                        <div>
                            <p style={{fontSize: "11px"}}>1 caractère spécial ( @ ; ! + - / ) <br/>1 majuscule <br/>1 chiffre</p>
                        </div>
                    </div>
                    <div>
                        <label>Confirmation du mot de passe</label>
                        <input onChange={handleConfirmPassword} id="confirmationPassword" type="password"/>
                    </div>
                </div>
                {btn}
            </form>
        </div>
        </Fragment>
    )
}

export default Inscription
