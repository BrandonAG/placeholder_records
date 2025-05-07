import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import AlbumDetails from './pages/AlbumDetails';
import ArtistAlbumDetails from './pages/ArtistAlbumDetails';
import Artists from './pages/Artists';
import Conditions from './pages/Conditions';
import Customers from './pages/Customers';
import GenreAlbumDetails from './pages/GenreAlbumDetails';
import Genres from './pages/Genres';
import Inventory from './pages/Inventory';
import MediaTypes from './pages/MediaTypes';
import OrderItems from './pages/OrderItems';
import Orders from './pages/Orders';
import Navigation from './components/Nav';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Router>
        <Routes>
          <Route exact path='/' element={<Artists />}/>
          <Route exact path='/album-details' element={<AlbumDetails />}/>
          <Route exact path='/artist-album-details' element={<ArtistAlbumDetails />}/>
          <Route exact path='/artists' element={<Artists />}/>
          <Route exact path='/conditions' element={<Conditions />}/>
          <Route exact path='/customers' element={<Customers />}/>
          <Route exact path='/genre-album-details' element={<GenreAlbumDetails />}/>
          <Route exact path='/genres' element={<Genres />}/>
          <Route exact path='/inventory' element={<Inventory />}/>
          <Route exact path='/media-types' element={<MediaTypes />}/>
          <Route exact path='/order-items' element={<OrderItems />}/>
          <Route exact path='/orders' element={<Orders />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
