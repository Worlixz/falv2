import React, {Fragment, useContext, useEffect, useState} from 'react'
import {FirebaseContext} from './Firebase/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()


function Quiz(props) {

    const firebase = useContext(FirebaseContext)

    const {dataCards, dataCollection} = props.propsHistory.location.state

    const [modeQuestion, setModeQuestion] = useState(false)
    const [count, setCount] = useState(0)
    const [dataQuiz, setDataQuiz] = useState(dataCards)
    const [repUser, setRepUser] = useState("")
    const [score, setScore] = useState(0)

    const dataQuizDisplay = Object.values(dataQuiz)


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

    const handleNext = () => {
        let countCurrent = count
        if(countCurrent < dataQuizDisplay.length -1 ){
            countCurrent++
            setCount(countCurrent)
            for(let i = 0; i < pdivQuiz.length; i++){
                pdivQuiz[i].classList.remove('selected')
            }
            handleSwitchMode()
        }else{
            console.log('je viens de finir')
        }
    }

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

    const handleVerif = (e) => {
        if(dataQuizDisplay[count].reponse == repUser){
            console.log("j'ai juste")
            toastModalSucces()
            setScore(score +1)
            handleSwitchMode()
        }else{
            console.log("j'ai faux")
            toastModalError()
            handleSwitchMode()
        }
    }

    const toastModalSucces = () => {
        toast.success('Au top !!!', {
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
        toast.error("Je crois que tu t'es trompé :/", {
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
                <h4>Progression : {count} / {dataQuizDisplay.length}</h4>
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
                    <p value="true" onClick={handleCheck}>Vrai</p>
                    <p value="false" onClick={handleCheck}>Faux</p>
                </Fragment>
            )}
                
            </div>
            <div className="divQuizTimer btnValider">
                {modeQuestion ? (<Fragment><button className="btnTimer minute" onClick={handleNext}>1 minute</button>
                <button className="btnTimer days3" onClick={handleNext}>3 jours</button>
                <button className="btnTimer days7" onClick={handleNext}>7 jours</button></Fragment>)
                : 
                (<button className="btnTimer valider" onClick={handleVerif}>Valider</button>)}             
            </div>
        </div>
    )
}

export default Quiz
