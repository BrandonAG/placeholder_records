const router = require('express').Router();
const connection = require('../../config/connection');

router.get('/', async (req, res) => {
    try {
        // Get the results
        const [rows] = await connection.query(`CALL select_all_genre_album_details()`);

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
        const genre_id = req.body.genre_id;
        const album_details_id = req.body.album_details_id;
        const [rows] = await connection.query(`CALL delete_genre_album_details(${genre_id}, ${album_details_id})`);

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

router.post('/', async (req, res) => {
   try {
        const genre_id = req.body.genre_id;
        const album_details_id = req.body.album_details_id;
        console.log('Received POST data:', { genre_id, album_details_id });

        const [rows] = await connection.query(`CALL insert_genre_album_details(?, ?)`, [genre_id, album_details_id]);

        // Send back the results in JSON
        res.status(200).json(rows[0])

    } catch (error) {
        console.error("Error executing query:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database query.");
    }
});

module.exports = router;