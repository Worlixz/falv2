import './Mobile.css';
import './Tablette.css';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/Header.js'
import Landing from './components/Landing.js'
import Connexion from './components/Connexion';
import Inscription from './components/Inscription';


function App() {
  return (
    <Router>
      <Header/>
       <Switch>
         <Route exact path="/" component={Landing}/>
         <Route path="/inscription" component={Inscription}/>
         <Route path="/connexion" component={Connexion}/>
      </Switch>
    </Router>

  );
}

export default App;
