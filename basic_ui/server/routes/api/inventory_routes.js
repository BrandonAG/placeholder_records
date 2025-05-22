const router = require('express').Router();
const connection = require('../../config/connection');

router.get('/', async (req, res) => {
    try {
        // Get the results
        const [rows] = await connection.query(`CALL select_all_inventory()`);

        // Send back the results in JSON
        res.status(200).json(rows[0])

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        // Get the results
        const id = req.params.id;
        const [rows] = await connection.query(`CALL delete_inventory(${id})`);

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