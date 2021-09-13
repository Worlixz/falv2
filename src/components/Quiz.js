import React from 'react'
import arow from '../assets/up-arrow-angle.svg'

function Quiz(props) {
    console.log(props)
    const dataCollection = props.propsHistory.location.state.dataCardsMap
    const dataCards = props.propsHistory.location.state.dataCardsMap.cards
    console.log("object entries : ",Object.entries(dataCards).map((elementMap) => {
        console.log(elementMap)
    }))

    const handlePreviously = (props) => {
     props.view.location.assign('/carte')
    }

    return (
        <div className="containerQuiz">
            <button onClick={handlePreviously} id="btnArowPreviously"><img id="arowPreviously" src={arow}/></button>
            <h2>Collection : {dataCollection.nameCollection}</h2> 
            <button className="btnGo">C'est parti !</button>
        </div>
    )
}

export default Quiz
