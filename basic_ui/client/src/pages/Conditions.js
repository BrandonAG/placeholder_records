import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

const crud_address = 'http://classwork.engr.oregonstate.edu:57793';

function Conditions() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(crud_address + '/api/conditions', {
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
      <h1>Conditions</h1>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>condition_id</th>
        </tr>
      </thead>
      <tbody>
        {data !== null ? data.map((item, index) => (
            <tr>
            <td>{item.condition_id}</td>
            </tr>
        )) : <></>}
      </tbody>
    </Table>
    </>
  );
}

export default Conditions;