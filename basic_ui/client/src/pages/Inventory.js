import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import InventoryForm from "../components/InventoryForm";

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function Inventory({ reset }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [albumDetailsData, setAlbumDetails] = useState([]);
    
const fetchData = async () => {
            try {
                          // inconsistent end slashes in array, problem? 

                    const urlsToFetch = ['/api/inventory/', '/api/album-details/']

                const promises = urlsToFetch.map(url => {return fetch(crud_address + url, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })})
                let responses;
            
                        responses = await Promise.allSettled(promises);
                
                const fulfilledResponses = await Promise.all( responses.filter(r => r.status === "fulfilled")
                .map(r =>r.value.json()));

                const [inventoryData = [], albumDetailsData = []] = fulfilledResponses;
                //const json = await response.json();
                setData(inventoryData);
                setAlbumDetails(albumDetailsData);
                
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
        window.location.reload();
      }
    }
  
    useEffect(() => {/*
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
      };*/
  
      fetchData();
    }, [reset]);

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
            <tr key={index}>
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
    <InventoryForm dd_menu_data={data} albumDetailsData={albumDetailsData} refreshData={fetchData}/>
    </>
  );
}

export default Inventory;