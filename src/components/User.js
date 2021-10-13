import React, {useState, useContext, useEffect, Fragment} from 'react';
import { FirebaseContext  } from './Firebase/index';
import Header from './Header'
import Loader from './Loader';
import Sidebar from './Sidebar';
import Collection from './Collection'
import Profil from './Profil'
import Carte from './Carte';
import Quiz from './Quiz';
import Dashboard from './Dashboard';

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
        case "/collection" : {
            content = <Collection dataCards={dataCards} dataUser={userData} propsHistory={props} userSession={userSession} />
            break
        }
        case "/profil" : {
            content = <Profil dataUser={userData}/>
            break
        }
        case "/carte" : {
            content = <Carte propsHistory={props}/>
            break
        }
        case "/quiz" : {
            content = <Quiz propsHistory={props} dataUser={userData} userSession={userSession}/>
            break
        }
        case "/dashboard" : {
            content = <Dashboard propsHistory={props} />
            break;
        }
        default : {

            content = <div className="containerUser"> 
                <div className="divPresentation">
                    <h2>Bienvenu dans l'application FAL</h2>
                    <p>Sur cette page ce trouve une vidéo tutoriel, dans cette dernière tu apprendra pourquoi nous avons crée FAL et comment s'en servir. < br />Tout les retours sont les bienvenu afin d'améliorer cette dernière</p>
                </div>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/oZYauzQWtvk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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