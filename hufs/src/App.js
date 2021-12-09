import './App.css';
import Header from './components/Header.js';
import Nav from './components/Nav.js';
import Contents_home from './components/Content_home.js';
function App() {
  return (
    <div className="App">
        <Header />     
        <Nav />
        <Contents_home />
    </div>
  );
}

export default App;