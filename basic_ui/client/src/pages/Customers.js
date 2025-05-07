import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

function Customers() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/customers', {
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
      <h1>Customers</h1>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>customer_id</th>
          <th>first_name</th>
          <th>last_name</th>
          <th>register_date</th>
        </tr>
      </thead>
      <tbody>
        {data !== null ? data.map((item, index) => (
            <tr>
            <td>{item.customer_id}</td>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.register_date}</td>
            </tr>
        )) : <></>}
      </tbody>
    </Table>
    </>
  );
}

export default Customers;