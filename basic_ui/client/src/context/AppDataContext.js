import React, { createContext, useContext, useEffect, useState } from 'react';

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';


const AppContext = createContext();
export const useAppData = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [albumDetails, setAlbumDetails] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [artistAlbumDetails, setArtistAlbumDetails] = useState([]);
    const [genreAlbumDetails, setGenreAlbumDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                          // inconsistent end slashes in array, problem? 

                    const urlsToFetch = ['/api/artists/','/api/genres/', '/api/album-details/', '/api/inventory', '/api/artist-album-details', '/api/genre-album-details']

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

                const [artistsData = [], genresData = [], albumDetailsData = [], inventoryData = [], artistAlbumDetailsData = [], genreAlbumDetailsData = []] = fulfilledResponses;
                //const json = await response.json();
                setArtists(artistsData);
                setGenres(genresData);
                setAlbumDetails(albumDetailsData);
                setInventory(inventoryData);
                setArtistAlbumDetails(artistAlbumDetailsData);
                setGenreAlbumDetails(genreAlbumDetailsData);
                console.log("Data initialized.")
            }
            catch (e) {
                setError(e);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <AppContext.Provider value={{
            artists, genres, albumDetails, inventory, artistAlbumDetails, genreAlbumDetails, loading, error}}>
            {children}
        </AppContext.Provider>
    );
};