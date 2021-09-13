import React, {useState, useEffect, useContext, Fragment} from 'react'
import arow from '../assets/up-arrow-angle.svg'
import crossRed from '../assets/CardsManagement/crossRedClose.svg'
import pencil from '../assets/CardsManagement/pencil.svg'
import btnClose from '../assets/close.svg'
import check from '../assets/CardsManagement/check.svg'
import { FirebaseContext } from './Firebase'

function Quiz(props) {

    const firebase = useContext(FirebaseContext)
    console.log(props)
    
    
    const dataCollection = props.propsHistory.location.state.dataCardsMap
    const dataCards = props.propsHistory.location.state.dataCardsMap.cards

    const assombrir = document.querySelector('.sombreModalCardsManagement')

    const [modalCheck, setModalCheck] = useState(false)
    const [userSession, setUserSession] = useState("")
    const [modalData, setModalData] = useState("")

    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/')
        })
        return () => {
            listener()
        }
    }, [userSession])
    

    const displayCards = Object.entries(dataCards).map((element) => {
        let creattionCards = {
            question: "",
            reponse: ''
        }
        /* console.log("je suis dans map : " , element) */
        Object.values(element).map((deepElement) => {
            if(deepElement.question != undefined){
                /* console.log("Question : ", deepElement.question) */
                creattionCards.question = deepElement.question
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
                    <button className="btnCardsManagement"><img id="crossRed" src={crossRed} /></button>
                </div>
            </div>) : null
        
    })

    const handlePreviously = (props) => {
        props.view.location.assign('/carte')
    }

    const handleClickBtn = (creattionCards) => {
        setModalCheck(true)
        setModalData(creattionCards)
        console.log(modalData)
        assombrir.style.zIndex = "2"
    }
    
    const handleCloseModal = () => {
        setModalCheck(false)
        /* setNewCollection(dataNewCollection) */
        assombrir.style.zIndex = "-2"
    }

    const modal = (
        <Fragment>
            <div className="modalForCardsManagement">
                <button className="btnCloseModal" onClick={() => handleCloseModal()}><img src={btnClose}/></button>
                <form className="formModalCardsManagement">
                    <h2>Collection</h2>
                    <hr/>
                    <h4>{dataCollection.nameCollection}</h4>
                    <h5>Type de réponse</h5>
                    <select>
                        <option value="vraiFaux">Vrai - Faux</option>
                        <option value="quiz">Quiz</option>
                    </select>
                    <h5 id="question">Question :</h5>
                    <textarea type="text" id="question" value={modalData.question}/> 
                    <h5 id="reponse">Réponse :</h5>
                    <div className="selectVraiFaux">
                        <img src={check} />
                        <select>
                            <option value={true}>Vrai</option>
                            <option value={false}>Faux</option>
                        </select>
                    </div>
                </form>
                <button className="modificationCards">Modifier ma carte</button>
            </div>
        </Fragment>
    )

    return (
        <div className="containerQuiz">
            <div className="sombreModalCardsManagement"></div>
            <button onClick={handlePreviously} id="btnArowPreviously"><img id="arowPreviously" src={arow}/></button>
            <h2>Collection : {dataCollection.nameCollection}</h2> 
            <button className="btnGo">C'est parti !</button>
            <div className="containerCardsForManage">
                {displayCards}  
            </div>
            {modalCheck ? (modal) : null}
        </div>
    )
}

export default Quiz
