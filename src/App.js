import './style/mobile/Mobile.css';
import './style/tablette/Tablette.css';
import './style/desktop/App.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from './components/Landing.js'
import Connexion from './components/Connexion';
import Inscription from './components/Inscription';
import User from './components/User';
import Loader from './components/Loader';



function App() {
  return (
    <Router>
       <Switch>
         <Route exact path="/" component={Landing}/>
         <Route path="/inscription" component={Inscription}/>
         <Route path="/connexion" component={Connexion}/>
         <Route path="/:user" component={User}/>
         <Route component={Loader}/>
      </Switch>
    </Router>

  );
}

export default App;
