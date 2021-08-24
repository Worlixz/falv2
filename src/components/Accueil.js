import React, {useState, useContext, useEffect, Fragment} from 'react';
import { FirebaseContext  } from './Firebase/index';
import Header from './Header'

const Accueil = (props) => {

    const firebase = useContext(FirebaseContext)
    const [userSession, setUserSession] = useState(null)
    
    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged((user) =>{
            user ? setUserSession(user) : props.history.push('/')
        })
        console.log(userSession)
        return () => {
            listener()
        };
    }, [userSession])

    return (
        <Fragment>
            <Header dataUser={userSession} />
            <div>
                je suis dans welcome
            </div>
        </Fragment>
    )
}


export default Accueil;