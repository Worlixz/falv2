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
import JustCards from './JustCards'

toast.configure()

function Carte(props) {

    const firebase = useContext(FirebaseContext)

    const dataCollection = props.propsHistory.location.state.dataCardsMap
    const dataCards = props.propsHistory.location.state.dataCardsMap.cards

    const collectionName = dataCollection.nameCollection
    const cardsElement = props.propsHistory.location.state.element[collectionName]
    const cardsStock = props.propsHistory.location.state.stockCardsDate
    
    

    const assombrir = document.querySelector('.sombreModalCardsManagement')

    const [modalCheck, setModalCheck] = useState(false)
    const [modalCreation, setModalCreation] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [userSession, setUserSession] = useState("")
    const [modalData, setModalData] = useState({
        question: "",
        reponse: '',
        type: '',
        id: "",
        possibilite : {
            p1: "",
            p2: "",
            p3: "",
            p4: ""
        }
    })
    const [modalDataCreation, setModalDataCreation] = useState({
        question: "",
        reponse: '',
        type: "default",
        id: "",
        possibilite : {
            p1: "",
            p2: "",
            p3: "",
            p4: ""
        }
    })
    const [dataDB, setDataDB] = useState()

    const resetModalData = {
        question: "",
        reponse: '',
        type: '',
        id: "",
        possibilite : {
            p1: "",
            p2: "",
            p3: "",
            p4: ""
        }
    }

    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/')
        })
        firebase.downloadDocument(userSession.uid, dataCollection.nameCollection)
        .get()
        .then((doc) => {
            if(doc.exists){
                console.log("doc data : ", doc.data())
                setDataDB(doc.data())
            }else {
                console.log('no doc')
            }
        })
        .catch((err) => {
            console.log(err)
        })
        return () => {
            listener()
        }
    }, [userSession])

    let keyDataDB = []
    let keyCardsElement = []
    let stockDataDB = []
    let stockCardsElement = []
    let dataCardsQuiz = null
    let dataGlobal = null

    if(dataDB){
        for( const [key, value] of Object.entries(dataDB.cards)){
            keyDataDB.push(key)
            stockDataDB.push(value)
        }
        if(cardsElement){
            for( const [key, value] of Object.entries(cardsElement.cards)){
                keyCardsElement.push(key)
                stockCardsElement.push(value)
            }
        }
        
        if(keyDataDB.length === keyCardsElement.length){
            dataCardsQuiz = dataDB.cards
            dataGlobal = dataDB
        }else if(keyDataDB.length > keyCardsElement.length){
            dataCardsQuiz = dataDB.cards
            dataGlobal = dataDB
        }else{
            dataCardsQuiz = cardsElement.cards
            dataGlobal = cardsElement           
        }
    }else{
        dataCardsQuiz = cardsElement.cards
        dataGlobal = cardsElement        
    }

    const handleClickBtn = (creationCards) => {
        setModalCheck(true)
        setModalData(creationCards) //Initialisation des données su state en fonction de la carte cliqué
        assombrir.style.zIndex = "2"
    }

    const handleClickBtnCreation = () => {
        setModalCreation(true)
        assombrir.style.zIndex = "2"
    }
    
    const handleChange = (e) => {
        // Modification du state de handleClickBtn 
        setModalData({...modalData, [e.target.id]: e.target.value})
    }
    const handleChangeCreation = (e) => {
        // Modification du state de handleClickBtn 
        setModalDataCreation({...modalDataCreation, [e.target.id]: e.target.value})
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
        .then(() => {
            toastModalModification()
            handleDeleteModalClose()
            setModalData("")
        })
        .catch(() => {
            toastModalError()
            handleDeleteModalClose()
            setModalData("")
        })
    }
    const handleSubmitCreationCards = (e) => {
        e.preventDefault()
        modalDataCreation.id = nanoid()
        firebase.creationCards(userSession.uid, dataCollection, modalDataCreation)
        .then(() => {
            toastModalModification()
            handleDeleteModalClose()
            setModalDataCreation({
                question: "",
                reponse: '',
                type: "default",
                id: "",
                possibilite : {
                    p1: "",
                    p2: "",
                    p3: "",
                    p4: ""
                }
            })
        })
        .catch(() => {
            toastModalError()
            handleDeleteModalClose()
            setModalDataCreation({
                question: "",
                reponse: '',
                type: "default",
                id: "",
                possibilite : {
                    p1: "",
                    p2: "",
                    p3: "",
                    p4: ""
                }
            })
        })
        
    }
    
    const deleteCards = () => {
        firebase.deleteDataCards(userSession.uid, dataCollection, modalData.id)
        .then(() => {
            window.location.reload()
        })
        setDeleteModal(false)
        assombrir.style.zIndex = "-2"
    }
    
    const handleDeleteModalOpen = (creationCards) => {
        setModalData(creationCards)
        setDeleteModal(true)
        assombrir.style.zIndex = "2"
    }
    const handleDeleteModalClose = () => {
        setDeleteModal(false)
        assombrir.style.zIndex = "-2"
    }
    
    const handleModalCreationOpen = () => {
        setModalData(resetModalData)
        setModalCreation(true)
        assombrir.style.zIndex = "2"
    }
    const handleModalCreationClose = () => {
        setModalCreation(false)
        setModalData(resetModalData)
        assombrir.style.zIndex = "-2"
    }

    const toastModalModification = () => {
        toast.success("C'est un succès. Pense à actualiser ton navigateur", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
    const toastModalError = () => {
        toast.error("Oups, je crois qu'on a un bug...", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    function reloadPage () {
        window.location.reload()
    }
    
    //const btnCreationCards = /* modalData.type !== ""  && */ modalData.reponse !== "" ? (<button className="modificationCards">Créer ma carte</button>) : (<button disabled className="modificationCards disabled">Créer ma carte</button>)    
    
    const displayCards = Object.entries(dataCardsQuiz).map((element) => {
        console.log("datacollection : ",dataCollection)
        let creationCards = {
            question: "",
            reponse: '',
            type: '',
            id: '',
            possibilite : {
                p1: "",
                p2: "",
                p3: "",
                p4: ""
            }
        }
        const idCards = Object.values(element)
        Object.values(element).map((deepElement) => {
            console.log("deepElement", deepElement)
            if(deepElement.question != undefined){ 
                creationCards.question = deepElement.question
                creationCards.type = deepElement.type
                creationCards.id = deepElement.id_card
            }
            if(deepElement.reponse != undefined){
                creationCards.reponse = deepElement.reponse === true ? (deepElement.reponse.toString()) : deepElement.reponse
            }
            if(deepElement.type === "quiz"){
                creationCards.p1 = deepElement.possibilite.p1
                creationCards.p2 = deepElement.possibilite.p2
                creationCards.p3 = deepElement.possibilite.p3
                creationCards.p4 = deepElement.possibilite.p4
            }
            return creationCards
        })
        return creationCards.question ? 
            (<div className="cardsCards">
                <div className="cardsCardsDivInfo">
                    <h3 className="cardsTitle">{creationCards.question}</h3>
                    <p className="cardsText">{creationCards.reponse}</p>
                </div>
                <div className="cardsCardsDivBTN">
                    {dataCollection.deleteOption ? (<button onClick={() => handleClickBtn(creationCards)} className="btnCardsManagement"><img id="pencil" src={pencil} /></button>) : (null)}
                    {dataCollection.deleteOption ? (<button className="btnCardsManagement"><img id="crossRed" onClick={() => handleDeleteModalOpen(creationCards)} src={crossRed} /></button>) : (null)}
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
                    <select id="type" value={modalData.type} onChange={handleChange} >
                        <option value="vraiFaux">Vrai - Faux</option>
                        <option value="quiz">Quiz</option>
                    </select>
                    <h5 id="question">Question :</h5>
                    <textarea type="text" id="question" value={modalData.question} onChange={handleChange} /> 
                    <h5 id="reponse">Réponse :</h5>
                    {modalData.type == 'vraiFaux' ? (<div className="selectVraiFaux">
                        
                        {modalData.reponse == 'true' ? (<img src={check} />) : (<img src={crossRed} />)}
                        <select id="reponse" value={modalData.reponse} onChange={handleChange} >
                            <option value="default" selected>--Default--</option>
                            <option value={true}>Vrai</option>
                            <option value={false}>Faux</option>
                        </select>
                    </div>) : (
                        <div className="quizReponseModification">
                            <textarea id="reponse" value={modalData.reponse} onChange={handleChange} />
                            <h5> Possibilité : </h5>
                            <div className="quizReponsePossibilite">
                                <textarea id="p1" onChange={handleChange} value={modalData.p1 != "" ? (modalData.p1) : ("")}  />
                                <textarea id="p2" onChange={handleChange} value={modalData.p2 != "" ? (modalData.p2) : ("")}  />
                                <textarea id="p3" onChange={handleChange} value={modalData.p3 != "" ? (modalData.p3) : ("")}  />
                                <textarea id="p4" onChange={handleChange} value={modalData.p4 != "" ? (modalData.p4) : ("")}  />
                            </div>
                        </div>
                    )}
                    
                <button className="modificationCards">Modifier ma carte</button>
                </form>
            </div>
        </Fragment>
    )

    const modalCreationCards = (
        <Fragment>
            <div className="modalForCardsManagement">
                <button className="btnCloseModal" onClick={() => handleModalCreationClose()}><img src={btnClose}/></button>
                <form onSubmit={handleSubmitCreationCards} className="formModalCardsManagement">
                    <h2>Collection</h2>
                    <hr/>
                    <h4>{dataCollection.nameCollection}</h4>
                    <h5>Type de réponse</h5>
                    <select id="type" value={modalDataCreation.type} onChange={handleChangeCreation}>
                        <option selected value="default">-- A définir --</option>
                        <option value="vraiFaux">Vrai - Faux</option>
                        <option value="quiz">Quiz</option>
                    </select>
                    <h5 id="question">Question :</h5>
                    <textarea type="text" id="question" value={modalDataCreation.question} onChange={handleChangeCreation}/> 
                    <h5 id="reponse">Réponse :</h5>
                    {modalDataCreation.type == 'vraiFaux' ? (<div className="selectVraiFaux">
                        
                        {modalDataCreation.reponse == 'true' ? (<img src={check} />) : (<img src={crossRed} />)}
                        <select id="reponse" value={modalDataCreation.reponse} onChange={handleChangeCreation}>
                            <option selected value="">-- A définir --</option>
                            <option value={true}>Vrai</option>
                            <option value={false}>Faux</option>
                        </select>
                    </div>) : (
                        <div className="quizReponseModification">
                            <textarea id="reponse" value={modalDataCreation.reponse} onChange={handleChangeCreation} />
                            <h5> Possibilité : </h5>
                            <div className="quizReponsePossibilite">
                                <textarea id="p1" onChange={handleChangeCreation}/>
                                <textarea id="p2" onChange={handleChangeCreation}/>
                                <textarea id="p3" onChange={handleChangeCreation}/>
                                <textarea id="p4" onChange={handleChangeCreation}/>
                            </div>
                        </div>
                    )}
                    <button className="modificationCards">Créer ma carte</button>
                </form>
            </div>
        </Fragment>
    )
    {/* {btnCreationCards} */}
    
    // Modification à faire :  
        // Ne pas vérifier si dataDB existe mais si ça longueur est égal à celle de cardsElement    

    return dataCardsQuiz !== null ? (
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
                        <Link className="btnGo" to={{pathname:"/quiz", state:{dataCards, dataCollection, dataCardsQuiz}}}>C'est parti !</Link>
                    </div>
                    <div className='divBtnPlus'>
                        <button onClick={() => reloadPage()}><img id='btnReload' src={btnReload}/></button>
                        {dataCollection.deleteOption ? (<button onClick={() => handleClickBtnCreation()}><img id='btnPlus' src={btnPlus}/></button>) : (null)}
                    </div>
                    <div className="containerCardsForManage">
                        {displayCards}  
                    </div>
                </div>
            </div>
        </Fragment>
        
    ) : (
        <Fragment>
            <div className="containerQuiz">
                <Link to="/collection" id="btnArowPreviously"><img id="arowPreviously" src={arow}/></Link>
                <div className="containerTest">
                    <h2>Collection : default</h2> 
                    <div className="containerCardsAdd">
                        <Link className="btnGo">C'est parti !</Link>
                    </div>
                    <div className='divBtnPlus'>
                        <button onClick={() => reloadPage()}><img id='btnReload' src={btnReload}/></button>
                        <button onClick={() => handleClickBtnCreation()}><img id='btnPlus' src={btnPlus}/></button>
                    </div>
                    <div className="containerCardsForManage">
                        test 
                    </div>
                </div>
        </div>
        </Fragment>
    )
}

export default Carte
