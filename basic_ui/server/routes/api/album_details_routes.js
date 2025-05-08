const router = require('express').Router();
const connection = require('../../config/connection');

async function getAll() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM Album_Details`, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}
// MODEL FUNCTIONS
async function getByID(id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM Album_Details WHERE Album_Details.album_details_id = ?`, [id], (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

async function updateInstance(id, album_name) {


}
// HELPER FUNCTIONS
function isVarchar(str) {
    return typeof str ==='string' && str.length <= 255
}

// CONTROLLER FUNCTIONS
router.get('/', async (req, res) => {
    console.log("GET");

    const albumDetails = await getAll();
    res.send(albumDetails);
});


router.get('/:id', async (req, res) => {
    console.log("GET by ID")
    const id = req.params.id;
    const albumDetails = await getByID(id);
    if (albumDetails.length() > 0) {
        res.status(200).send(albumDetails);
    }
    else {
        res.status(404).send({"Error": "Not found"});
    }
});

router.put('/:id', async (req, res) => {
    console.log ("PUT params: ", req.params);
    const id = req.params.id;
    const requestBody = req.body;

    //const albumDetails = await getByID(id);

    if (isVarchar(requestBody.album_name)) {
        if (await getByID(id)) {
            const result = await updateInstance(id, requestBody);

            if (result){
                const updatedAlbumDetails = await model.getByID(id);
                res.status(200).send(updatedAlbumDetails);
            }
            
            else {
                res.status(500).send({"Error": "Internal server error"});
            }
        }
        else {
            res.status(404).send({"Error": "Not found"});
        }

    }
    else {
        res.status(400).send({"Error": "Invalid Request - album_name must be VARCHAR(255)"})   ;
    }
})

module.exports = router;