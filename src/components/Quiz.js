import React from 'react'

function Quiz (props) {

    console.log("je suis dans quiz : ",props)
    return (
        <div>
            Quiz
            {props}
        </div>
    )
}

export default Quiz