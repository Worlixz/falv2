import React from 'react'
import { Link } from 'react-router-dom'
import SimpleSlider from './SimpleSlider'



function Landing () {

    
    return (
        <main>
            <SimpleSlider/>
            <div>
                <Link className="btn btn-inscription" to="/inscription">Inscription</Link>
                <Link className="btn btn-connexion" to="/signin">Connexion</Link>
            </div>
      </main>
    )
}

export default Landing