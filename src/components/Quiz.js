import React, {useContext, useEffect, useState} from 'react'
import {FirebaseContext} from './Firebase/index'


function Quiz(props) {

    const firebase = useContext(FirebaseContext)

     const [userSession, setUserSession] = useState(props.userSession.uid.toString())
    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.propsHistory.push('/')
        })
        return () => {
            listener()
        }
    }, [userSession]) 
    
    
    console.log("props dans Quiz", props)



    return (
        <div className="quizContainer">
            <div className="divQuizNameCollection">
                <h3>{props.propsHistory.location.state.dataCollection.nameCollection}</h3>
            </div>
            <div className="divQuizQuestion">
                <h3>Question : </h3>
            </div>
            <div className="divQuizPossibilite">
                <button>Possibilité 1</button>
                <button>Possibilité 2</button>
                <button>Possibilité 3</button>
                <button>Possibilité 4</button>
            </div>
            <div className="divQuizTimer">
                <button className="btnTimer minute">1 minute</button>
                <button className="btnTimer days3">3 jours</button>
                <button className="btnTimer days7">7 jours</button>
            </div>
            <div className="divQuizNbreCards">
                <h6>nombre de carte restante</h6>
            </div>
        </div>
    )
}

export default Quiz
