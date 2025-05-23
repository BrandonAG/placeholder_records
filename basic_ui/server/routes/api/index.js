const router = require('express').Router();
const album_details_routes = require('./album_details_routes');
const artist_album_details_routes = require('./artist_album_details_routes');
const artists_routes = require('./artists_routes');
const genre_album_details_routes = require('./genre_album_details_routes');
const genres_routes = require('./genres_routes');
const inventory_routes = require('./inventory_routes');
const connection = require('../../config/connection');

router.use('/album-details', album_details_routes);
router.use('/artist-album-details', artist_album_details_routes);
router.use('/artists', artists_routes);
router.use('/genre-album-details', genre_album_details_routes);
router.use('/genres', genres_routes);
router.use('/inventory', inventory_routes);

router.post('/reset', async (req, res) => {
    console.log("RESET");
    try {
        // Get the results
        const [rows] = await connection.query(`CALL load_prdb()`);

        // Send back the results in JSON
        res.status(200).json(rows)

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

module.exports = router;