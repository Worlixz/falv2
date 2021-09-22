import React, {useState, useContext, useEffect} from 'react'
import Blob from '../assets/Blob.png'
import { FirebaseContext } from './Firebase/index'
import Loader from './Loader'

function Profil(props) {

    const firebase = useContext(FirebaseContext)
    
    const [userSession, setUserSession] = useState(null)
    const [dataProfil, setDataProfil] = useState(props.dataUser)

    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/')
        })
        return () => {
            listener()
        }
    }, [userSession])


    console.log("Props Profil : ", dataProfil)

    const selector = (
        <select>
            <optgroup label="-- STAPS --">
                <option>Staps - Licence 1</option>
                <option>Staps - Licence 2</option>
                <option>Staps - Licence 3</option>
                <option>Staps - Master 1</option>
                <option>Staps - Master 2</option>
            </optgroup>
            <optgroup label="-- OSTEOPHATIE --">
                <option>Ostéophatie - Licence 1</option>
                <option>Ostéophatie - Licence 2</option>
                <option>Ostéophatie - Licence 3</option>
                <option>Ostéophatie - Master 1</option>
                <option>Ostéophatie - Master 2</option>
            </optgroup>
        </select>
    )

    return userSession === null ? (
        <Loader />
    ) : (
        <div className="containerProfil">
            <div className="blobProfil">
                <img src={Blob} />
                <div className="containerInfoImg">
                    <h3>Nom - Prénom</h3>
                    <p>DOE John</p>
                </div>
            </div>
            <div className="displayInfo">
                {/* <div className="containerInfo">
                    <h3>Nom - Prénom</h3>
                    <p>DOE John</p>
                </div> */}
                <div className="containerInfo">
                    <h3>Pseudo</h3>
                    <p>{/* {dataProfil.userName} */}</p>
                </div>
                <div className="containerInfo">
                    <h3>Email</h3>
                    <p>{/* {dataProfil.email} */}</p>
                </div>
                <div className="containerInfo">
                    <h3>Mot de passe</h3>
                    <button>Réinitilisation</button>
                </div>
                <div className="containerInfo">
                    <h3>Etude</h3>
                    <p>Ostéophatie - Lience 2</p>
                </div>
            </div>
        </div>
    )
}

export default Profil
