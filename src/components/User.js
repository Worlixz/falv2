import React, {useState, useContext, useEffect, Fragment} from 'react';
import { FirebaseContext  } from './Firebase/index';
import Header from './Header'
import Loader from './Loader';
import Sidebar from './Sidebar';
import Carte from './Carte'
import Profil from './Profil'
import Quiz from './Quiz';

const User = (props) => {

    const firebase = useContext(FirebaseContext)
    const [userSession, setUserSession] = useState(null)
    const [userData, setUserData] = useState(null)
    const [dataCards, setDataCards] = useState("")

    let DataFullCards = {}
    
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
            if(dataCards != null) {
                firebase.userCollection(userSession.uid)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.docs.map((doc) => {
                        DataFullCards = {...DataFullCards, [doc.id]: doc.data()}
                    })
                    setDataCards(DataFullCards)
                })
            }
        }
        
        return () => {
            listener()
        };

    }, [userSession])

    /* console.log('dataUser', userData)
    console.log('dataCards', dataCards) */
    

    let content;
    switch(props.history.location.pathname){
        case "/carte" : {
            content = <Carte dataCards={dataCards} dataUser={userData} propsHistory={props} />
            break
        }
        case "/profil" : {
            content = <Profil/>
            break
        }
        case "/quiz" : {
            content = <Quiz propsHistory={props}/>
            break
        }
        default : {

            content = <div className="containerUser"> 
                <h2>Je suis dans user</h2>

            </div>
            
            break
        }
    }
    
     return userSession === null ? 
    (
        <Loader />
    ) 
    : 
    (
        <Fragment>
            <Header children props={userData} />
            <div className="containerAccueil">
                <Sidebar children props={userData}/>
                {content}
            </div>
        </Fragment>
    ) 
}


export default User;