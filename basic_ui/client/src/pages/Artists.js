import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import ArtistsForm from "../components/ArtistsForm";

function Artists() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/artists', {
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
      <h1>Artists</h1>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>artist_id</th>
          <th>artist_name</th>
        </tr>
      </thead>
      <tbody>
        {data !== null ? data.map((item, index) => (
            <tr>
            <td>{item.artist_id}</td>
            <td>{item.artist_name}</td>
            <td><button>Delete</button></td>
            </tr>
        )) : <></>}
      </tbody>
    </Table>
    <ArtistsForm />
    </>
  );
}

export default Artists;