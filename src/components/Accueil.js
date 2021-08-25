import React, {useState, useContext, useEffect, Fragment} from 'react';
import { FirebaseContext  } from './Firebase/index';
import Header from './Header'
import Loader from './Loader';

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
    
    
     return userSession === null ? 
    (
        <Loader />
    ) 
    : 
    (
        <Fragment>
            <Header props={userSession.uid} />
            Accueil
        </Fragment>
    ) 
}


export default Accueil;