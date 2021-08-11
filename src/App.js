import './Mobile.css';
import './Tablette.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Flash Anatomy Learning</h1>
      </header>
      <main>
        <div>
          Je vais me transformer en carrousel
        </div>
        <div>
          <button className="btn btn-inscription">Inscription</button>
          <button className="btn btn-connexion">Connexion</button>
        </div>
      </main>
    </div>
  );
}

export default App;
