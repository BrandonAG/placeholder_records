const router = require('express').Router();
const connection = require('../../config/connection');

router.get('/', async (req, res) => {
    try {
        // Get the results
        const [rows] = await connection.query(`CALL select_all_artist_album_details()`);

        // Send back the results in JSON
        res.status(200).json(rows[0])

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

router.delete('/', async (req, res) => {
    try {
        // Get the results
        const artist_id = req.body.artist_id;
        const album_details_id = req.body.album_details_id;
        const [rows] = await connection.query(`CALL delete_artist_album_details(${artist_id}, ${album_details_id})`);

        // Send back the results in JSON
        res.status(200).json(rows)

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

router.get('/:id', (req, res) => {

});

module.exports = router;