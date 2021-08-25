import React, {useState, useContext, useEffect, Fragment} from 'react';
import { FirebaseContext  } from './Firebase/index';
import Header from './Header'
import Loader from './Loader';
import Sidebar from './Sidebar';

const Accueil = (props) => {

    const firebase = useContext(FirebaseContext)
    const [userSession, setUserSession] = useState(null)
    const [userData, setUserData] = useState(null)
    
    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged((user) =>{
            user ? setUserSession(user) : props.history.push('/')
        })

        if(userSession !== null) {
            firebase.userData(userSession.uid)
            .get()
            .then((doc) => {
                if(doc.exists){
                    console.log(doc.data())
                    const myData = doc.data()
                    setUserData(myData)
                }
            })
            .catch((err) => {
                console.log(err)
            })
            firebase.userCollection(userSession.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc => {
                    console.log(doc.id , " => ", doc.data())
                }))
                querySnapshot.docs.map((doc) => {
                    console.log(doc.id)
                })
            })
            
        }
        
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
            <Header props={userData} />
            <div className="containerAccueil">
                <Sidebar/>
            </div>
        </Fragment>
    ) 
}


export default Accueil;