import React, { useState, useEffect } from "react";
import {Table, Button} from 'react-bootstrap';
import ArtistsForm from "../components/ArtistsForm";
import UpdateArtistButton from "../components/UpdateArtistButton";
import 'bootstrap-icons/font/bootstrap-icons.css';

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function Artists() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleDelete = async (id) => {
      try {
        const response = await fetch(crud_address + '/api/artists/' + id, {
          method: 'DELETE',
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

      const fetchData = async () => {
        try {
          const response = await fetch(crud_address + '/api/artists', {
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
  
    useEffect(() => {
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
            <tr key={index}>
            <td>{item.artist_id}</td>
            <td>{item.artist_name}</td>
            <td>
              <UpdateArtistButton artist_id={item.artist_id} artist_name={item.artist_name} />
              <Button variant="outline-danger" onClick={() => {handleDelete(item.artist_id)}}>
                <i className="bi bi-trash3-fill"></i>
              </Button>
            </td>
            </tr>
        )) : <></>}
      </tbody>
    </Table>
    <ArtistsForm dd_menu_data={data} refreshData={fetchData} />
    </>
  );
}

export default Artists;