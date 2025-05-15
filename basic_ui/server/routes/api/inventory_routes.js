const router = require('express').Router();
const connection = require('../../config/connection');

router.get('/', async (req, res) => {
    try {
        // Get the results
        const [rows] = await connection.query(`SELECT inventory_id, Album_Details.album_name, Artists.artist_name, media_type, condition_type, cost, quantity FROM Inventory
            JOIN Album_Details ON Inventory.album_details_id = Album_Details.album_details_id
            JOIN Artist_Album_Details ON Inventory.album_details_id = Artist_Album_Details.album_details_id
            JOIN Artists ON Artist_Album_Details.artist_id = Artists.artist_id`);

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