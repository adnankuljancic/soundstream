
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { LogIn } from './components/LogIn/LogIn';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MainNavBar } from './components/NavBar/NavBar';
import { Register } from './components/Register/Register';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { LikedSongs } from './components/LikedSongs/LikedSongs';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <MainNavBar/>
        </div>
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/login' element={ <LogIn/> }/>
          <Route path='/register' element={ <Register/> }/>
          <Route path='/liked-songs' element={ <LikedSongs/> }/>
          <Route path='/*' element={ <PageNotFound/> }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
