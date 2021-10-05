import React, {Fragment, useContext, useEffect, useState} from 'react'
import {FirebaseContext} from './Firebase/index'


function Quiz(props) {

    const firebase = useContext(FirebaseContext)

    const [modeQuestion, setModeQuestion] = useState(false)
    const [count, setCount] = useState(0)
    const [dataTest, setDataTest] = useState([{
        type: 'quiz',
        question: 'question 1',
        reponse: 'reponse 1',
        p1: 'p1',
        p2: 'p2',
        p3: 'p3',
        p4: 'p4'
    },{
        type: 'quiz',
        question: 'question 2',
        reponse: 'reponse 2',
        p1: 'p1.2',
        p2: 'p2.2',
        p3: 'p3.2',
        p4: 'p4.2'
    },{
        type: 'vraiFaux',
        question: 'question 3 vraiFaux',
        reponse: 'true'
    },{
        type: 'vraiFaux',
        question: 'question 4 vraiFaux',
        reponse: 'false'
    }
])

    const divQuiz = document.querySelector('.divQuizTimer')

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
        countCurrent++
        setCount(countCurrent)
        console.log(count)
    }


    return (
        <div className="quizContainer">
            <div className="divQuizNameCollection">
                <h3>{props.propsHistory.location.state.dataCollection.nameCollection}</h3>
            </div>
            <button onClick={handleSwitchMode}>Switch</button>
            <div className="divQuizQuestion">
                <h3>{dataTest[count].question}</h3>
            </div>
            <div className="divQuizPossibilite">
                <button>Possibilité 1</button>
                <button>Possibilité 2</button>
                <button>Possibilité 3</button>
                <button>Possibilité 4</button>
            </div>
            <div className="divQuizTimer btnValider">
                {modeQuestion ? (<Fragment><button className="btnTimer minute" onClick={handleNext}>1 minute</button>
                <button className="btnTimer days3" onClick={handleNext}>3 jours</button>
                <button className="btnTimer days7" onClick={handleNext}>7 jours</button></Fragment>)
                : 
                (<button className="btnTimer valider" onClick={handleSwitchMode}>Valider</button>)}             
            </div>
            <div className="divQuizNbreCards">
                <h6>nombre de carte restante</h6>
            </div>
        </div>
    )
}

export default Quiz
