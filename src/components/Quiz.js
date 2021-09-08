import React from 'react'

function Quiz(props) {
    console.log(props)
    const dataCollection = props.propsHistory.location.state.dataCardsMap
    const dataCards = props.propsHistory.location.state.dataCardsMap.cards
    console.log(dataCards)

    return (
        <div>
            Je suis dans Quiz et {dataCollection.nameCollection}
        </div>
    )
}

export default Quiz
