import { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import AddGenreButton from "../components/AddGenreButton"
import UpdateGenreButton from "../components/UpdateGenreButton";

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function Genres({ reset }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(crud_address + '/api/genres/' + id, {
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

  useEffect(() => {
    fetchData();
  }, [reset]);

  return (
    <>
      <h1 className="lead display-6 m-0 mt-2">Genres</h1>
      <div className="p-3">
        <AddGenreButton refreshData={fetchData} />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {data !== null ? data.map((item, index) => (
            <tr className="align-middle" key={index}>
              <td>{item.genre_id}</td>
              <td>{item.genre_name}</td>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                <UpdateGenreButton genre_id={item.genre_id} genre_name={item.genre_name} refreshData={fetchData} />
                <Button variant="outline-danger" onClick={() => { handleDelete(item.genre_id) }}>
                  <i className="bi bi-trash3-fill"></i>
                </Button>
              </div>
            </tr>
          )) : <></>}
        </tbody>
      </Table>
    </>
  );
}

export default Genres;