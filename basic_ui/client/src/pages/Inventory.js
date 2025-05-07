import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

function Inventory() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/inventory', {
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
          <th>album_details_id</th>
          <th>media_type_id</th>
          <th>condition_id</th>
          <th>cost</th>
          <th>quantity</th>
        </tr>
      </thead>
      <tbody>
        {data !== null ? data.map((item, index) => (
            <tr>
            <td>{item.inventory_id}</td>
            <td>{item.album_details_id}</td>
            <td>{item.media_type_id}</td>
            <td>{item.condition_id}</td>
            <td>{item.cost}</td>
            <td>{item.quantity}</td>
            </tr>
        )) : <></>}
      </tbody>
    </Table>
    </>
  );
}

export default Inventory;