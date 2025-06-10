import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import AddGenreAlbumButton from "../components/AddGenreAlbumButton";
import UpdateGenreAlbumButton from "../components/UpdateGenreAlbumButton";

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function GenreAlbumDetails({ reset }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      // inconsistent end slashes in array, problem? 

      const urlsToFetch = ['/api/genre-album-details']

      const promises = urlsToFetch.map(url => {
        return fetch(crud_address + url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        })
      })
      let responses;
      responses = await Promise.allSettled(promises);
      const fulfilledResponses = await Promise.all(responses.filter(r => r.status === "fulfilled")
        .map(r => r.value.json()));

      const [genreAlbumDetailsData = []] = fulfilledResponses;
      //const json = await response.json();
      setData(genreAlbumDetailsData);
      console.log("Data initialized.")
    }
    catch (e) {
      setError(e);
    }
    finally {
      setLoading(false);
    }
  };

  const handleDelete = async (genre_id, album_id) => {
    try {
      const response = await fetch(crud_address + '/api/genre-album-details', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          genre_id: genre_id,
          album_details_id: album_id
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
    } catch (e) {

    } finally {
      fetchData();
    }
  }

  useEffect(() => {
    fetchData();
  }, [reset]);

  return (
    <>
      <h1 className="lead display-6 m-0 mt-2">Genre_Album_Details</h1>
      <div className="p-3">
        <AddGenreAlbumButton refreshData={fetchData} />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>genre_name</th>
            <th>album_name</th>
          </tr>
        </thead>
        <tbody>
          {data !== null ? data.map((item, index) => (
            <tr className="align-middle" key={index}>
              <td>{item.genre_name}</td>
              <td>{item.album_name}</td>
              <td>
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  <UpdateGenreAlbumButton genre_id={item.genre_id} album_details_id={item.album_details_id} refreshData={fetchData} />
                  <Button variant="outline-danger" onClick={() => { handleDelete(item.genre_id, item.album_details_id) }}>
                    <i className="bi bi-trash3-fill"></i>
                  </Button>
                </div>
              </td>
            </tr>
          )) : <></>}
        </tbody>
      </Table>
    </>
  );
}

export default GenreAlbumDetails;