import React, { Fragment, useContext} from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { FirebaseContext } from './Firebase/index'

function Carte(props) {
    console.log(" je suis dans cards",props)
    return (
        <Fragment>
            <div>
                Je suis dans carte
            </div>
        </Fragment>
        
    )
}

export default Carte
