import React, { useState, useEffect } from "react";
import {Table, Button} from 'react-bootstrap';
import AlbumDetailsForm from "../components/AlbumDetailsForm";
import UpdateAlbumButton from "../components/UpdateAlbumButton";
import AddAlbumButton from "../components/AddAlbumButton";

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function AlbumDetails() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleDelete = async (id) => {
      try {
        const response = await fetch(crud_address + '/api/album-details/' + id, {
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
          const response = await fetch(crud_address + '/api/album-details', {
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
    }, []);

  return (
    <>
      <h1 className="lead display-6 m-0 mt-2">Album_Details</h1>
      <div className="p-3">
        <AddAlbumButton refreshData={fetchData} />
      </div>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>album_details_id</th>
          <th>album_name</th>
        </tr>
      </thead>
      <tbody>
        {data !== null ? data.map((item, index) => (
          <tr className="align-middle" key={index}>
            <td>{item.album_details_id}</td>
            <td>{item.album_name}</td>
            <td>
              <UpdateAlbumButton album_details_id={item.album_details_id} album_name={item.album_name} refreshData={fetchData} />
              <Button variant="outline-danger" onClick={() => {handleDelete(item.album_details_id)}}>
                <i className="bi bi-trash3-fill"></i>
              </Button>
            </td>
          </tr>
        )) : <></>}
      </tbody>
    </Table>
    </>
  );
}

export default AlbumDetails;