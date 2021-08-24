import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import SimpleSlider from './SimpleSlider'
import Header from './Header'



function Landing () {

    
    return (
        <Fragment>
            <Header/>
                <main>
                    <SimpleSlider/>
                    <div>
                        <Link className="btn btn-inscription" to="/inscription">Inscription</Link>
                        <Link className="btn btn-connexion" to="/connexion">Connexion</Link>
                    </div>
                </main>
        </Fragment>
    )
}

export default Landing