import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import ArtistAlbumDetailsForm from "../components/ArtistAlbumDetailsForm";

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function ArtistAlbumDetails({ reset }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [artistsData, setArtists] = useState([]);
  const [albumDetailsData, setAlbumDetails] = useState([]);

  const fetchData = async () => {
    try {
      // inconsistent end slashes in array, problem? 

      const urlsToFetch = ['/api/artists/', '/api/album-details/', '/api/artist-album-details']

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

      const [artistsData = [], albumDetailsData = [], artistAlbumDetailsData = []] = fulfilledResponses;
      //const json = await response.json();
      setArtists(artistsData);
      setAlbumDetails(albumDetailsData);
      setData(artistAlbumDetailsData);
      console.log("Data initialized.")
    }
    catch (e) {
      setError(e);
    }
    finally {
      setLoading(false);
    }
  };

  const handleDelete = async (artist_id, album_id) => {
    try {
      const response = await fetch(crud_address + '/api/artist-album-details', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          artist_id: artist_id,
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
    fetchData();
  }, [reset]);

  return (
    <>
      <h1>Artist_Album_Details</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>artist_name</th>
            <th>album_name</th>
          </tr>
        </thead>
        <tbody>
          {data !== null ? data.map((item, index) => (
            <tr key={index}>
              <td>{item.artist_name}</td>
              <td>{item.album_name}</td>
              <td><button onClick={() => { handleDelete(item.artist_id, item.album_details_id) }}>Delete</button></td>
            </tr>
          )) : <></>}
        </tbody>
      </Table>
      <ArtistAlbumDetailsForm artistsData={artistsData} albumDetailsData={albumDetailsData} refreshData={fetchData} />
    </>
  );
}

export default ArtistAlbumDetails;