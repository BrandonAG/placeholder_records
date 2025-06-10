import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import AddInventoryButton from "../components/AddInventoryButton";
import UpdateInventoryButton from "../components/UpdateInventoryButton";

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function Inventory({ reset }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      // inconsistent end slashes in array, problem? 

      const urlsToFetch = ['/api/inventory/']

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

      const [inventoryData = []] = fulfilledResponses;
      //const json = await response.json();
      setData(inventoryData);

      console.log("Data initialized.")
    }
    catch (e) {
      setError(e);
    }
    finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(crud_address + '/api/inventory/' + id, {
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

  useEffect(() => {
    fetchData();
  }, [reset]);

  return (
    <>
      <h1 className="lead display-6 m-0 mt-2">Inventory</h1>
      <div className="p-3">
        <AddInventoryButton refreshData={fetchData} />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>album</th>
            <th>artist</th>
            <th>media type</th>
            <th>condition</th>
            <th>cost</th>
            <th>quantity</th>
          </tr>
        </thead>
        <tbody>
          {data !== null ? data.map((item, index) => (
            <tr className="align-middle" key={index}>
              <td>{item.inventory_id}</td>
              <td>{item.album_name}</td>
              <td>{item.artist_name}</td>
              <td>{item.media_type}</td>
              <td>{item.condition_type}</td>
              <td>{item.cost}</td>
              <td>{item.quantity}</td>
              <td>
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  <UpdateInventoryButton inventory_id={item.inventory_id} album_details_id={item.album_details_id} media_id={item.media_type} condition_id={item.condition_type} cost={item.cost} quantity={item.quantity} refreshData={fetchData} />
                  <Button variant="outline-danger" onClick={() => {handleDelete(item.inventory_id)}}>
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

export default Inventory;