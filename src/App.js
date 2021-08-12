import './Mobile.css';
import './Tablette.css';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/Header.js'
import Landing from './components/Landing.js'


function App() {
  return (
    <Router>
      <Header/>
       <Switch>
         <Route exact path="/" component={Landing}/>
      </Switch>
    </Router>

  );
}

export default App;
