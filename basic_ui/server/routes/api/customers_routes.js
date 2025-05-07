const router = require('express').Router();
const connection = require('../../config/connection');

async function getAll() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM Customers`, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

router.get('/', async (req, res) => {
    console.log("GET");

    const albumDetails = await getAll();
    res.send(albumDetails);
});


router.get('/:id', (req, res) => {

});

module.exports = router;