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
import { useState, useEffect } from "react";

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function App() {
  const [data, setData] = useState(false);

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
      setData(!data);
    } catch (e) {

    } finally {
      // window.location.reload();
    }
  }

  useEffect(() => {
    console.log("EFFECT");
  }, [data]);

  return (
    <div className="App">
      <Router>
        <Navigation handleReset={handleReset} />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/album-details' element={<AlbumDetails reset={data} />} />
          <Route exact path='/artist-album-details' element={<ArtistAlbumDetails reset={data} />} />
          <Route exact path='/artists' element={<Artists reset={data} />} />
          <Route exact path='/genre-album-details' element={<GenreAlbumDetails reset={data} />} />
          <Route exact path='/genres' element={<Genres reset={data} />} />
          <Route exact path='/inventory' element={<Inventory reset={data} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
