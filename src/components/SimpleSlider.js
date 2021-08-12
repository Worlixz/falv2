import React from "react";
import Slider from "react-slick";
import Squelette from '../assets/squelette 2.png'
import S2C1 from '../assets/Carte 1 - slide 2.png'
import S2C2 from '../assets/Carte 2 - slide 2.png'
import Cloche from '../assets/cloche.png'
import S4C1 from '../assets/groupe carte - slide 3.png'



export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
      <div id="carousel1" className="carousel_bis">
                    <h2>BIENVENUE SUR F.A.L</h2>
                    <p>Flash Anatomy Learning (F.A.L) est une <br/> application de Flash Cards orientée Anatomie et <br/>Physiologie</p>
                    <img src={Squelette} />
                </div>

                <div id="carousel2" className="carousel_bis">
                    <h3>Créer tes propres flash card d'anatomie ou de Physiologie facilement sur F.A.L</h3>
                    <img src={S2C1} />
                    <img src={S2C2} />
                </div>
                <div id="carousel3" className="carousel_bis">
                    <h3>Définis tes fréquences de rappel et optimise ton apprentissage</h3>
                    <img src={Cloche} />
                    <p className="timeLanding" id="5minutes">5 minutes</p>
                    <p className="timeLanding" id="3jours">3 jours</p>
                    <p className="timeLanding" id="7jours">7 jours</p>
                </div>
                <div id="carousel4" className="carousel_bis">
                    <h3>Profite des collections permanentes mise en place par la team F.A.L ou par les autres adhérents</h3>
                    <img src={S4C1} />
                </div>
      {/* <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div> */}
    </Slider>
  );
}