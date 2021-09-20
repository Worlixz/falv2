import React, { Fragment } from 'react'
import Header from './Header'

function Loader() {
    return (
        <Fragment>
        <Header />
            <div className="containerLoaderSpine">
                <div className="textLoaderSpine"><h3>FAL est en chargement ...</h3></div>
                <div className="loaderSpine">
                </div>
            </div>
        </Fragment>
    )
}

export default Loader
