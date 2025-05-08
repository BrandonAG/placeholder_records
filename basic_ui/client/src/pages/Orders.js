import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

const crud_address = 'http://classwork.engr.oregonstate.edu:57793';

function Orders() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(crud_address + '/api/orders', {
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
      <h1>Orders</h1>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>order_id</th>
          <th>customer_id</th>
          <th>total_cost</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>
        {data !== null ? data.map((item, index) => (
            <tr>
            <td>{item.order_id}</td>
            <td>{item.customer_id}</td>
            <td>{item.total_cost}</td>
            <td>{item.date}</td>
            </tr>
        )) : <></>}
      </tbody>
    </Table>
    </>
  );
}

export default Orders;