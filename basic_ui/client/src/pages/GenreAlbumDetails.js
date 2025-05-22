import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import GenreAlbumDetailsForm from "../components/GenreAlbumDetailsForm";

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function GenreAlbumDetails() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        window.location.reload();
      }
    }
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(crud_address + '/api/genre-album-details', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const json = await response.json();
          setData(json);
          console.log("DATA");
          console.log(data);
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

  return (
    <>
      <h1>Genre_Album_Details</h1>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>genre_name</th>
          <th>album_name</th>
        </tr>
      </thead>
      <tbody>
        {data !== null ? data.map((item, index) => (
            <tr>
            <td>{item.genre_name}</td>
            <td>{item.album_name}</td>
            <td><button onClick={() => {handleDelete(item.genre_id, item.album_details_id)}}>Delete</button></td>
            </tr>
        )) : <></>}
      </tbody>
    </Table>
    <GenreAlbumDetailsForm />
    </>
  );
}

export default GenreAlbumDetails;