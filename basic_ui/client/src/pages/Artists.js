import React, { useState, useEffect } from "react";
import {Table, Button} from 'react-bootstrap';
import AddArtistButton from "../components/AddArtistButton";
import UpdateArtistButton from "../components/UpdateArtistButton";
import 'bootstrap-icons/font/bootstrap-icons.css';

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function Artists({ reset }) {
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
        fetchData();
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
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [reset]);

  return (
    <>
      <h1 className="lead display-6 m-0 mt-2">Artists</h1>
      <div className="p-3">
        <AddArtistButton refreshData={fetchData} />
      </div>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>artist_id</th>
          <th>artist_name</th>
        </tr>
      </thead>
      <tbody>
        {data !== null ? data.map((item, index) => (
          <tr className="align-middle" key={index}>
            <td>{item.artist_id}</td>
            <td>{item.artist_name}</td>
            <td>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                <UpdateArtistButton artist_id={item.artist_id} artist_name={item.artist_name} refreshData={fetchData} />
                <Button variant="outline-danger" onClick={() => {handleDelete(item.artist_id)}}>
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

export default Artists;