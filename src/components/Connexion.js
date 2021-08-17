import React, {useState} from 'react'

function Connexion() {

    let dataConnexion = {
        email: "",
        password: ""
    }

    const [loginDataConnexion, setLoginDataConnexion] = useState(dataConnexion)

    const handleChange = (e) => {
        setLoginDataConnexion({...loginDataConnexion, [e.target.id]: e.target.value})
    }
    console.log(loginDataConnexion)

    return (
        <div className="containerSignUp">
            <form id="form">
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
    )
}

export default Connexion
