import React, {useState} from 'react'
import { Link } from 'react-router-dom'

function Dashboard(props) {
    const [stateDashboardPage, setStateDashboardPage] = useState(props.propsHistory.location.state.stateDashboard)

    const displayCarteSuccess = stateDashboardPage.carteSucces.map(element => {
        return (<tr>
            <td>{element.question}</td>
            <td>{element.reponse === true ? ("Vrai") : element.reponse === false ? ('Faux') : (element.reponse)}</td>
        </tr>)
    })

    const displayCarteError = stateDashboardPage.carteFails.map(element => {
        return (
            <tr>
                <td>{element.question}</td>
                <td>{element.reponse === true ? ("Vrai") : element.reponse === false ? ('Faux') : (element.reponse)}</td>
            </tr>
        )
    })

    return (
        <div className="containerDashboard">
            <div className="infoCollection">
                <h3>Félicitation ! Tu as terminé cette collection</h3>
                <h4>{stateDashboardPage.nameCollection}</h4>
            </div>
            <div className="scoringCollection">
                <h5>Réussite : {stateDashboardPage.score*100/stateDashboardPage.nbreCards} % </h5>
                <progress value={stateDashboardPage.score*100/stateDashboardPage.nbreCards} max="100"></progress>
            </div>
            <div className="containerTable">
                <div className="containerTableSuccess">
                    <table>
                        <thead>
                            <tr>
                                <th colspan="2">Les cartes réussis : </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="tableQuestionReponse">
                                <td>Question</td>
                                <td>Reponse</td>
                            </tr>
                            {displayCarteSuccess}
                        </tbody>
                    </table>
                </div>
                <div className="containerTableFails">
                    <table>
                        <thead>
                            <tr>
                                <th colspan="2" >Les cartes échouées : </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="tableQuestionReponse">
                                <td>Question</td>
                                <td>Reponse</td>
                            </tr>
                            {displayCarteError}
                        </tbody>
                    </table>
                </div>
            </div>
            <Link className="btnBackCollection" to="/collection">Retour aux collections</Link>
        </div>
    )
}

export default Dashboard
