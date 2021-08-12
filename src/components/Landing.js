import React from 'react'
import Squelette from '../assets/squelette 2.png'
import Blob from '../assets/Blob.png'
import S2C1 from '../assets/Carte 1 - slide 2.png'
import S2C2 from '../assets/Carte 2 - slide 2.png'
import Cloche from '../assets/cloche.png'
import S4C1 from '../assets/groupe carte - slide 3.png'

function Landing () {

    class Carousel {

        /*
        @param {HTMLElement} element
        @param {Object} option
        @param {Object} option.slidesToScroll
        @param {Object} option.slidesVisible
        */
        constructor (element, option = {}) {
            this.element = element
            this.option = Object.assign({}, {
                slidesToScroll:1,
                slidesVisible:1
            }, option)
        }
    }

    new Carousel(document.querySelector("#carousel1"), {
        slidesToScroll: 1,
        slidesVisible: 1
    })

    return (
        <main>
            <div className="container">
                <div id="carousel1" className="carousel">
                    <h2>BIENVENUE SUR F.A.L</h2>
                    <p>Flash Anatomy Learning (F.A.L) est une <br/> application de Flash Cards orientée Anatomie et <br/>Physiologie</p>
                    <img src={Squelette} />
                </div>
                <div id="carousel2" className="carousel">
                    <h3>Créer tes propres flash card d'anatomie ou de Physiologie facilement sur F.A.L</h3>
                    <img src={S2C1} />
                    <img src={S2C2} />
                </div>
                <div id="carousel3" className="carousel">
                    <h3>Définis tes fréquences de rappel et optimise ton apprentissage</h3>
                    <img src={Cloche} />
                    <p className="timeLanding" id="5minutes">5 minutes</p>
                    <p className="timeLanding" id="3jours">3 jours</p>
                    <p className="timeLanding" id="7jours">7 jours</p>
                </div>
                <div id="carousel4" className="carousel">
                    <h3>Profite des collections permanentes mise en place par la team F.A.L ou par les autres adhérents</h3>
                    <img src={S4C1} />
                </div>
            </div>
            <div>
                <button className="btn btn-inscription">Inscription</button>
                <button className="btn btn-connexion">Connexion</button>
            </div>
      </main>
    )
}

export default Landing