import { useState, useEffect } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function AddGenreAlbumButton({ refreshData }) {
  const [userFormData, setUserFormData] = useState({ genreID: null, albumID: null });
  const [show, setShow] = useState(false);
  const [genresData, setGenres] = useState([]);
  const [albumDetailsData, setAlbumDetails] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    fetchData();
    setShow(true);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const fetchData = async () => {
    try {
      // inconsistent end slashes in array, problem? 

      const urlsToFetch = ['/api/genres/', '/api/album-details/']

      const promises = urlsToFetch.map(url => {
        return fetch(crud_address + url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        })
      })
      const responses = await Promise.allSettled(promises);

      const fulfilledResponses = await Promise.all(responses.filter(r => r.status === "fulfilled")
        .map(r => r.value.json()));

      const [genresData = [], albumDetailsData = []] = fulfilledResponses;
      //const json = await response.json();
      const artist_default = genresData[0] ? genresData[0].artist_id : null;
      const album_default = albumDetailsData[0] ? albumDetailsData[0].album_details_id : null;
      setUserFormData({ artistID: artist_default, albumID: album_default });
      setGenres(genresData);
      setAlbumDetails(albumDetailsData);
    }
    catch (e) {

    }
    finally {

    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setShow(false);

    try {
      fetch(crud_address + '/api/genre-album-details', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          genre_id: userFormData.genreID,
          album_details_id: userFormData.albumID,
        }),
      })
        .then(response => response.text())
        .then((result) => {
          refreshData();
        });
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      genreID: null,
      albumID: null
    });
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Add Genre-Album Details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Genre-Album Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor='genreID'>Select a Genre</Form.Label>
              <Form.Select name='genreID' value={userFormData.artistID} onChange={handleInputChange}>
                {genresData !== null ? genresData.map((item, index) => (
                  <option key={item.genre_id} value={item.genre_id}>ID: {item.genre_id}, {item.genre_name}</option>
                )) : <></>}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor='albumID'>Select an Album</Form.Label>
              <Form.Select name='albumID' value={userFormData.albumID} onChange={handleInputChange}>
                {albumDetailsData !== null ? albumDetailsData.map((item, index) => (
                  <option key={item.album_details_id} value={item.album_details_id}>ID: {item.album_details_id}, {item.album_name}</option>
                )) : <></>}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddGenreAlbumButton;