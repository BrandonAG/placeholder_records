import React, { useState, useEffect } from "react";
const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function ArtistsForm({ dd_menu_data, refreshData }) {
    
    const [artistName, setArtistName] = useState('');

    const handleInsertArtist = async (e) => {
    e.preventDefault();
    await fetch(crud_address + '/api/artists/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ artist_name: artistName }),
    });
    setArtistName('');
    refreshData();
  };
    
    return (
        <>
            <form onSubmit={handleInsertArtist}>
            <label>Add Artist</label>
                <input type='text' placeholder='Enter artist name' value={artistName} onChange={(e) => setArtistName(e.target.value)}/>
                <button type="submit">Add</button>
      </form>
            <form>
                <label>Update Artist</label>
                <select id="artist" name="artist">
                    <option value="" disabled /*selected*/>Select an Artist to Update</option>
                    {dd_menu_data !== null ? dd_menu_data.map((item, index) => (
                        <option key={item.artist_id} value={item.artist_id}>ID: {item.artist_id}, {item.artist_name}</option>
                    )) : <></>}
                </select>
                <input type='text' placeholder='Enter updated artist name'></input>
                <button type="submit">Update</button>
            </form>
        </>
    )
}

export default ArtistsForm;
