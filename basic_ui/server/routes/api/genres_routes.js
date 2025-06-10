const router = require('express').Router();
const connection = require('../../config/connection');

router.get('/', async (req, res) => {
    try {
        // Get the results
        const [rows] = await connection.query(`CALL select_all_genres()`);

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
        const [rows] = await connection.query(`CALL delete_genres(${id})`);

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
        const genre_name = req.body.genre_name;

        const [rows] = await connection.query(`CALL insert_genre(?)`, [genre_name]);

        // Send back the results in JSON
        res.status(200).json(rows[0])

    } catch (error) {
        console.error("Error executing query:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database query.");
    }
});

router.put('/:id', async (req, res) => {
   try {
        const genre_id = req.params.id;
        const genre_name = req.body.genre_name;

        const [rows] = await connection.query(`CALL update_genre_by_id(?,?)`, [genre_id, genre_name]);

        // Send back the results in JSON
        res.status(200).json(rows)

    } catch (error) {
        console.error("Error executing query:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database query.");
    }
});

module.exports = router;