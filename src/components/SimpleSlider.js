import React from "react"
import Slider from "react-slick"
import Squelette from '../assets/squelette 2.png'
import S2C1 from '../assets/Carte 1 - slide 2.png'
import S2C2 from '../assets/Carte 2 - slide 2.png'
import Cloche from '../assets/cloche.png'
import S4C1 from '../assets/groupe carte - slide 3.png'
import '../style/Slider.css'


export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };



  return <Slider {...settings}>
      <div id="carousel1" className="carousel">
        <div id="containertitle">
          <h2>BIENVENUE SUR F.A.L</h2>
          <span id="beta">En Bêta !!!</span> 
        </div>
        <p>Flash Anatomy Learning (F.A.L) est une <br/> application de Flash Cards orientée Anatomie et <br/>Physiologie</p>
        <img src={Squelette} />
      </div>
      <div id="carousel2" className="carousel">
        <h3>Créer tes propres flash card d'anatomie ou de Physiologie facilement sur F.A.L</h3>
        <div id="imgCarousel2">
          <img id="S2C1" src={S2C1} />
          <img id="S2C2" src={S2C2} />
        </div>
      </div>
      <div id="carousel3" className="carousel">
        <h3>Définis tes fréquences de rappel et optimise ton apprentissage</h3>
        <img id="clocheCarousel" src={Cloche} />
        <div id="btnTimeCarousel">
          <p className="timeLanding" id="btn5minutes">5 minutes</p>
          <p className="timeLanding" id="btn3jours">3 jours</p>
          <p className="timeLanding" id="btn7jours">7 jours</p>
        </div>
      </div>
      <div id="carousel4" className="carousel">
        <h3>Profite des collections permanentes mise en place par la team F.A.L ou par les autres adhérents</h3>
        <img src={S4C1} />
      </div>
    </Slider>
  
}