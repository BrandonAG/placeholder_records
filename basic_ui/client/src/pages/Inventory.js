import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import InventoryForm from "../components/InventoryForm";

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function Inventory() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        window.location.reload();
      }
    }
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(crud_address + '/api/inventory', {
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
      <h1>Inventory</h1>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>inventory_id</th>
          <th>album_name</th>
          <th>media_type</th>
          <th>condition_type</th>
          <th>cost</th>
          <th>quantity</th>
        </tr>
      </thead>
      <tbody>
        {data !== null ? data.map((item, index) => (
            <tr>
            <td>{item.inventory_id}</td>
            <td>{item.album_name}</td>
            <td>{item.media_type}</td>
            <td>{item.condition_type}</td>
            <td>{item.cost}</td>
            <td>{item.quantity}</td>
            <td><button onClick={() => {handleDelete(item.inventory_id)}}>Delete</button></td>
            </tr>
        )) : <></>}
      </tbody>
    </Table>
    <InventoryForm />
    </>
  );
}

export default Inventory;