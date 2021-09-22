import React, {useState, useEffect, useContext, Fragment} from 'react'
import { Link } from 'react-router-dom'
import arow from '../assets/up-arrow-angle.svg'
import crossRed from '../assets/CardsManagement/crossRedClose.svg'
import pencil from '../assets/CardsManagement/pencil.svg'
import btnClose from '../assets/close.svg'
import check from '../assets/CardsManagement/check.svg'
import btnPlus from '../assets/plus.svg'
import { FirebaseContext } from './Firebase'
import { nanoid } from 'nanoid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Carte(props) {

    const firebase = useContext(FirebaseContext)
    console.log(props)
    
    
    const dataCollection = props.propsHistory.location.state.dataCardsMap
    const dataCards = props.propsHistory.location.state.dataCardsMap.cards

    const assombrir = document.querySelector('.sombreModalCardsManagement')

    const [modalCheck, setModalCheck] = useState(false)
    const [modalCreation, setModalCreation] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [userSession, setUserSession] = useState("")
    const [modalData, setModalData] = useState({
        question: "",
        reponse: '',
        type: '',
        id: '',
        p1: "",
        p2: "",
        p3: "",
        p4: ""
    })

    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/')
        })
        return () => {
            listener()
        }
    }, [userSession])

        
    const handleClickBtn = (creattionCards) => {
        setModalCheck(true)
        setModalData(creattionCards) //Initialisation des données su state en fonction de la carte cliqué
        console.log(creattionCards)
        assombrir.style.zIndex = "2"
    }
    
    const handleChange = (e) => {
        // Modification du state de handleClickBtn 
        setModalData({...modalData, [e.target.id]: e.target.value})
        console.log("modal Data : ",modalData)
        
    }
    
    const handleCloseModal = (e) => {
        setModalCheck(false)
        setModalData("")
        /* setNewCollection(dataNewCollection) */
        assombrir.style.zIndex = "-2"
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.modificationCards(userSession.uid, dataCollection, modalData)
    }
    const handleSubmitCreationCards = (e) => {
        e.preventDefault()
        modalData.id = nanoid()
        firebase.modificationCards(userSession.uid, dataCollection, modalData)
        .then(() => {
            console.log('ok carte créer')
            setModalData("")
            handleDeleteModalClose()
            toast.success('🦄 Carte créer avec succès !', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
        .catch((err) => {
            console.log(err)
        })
        
    }

    const test = () => {
        setModalData('')
    }
    
    const deleteCards = () => {
        firebase.deleteDataCards(userSession.uid, dataCollection, modalData.id)
        .then(() => {
            window.location.reload()
        })
        setDeleteModal(false)
        assombrir.style.zIndex = "-2"
    }
    
    const handleDeleteModalOpen = (creattionCards) => {
        setModalData(creattionCards)
        setDeleteModal(true)
        assombrir.style.zIndex = "2"
    }
    const handleDeleteModalClose = () => {
        setDeleteModal(false)
        assombrir.style.zIndex = "-2"
    }
    
    const handleModalCreationOpen = () => {
        setModalData("")
        setModalCreation(true)
        assombrir.style.zIndex = "2"
    }
    const handleModalCreationClose = () => {
        setModalCreation(false)
        setModalData("")
        assombrir.style.zIndex = "-2"
    }

    // Pour création carte nécessite : 
        // Générateur ID => nanoid
        // Récupération date pour initialisation : dateCreation + dateRevision
        // Type 
            // Vrai Faux => vraiFaux
            // Quiz => quiz
        // Question
        // Réponse
        //p1
        //p2
        //p3
        //p4
   
    
    
    
    const displayCards = Object.entries(dataCards).map((element) => {
        let creattionCards = {
            question: "",
            reponse: '',
            type: '',
            id: ''
        }
        const idCards = Object.values(element)
        Object.values(element).map((deepElement) => {
            if(deepElement.question != undefined){
                /* console.log("Question : ", deepElement.question)*/
                creattionCards.question = deepElement.question
                creattionCards.type = deepElement.type
                creattionCards.id = idCards[0]
            }
            if(deepElement.reponse != undefined){
                /* console.log("Réponse : " , deepElement.reponse) */
                creattionCards.reponse = deepElement.reponse === true ? (deepElement.reponse.toString()) : deepElement.reponse
            }
            return creattionCards
        })
        return creattionCards.question ? 
            (<div className="cardsCards">
                <div className="cardsCardsDivInfo">
                    <h3 className="cardsTitle">{creattionCards.question}</h3>
                    <p className="cardsText">{creattionCards.reponse}</p>
                </div>
                <div className="cardsCardsDivBTN">
                    <button onClick={() => handleClickBtn(creattionCards)} className="btnCardsManagement"><img id="pencil" src={pencil} /></button>
                    <button className="btnCardsManagement"><img id="crossRed" onClick={() => handleDeleteModalOpen(creattionCards)} src={crossRed} /></button>
                </div>
            </div>) : null
        
    })

    const deleteModalDisplay = (
            <div className="deleteModalDiv">
                <div className="deleteModalTitle">
                    <h4>Est-vous sur de vouloir supprimer cette carte ? </h4>
                </div>
                <div className="deleteModalBTN">
                    <button id="deleteBTN" onClick={() => deleteCards()}>Supprimer</button>
                    <button id="conserverBTN" onClick={() => handleDeleteModalClose()}>Conserver</button>
                </div>
            </div>
    )

    const modal = (
        <Fragment>
            <div className="modalForCardsManagement">
                <button className="btnCloseModal" onClick={() => handleCloseModal()}><img src={btnClose}/></button>
                <form onSubmit={handleSubmit} className="formModalCardsManagement">
                    <h2>Collection</h2>
                    <hr/>
                    <h4>{dataCollection.nameCollection}</h4>
                    <h5>Type de réponse</h5>
                    <select id="type" value={modalData.type} onChange={handleChange}>
                        <option value="vraiFaux">Vrai - Faux</option>
                        <option value="quiz">Quiz</option>
                    </select>
                    <h5 id="question">Question :</h5>
                    <textarea type="text" id="question" value={modalData.question} onChange={handleChange}/> 
                    <h5 id="reponse">Réponse :</h5>
                    {modalData.type == 'vraiFaux' ? (<div className="selectVraiFaux">
                        
                        {modalData.reponse == 'true' ? (<img src={check} />) : (<img src={crossRed} />)}
                        <select id="reponse" value={modalData.reponse} onChange={handleChange}>
                            <option value={true}>Vrai</option>
                            <option value={false}>Faux</option>
                        </select>
                    </div>) : (
                        <div className="quizReponseModification">
                            <textarea id="reponse" value={modalData.reponse} onChange={handleChange} />
                            <h5> Possibilité : </h5>
                            <div className="quizReponsePossibilite">
                                <textarea id="p1"onChange={handleChange}/>
                                <textarea id="p2"onChange={handleChange}/>
                                <textarea id="p3"onChange={handleChange}/>
                                <textarea id="p4"onChange={handleChange}/>
                            </div>
                        </div>
                    )}
                    
                <button className="modificationCards">Modifier ma carte</button>
                </form>
            </div>
        </Fragment>
    )

    // Modif à faire : 
        //gestion des valeurs par defualt pour affichage

    const modalCreationCards = (
        <Fragment>
            <div className="modalForCardsManagement">
                <button className="btnCloseModal" onClick={() => handleModalCreationClose()}><img src={btnClose}/></button>
                <form onSubmit={handleSubmitCreationCards} className="formModalCardsManagement">
                    <h2>Collection</h2>
                    <hr/>
                    <h4>{dataCollection.nameCollection}</h4>
                    <h5>Type de réponse</h5>
                    <select id="type" value={modalData.type} onChange={handleChange}>
                        <option value="vraiFaux" selected>Vrai - Faux</option>
                        <option selected value="quiz">Quiz</option>
                    </select>
                    <h5 id="question">Question :</h5>
                    <textarea type="text" id="question" value={modalData.question} onChange={handleChange}/> 
                    <h5 id="reponse">Réponse :</h5>
                    {modalData.type == 'vraiFaux' ? (<div className="selectVraiFaux">
                        
                        {modalData.reponse == 'true' ? (<img src={check} />) : (<img src={crossRed} />)}
                        <select id="reponse" value={modalData.reponse} onChange={handleChange}>
                            <option value={true}>Vrai</option>
                            <option selected value={false}>Faux</option>
                        </select>
                    </div>) : (
                        <div className="quizReponseModification">
                            <textarea id="reponse" value={modalData.reponse} onChange={handleChange} />
                            <h5> Possibilité : </h5>
                            <div className="quizReponsePossibilite">
                                <textarea id="p1"onChange={handleChange}/>
                                <textarea id="p2"onChange={handleChange}/>
                                <textarea id="p3"onChange={handleChange}/>
                                <textarea id="p4"onChange={handleChange}/>
                            </div>
                        </div>
                    )}
                    
                <button className="modificationCards">Créer ma carte</button>
                </form>
            </div>
        </Fragment>
    )

    return (
        <Fragment>
            <div className="sombreModalCardsManagement">
                {modalCheck ? modal : null}
                {deleteModal ? deleteModalDisplay : null}
                {modalCreation ? modalCreationCards : null}
            </div>
            <div className="containerQuiz">
                <Link to="/collection" id="btnArowPreviously"><img id="arowPreviously" src={arow}/></Link>
                <div className="containerTest">
                    <h2>Collection : {dataCollection.nameCollection}</h2> 
                    <div className="containerCardsAdd">
                        <Link className="btnGo" to={{pathname:"/quiz", state:{dataCards, dataCollection}}}>C'est parti !</Link>
                    </div>
                        <img id="btnPlusQuiz" onClick={() => handleModalCreationOpen()} src={btnPlus} />
                    <div className="containerCardsForManage">
                        {displayCards}  
                    </div>
                </div>
        </div>
        </Fragment>
        
    )
}

export default Carte
