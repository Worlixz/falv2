import React, { Fragment, useContext} from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { FirebaseContext } from './Firebase/index'

function Carte(props) {

    const firebase = useContext(FirebaseContext)
    console.log(firebase.auth)

    return (
        <Fragment>
            <div>
                Je suis dans carte
            </div>
        </Fragment>
        
    )
}

export default Carte