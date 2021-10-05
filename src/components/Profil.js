import React, {useState, useContext, useEffect} from 'react'
import Blob from '../assets/Blob.png'
import { FirebaseContext } from './Firebase/index'
import Loader from './Loader'
import iconProfil from '../assets/sidebar/icon_profil_gris.png'
import pencil from '../assets/CardsManagement/pencil.svg'
import crossRed from '../assets/CardsManagement/crossRedClose.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profil(props) {

    const firebase = useContext(FirebaseContext)
    
    const [userSession, setUserSession] = useState(null)
    const [dataProfil, setDataProfil] = useState({
        userName: '',
        email: '',
        nomPrenom: '',
        etude: '',
        profilPicture: ''
    })

    const [modeEdition, setModeEdition] = useState(false)

    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/')
        })

        if(userSession !== null) {
            firebase.userData(userSession.uid)
            .get()
            .then((doc) => {
                if(doc.exists){
                    console.log(doc.data())
                    const myData = doc.data()
                    setDataProfil({
                        userName: myData.userName ? myData.userName : "A renseigner",
                        email: myData.email ? myData.email : "A renseigner",
                        nomPrenom: myData.nomPrenom ? myData.nomPrenom : "A renseigner",
                        etude: myData.etude ? myData.etude : "A renseigner",
                        profilPicture: myData.profilPicture ? myData.profilPicture : iconProfil
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })

        return () => {
            listener()
        };
        }
    }, [userSession])

    const handleEditionMode = () => {
        setModeEdition(!modeEdition)
    }

    const handleChange = (e) => {
        setDataProfil({...dataProfil, [e.target.id]: e.target.value})
        console.log(dataProfil)
    }

    const handleUpdateProfilData = (e) => {
        e.preventDefault()
        firebase.updateProfil(userSession.uid, dataProfil.userName, dataProfil.email, dataProfil.nomPrenom, dataProfil.etude, dataProfil.profilPicture)
        .then(() => {
            console.log("ok")
            setModeEdition(!modeEdition)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleResetPassword = (e) => {
        e.preventDefault()
        firebase.resetPassword(dataProfil.email)
        .then(() => {
            console.log("reset envoyé")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const selector = (
        <select id="etude">
            <optgroup label="-- STAPS --">
                <option value="Staps - Licence 1">Staps - Licence 1</option>
                <option value="Staps - Licence 2">Staps - Licence 2</option>
                <option value="Staps - Licence 3">Staps - Licence 3</option>
                <option value="Staps - Master 1">Staps - Master 1</option>
                <option value="Staps - Master 2">Staps - Master 2</option>
            </optgroup>
            <optgroup label="-- OSTEOPHATIE --">
                <option value="Ostéophatie - Licence 1">Ostéophatie - Licence 1</option>
                <option value="Ostéophatie - Licence 1">Ostéophatie - Licence 2</option>
                <option value="Ostéophatie - Licence 1">Ostéophatie - Licence 3</option>
                <option value="Ostéophatie - Master 1">Ostéophatie - Master 1</option>
                <option value="Ostéophatie - Master 2">Ostéophatie - Master 2</option>
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
                    {modeEdition ? (<p id="paraModifIMG">Mettre une image d'une grandeur de 150*150px <br />Pour redimentionnser votre image :<a target="_blank" href="https://convert-my-image.com/ImageConverter_Fr"> C'est par ici !</a></p>) : (null)}
                    <div className="containerModifProfil">
                        <img src={dataProfil.profilPicture} />
                        {modeEdition ? (<img onClick={handleEditionMode} id="modificationPencil" src={crossRed} />) : (<img onClick={handleEditionMode} id="modificationPencil" src={pencil} />)} 
                    </div>
                    {modeEdition ? (
                        <input type="file" id="profilPicture" name="profile_pic"
                            accept=".jpg, .jpeg, .png"></input>) : (null)}
                </div>
            </div>
            <div className="displayInfo">
                <div className="containerInfo">
                    <h3>Nom - Prénom</h3>
                    {modeEdition ? (<input onChange={handleChange} id="nomPrenom" value={dataProfil.nomPrenom} />) : (<p>{dataProfil.nomPrenom}</p>)}
                </div>
                <div className="containerInfo">
                    <h3>Pseudo</h3>
                    {modeEdition ? (<input onChange={handleChange} id="userName" value={dataProfil.userName} />) : (<p>{dataProfil.userName}</p>)}
                </div> 
                <div className="containerInfo">
                    <h3>Email</h3>
                    <p>{dataProfil.email}</p>
                </div>
                <div className="containerInfo">
                    <h3>Mot de passe</h3>
                    <button onClick={handleResetPassword}>Réinitilisation</button>
                </div>
                <div className="containerInfo">
                    <h3>Etude</h3>
                    {modeEdition ? (
                        <select onChange={handleChange} value={dataProfil.etude} id="etude">
                            <optgroup label="-- STAPS --">
                                <option value="Staps - Licence 1">Staps - Licence 1</option>
                                <option value="Staps - Licence 2">Staps - Licence 2</option>
                                <option value="Staps - Licence 3">Staps - Licence 3</option>
                                <option value="Staps - Master 1">Staps - Master 1</option>
                                <option value="Staps - Master 2">Staps - Master 2</option>
                            </optgroup>
                            <optgroup label="-- OSTEOPHATIE --">
                                <option value="Ostéophatie - Licence 1">Ostéophatie - Licence 1</option>
                                <option value="Ostéophatie - Licence 1">Ostéophatie - Licence 2</option>
                                <option value="Ostéophatie - Licence 1">Ostéophatie - Licence 3</option>
                                <option value="Ostéophatie - Master 1">Ostéophatie - Master 1</option>
                                <option value="Ostéophatie - Master 2">Ostéophatie - Master 2</option>
                            </optgroup>
                    </select>
                    ) : (<p>{dataProfil.etude}</p>)}
                    
                </div>
                {modeEdition ? (<div className="containerInfo">
                    <button id="sauvegarde" onClick={handleUpdateProfilData}>Sauvegarder</button>
                </div>) : null}
                
            </div>
        </div>
    )
}

export default Profil
