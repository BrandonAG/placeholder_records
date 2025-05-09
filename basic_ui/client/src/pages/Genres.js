import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import GenresForm from "../components/GenresForm";

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function Genres() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(crud_address + '/api/genres', {
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
      <h1>Genres</h1>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>genre_id</th>
          <th>genre_name</th>
        </tr>
      </thead>
      <tbody>
        {data !== null ? data.map((item, index) => (
            <tr>
            <td>{item.genre_id}</td>
            <td>{item.genre_name}</td>
            <td><button>Delete</button></td>
            </tr>
        )) : <></>}
      </tbody>
    </Table>
    <GenresForm />
    </>
  );
}

export default Genres;