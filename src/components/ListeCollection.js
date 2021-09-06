import React from 'react'

function ListeCollection (){
    return (
        <li className='liMapCollectionCards'>
            <img src={OsCasse} />
            <div className="divLiMapCollectionCards">
                <h3>Titre de la carte</h3>
                <p>10 Cartes</p>
            </div>
            <img src={Play} id="btnPlay" onClick={handleClick}/>
        </li>
    )
}

export default ListeCollection