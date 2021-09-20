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
            test
        </div>
    )
}

export default Quiz
