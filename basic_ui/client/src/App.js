import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlbumDetails from './pages/AlbumDetails';
import ArtistAlbumDetails from './pages/ArtistAlbumDetails';
import Artists from './pages/Artists';
import GenreAlbumDetails from './pages/GenreAlbumDetails';
import Genres from './pages/Genres';
import Inventory from './pages/Inventory';
import Navigation from './components/Nav';
import Home from './pages/Home';

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function App() {
  const handleReset = async () => {
    try {
      const response = await fetch(crud_address + '/api/reset', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
    } catch (e) {
      
    } finally {
      window.location.reload();
    }
  }

  return (
    <div className="App">
      <Navigation handleReset={handleReset}/>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/album-details' element={<AlbumDetails />}/>
          <Route exact path='/artist-album-details' element={<ArtistAlbumDetails />}/>
          <Route exact path='/artists' element={<Artists />}/>
          <Route exact path='/genre-album-details' element={<GenreAlbumDetails />}/>
          <Route exact path='/genres' element={<Genres />}/>
          <Route exact path='/inventory' element={<Inventory />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
