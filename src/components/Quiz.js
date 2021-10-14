import React, {Fragment, useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {FirebaseContext} from './Firebase/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()


function Quiz(props) {

    const firebase = useContext(FirebaseContext)

    const [stateDashboard, setStateDashboard] = useState({
        score: 0,
        carteSucces: [],
        carteFails: [],
        nameCollection: null
    })

    const {dataCards, dataCollection, startTimer} = props.propsHistory.location.state
    console.log('startTimer : ',startTimer)

    const [modeQuestion, setModeQuestion] = useState(false)
    const [count, setCount] = useState(0)
    const [dataQuiz, setDataQuiz] = useState(dataCards)
    const [repUser, setRepUser] = useState("")
    const [score, setScore] = useState(0)
    const [stateTemporaire, setStateTemporaire] = useState([])
    const [stateTemporaireError, setStateTemporaireError] = useState([])

    const dataQuizDisplay = Object.values(dataQuiz)
    const arraySuccessSentence = ["Au top", "Une de plus de réussi", "Tu es sur la bonne voie", "Génial", "Bravo", "+1 au compteur", "Tu continue à progresser", "L'anatomie n'a plus de secret pour toi", "Elle est validé !!!", "Parfait"]
    const arrayErrorSentence = ["Je crois en toi", "Tu peux le faire", "La prochaine fois ça sera la bonne", "Il faut tomber pour apprendre", "Tu y es presque", "Tu te fera plus avoir", "Persévérer", "Soit acteur de ta réussite tu vas y arriver", "Dommage", "La route de la connaissance est semé d'embûches"]
    let arraySucces = []
    let arrayError = []

    const divQuiz = document.querySelector('.divQuizTimer')
    const pdivQuiz = document.querySelectorAll('.divQuizPossibilite p')


    const [userSession, setUserSession] = useState(props.userSession.uid.toString())
    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.propsHistory.push('/')
        })
        return () => {
            listener()
        }
    }, [userSession]) 

    const handleSwitchMode = () => {
        setModeQuestion(!modeQuestion)
        if(modeQuestion === true){
            divQuiz.classList.add('btnValider')
        }
        else{
            divQuiz.classList.remove('btnValider')
        }
    }

    const handleNext = (e) => {
        let countCurrent = count
        if(count < dataQuizDisplay.length -1 ){
            countCurrent++
            setCount(countCurrent)
            for(let i = 0; i < pdivQuiz.length; i++){
                pdivQuiz[i].classList.remove('selected')
            }
            handleSwitchMode()
        }else{
            console.log("je viens de finir et faut faire un appel à la db")
        }
    }


    const btnTime = (count < dataQuizDisplay.length -1 ) ? (<Fragment><button className="btnTimer minute" onClick={handleNext}>1 minute</button>
    <button className="btnTimer days3" onClick={handleNext}>3 jours</button>
    <button className="btnTimer days7" onClick={handleNext}>7 jours</button></Fragment>) : (<Fragment><Link className="btnTimer minute" onClick={handleNext} to={{pathname: '/dashboard', state:{stateDashboard}}}>1 minute</Link>
    <Link className="btnTimer days3" onClick={handleNext} to={{pathname: '/dashboard', state:{stateDashboard}}} >3 jours</Link>
    <Link className="btnTimer days7" onClick={handleNext} to={{pathname: '/dashboard', state:{stateDashboard}}} >7 jours</Link></Fragment>)

    const handleCheck = (e) => {
        for(let i = 0; i < pdivQuiz.length; i++){
            pdivQuiz[i].classList.remove('selected')
        }
        e.target.classList.add('selected')
        if(e.target.innerText == 'Vrai'){
            setRepUser(true)
        }else if(e.target.innerText == 'Faux'){
            setRepUser(false)
        }else{
            setRepUser(e.target.innerText)
        }
    }

    const handleVerif = () => {
        if(dataQuizDisplay[count].reponse === repUser){
            toastModalSucces()
            setScore(score +1)
            arraySucces = stateTemporaire
            arraySucces.push(dataQuizDisplay[count])
            setStateTemporaire(arraySucces)
            console.log("array succes ",arraySucces)
            console.log("state tempo ",stateTemporaire)
            setStateDashboard( stateDashboard => ({
                ...stateDashboard, score: score+1, nameCollection: dataCollection.nameCollection, carteSucces: stateTemporaire
            }))
            handleSwitchMode()
        }else{
            toastModalError()
            arrayError = stateTemporaireError
            arrayError.push(dataQuizDisplay[count])
            setStateTemporaireError(arrayError)
            console.log("array succes ",arraySucces)
            console.log("state tempo ",stateTemporaire)
            setStateDashboard( stateDashboard => ({
                ...stateDashboard, carteFails: stateTemporaireError
            }))
            handleSwitchMode()
        }
    }

    const toastModalSucces = () => {
        const min = 1; 
        const max = 10;  
        let random = Math.floor(Math.random() * (max - min)) + min;
        toast.success(arraySuccessSentence[random], {
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
        const min = 1; 
        const max = 10;  
        let random = Math.floor(Math.random() * (max - min)) + min;
        toast.error(arrayErrorSentence[random], {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }


    return (
        <div className="quizContainer">
            <div className="divQuizNameCollection">
                <h3>{dataCollection.nameCollection}</h3>
            </div>
            <div className="containerScoreAndProgression">
                <h4>Score {score} / {dataQuizDisplay.length}</h4>
                <h4>Progression : {count +1} / {dataQuizDisplay.length}</h4>
            </div>
            <div className="divQuizQuestion">
                <h3>{dataQuizDisplay[count].question}</h3>
            </div>
            <div className="divQuizPossibilite">
            {dataQuizDisplay[count].type == "quiz" ? (<Fragment>
                <p onClick={handleCheck} >{dataQuizDisplay[count].p1}</p>
                <p onClick={handleCheck} >{dataQuizDisplay[count].p2}</p>
                <p onClick={handleCheck} >{dataQuizDisplay[count].p3}</p>
                <p onClick={handleCheck} >{dataQuizDisplay[count].p4}</p>
            </Fragment>) : (
                <Fragment>
                    <p value={true} onClick={handleCheck}>Vrai</p>
                    <p value={false} onClick={handleCheck}>Faux</p>
                </Fragment>
            )}
                
            </div>
            <div className="divQuizTimer btnValider">
                {modeQuestion ? (btnTime)
                : 
                (<button className="btnTimer valider" onClick={handleVerif}>Valider</button>)}             
            </div>
        </div>
    )
}

export default Quiz
