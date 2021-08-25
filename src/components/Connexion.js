import React, {useState, useContext, Fragment} from 'react'
import {FirebaseContext} from '../components/Firebase/index'
import Header from './Header'

function Connexion(props) {

    const firebase = useContext(FirebaseContext)

    let dataConnexion = {
        email: "",
        password: ""
    }

    const [loginDataConnexion, setLoginDataConnexion] = useState(dataConnexion)

    const handleChange = (e) => {
        setLoginDataConnexion({...loginDataConnexion, [e.target.id]: e.target.value})
    }
  
    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.loginUser(loginDataConnexion.email, loginDataConnexion.password)
        .then((authUser) => {
            props.history.push('/accueil')
        })
        
    }

    return (
        <Fragment>
            <Header/>
                <div className="containerSignUp">
                    <form onSubmit={handleSubmit} id="form">
                        <h3 id="inscriptionFormH3">CONNEXION</h3>
                        <div className="containerInFormConnexion">
                            <div>
                                <label>Email</label>
                                <input required onChange={handleChange} id="email" type="email"/>
                            </div>
                            <div>
                                <label>Mot de passe</label>
                                <input onChange={handleChange} id="password" type="password"/>
                            </div>
                        </div>
                        <button id="inscriptionFormConnexion">Se connecter</button>
                        <a href="/">Mot de passe oublié ?</a>
                    </form>
                </div>
        </Fragment>
    )
}

export default Connexion
