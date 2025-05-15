const router = require('express').Router();
const connection = require('../../config/connection');

router.get('/', async (req, res) => {
    try {
        // Get the results
        const [rows] = await connection.query(`SELECT Genres.genre_name, Album_Details.album_name FROM Genre_Album_Details
            JOIN Genres ON Genre_Album_Details.genre_id = Genres.genre_id
            JOIN Album_Details ON Genre_Album_Details.album_details_id = Album_Details.album_details_id`);

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