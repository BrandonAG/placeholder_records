const router = require('express').Router();
const connection = require('../../config/connection');

async function getAll() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM Artists`, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

router.get('/', async (req, res) => {
    console.log("GET");

    const artists = await getAll();
    res.send(artists);
});


router.get('/:id', (req, res) => {

});

module.exports = router;