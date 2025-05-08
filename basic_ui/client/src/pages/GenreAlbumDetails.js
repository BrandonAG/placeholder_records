import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import GenreAlbumDetailsForm from "../components/GenreAlbumDetailsForm";

function GenreAlbumDetails() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/genre-album-details', {
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
          <th>genre_id</th>
          <th>album_details_id</th>
        </tr>
      </thead>
      <tbody>
        {data !== null ? data.map((item, index) => (
            <tr>
            <td>{item.genre_id}</td>
            <td>{item.album_details_id}</td>
            <td><button>Delete</button></td>
            </tr>
        )) : <></>}
      </tbody>
    </Table>
    <GenreAlbumDetailsForm />
    </>
  );
}

export default GenreAlbumDetails;