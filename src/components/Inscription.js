import React, {useEffect, useState, useContext} from 'react'
import {FirebaseContext} from '../components/Firebase/index'

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
            props.history.push('/accueil')
        })
        console.log({
            user: loginData.userName,
            email: loginData.email,
            password: loginData.password,
            confirmPassword
        })
        /* console.log(`user : ${loginData.userName} | email : ${loginData.email} | password : ${loginData.password} | confirmationPassword : ${confirmPassword}`) */
    }

    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.id]: e.target.value})
    }
    
    const btn = loginData.password === confirmPassword && loginData.password !== "" ? (<button id="inscriptionFormSubmit">Inscription</button>) : (<button id="inscriptionFormSubmit" className="disabled" disabled>Inscription</button>)
    

    return (
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
    )
}

export default Inscription
