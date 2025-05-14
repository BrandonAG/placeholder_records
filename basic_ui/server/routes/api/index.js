const router = require('express').Router();
const album_details_routes = require('./album_details_routes');
const artist_album_details_routes = require('./artist_album_details_routes');
const artists_routes = require('./artists_routes');
const genre_album_details_routes = require('./genre_album_details_routes');
const genres_routes = require('./genres_routes');
const inventory_routes = require('./inventory_routes');

router.use('/album-details', album_details_routes);
router.use('/artist-album-details', artist_album_details_routes);
router.use('/artists', artists_routes);
router.use('/genre-album-details', genre_album_details_routes);
router.use('/genres', genres_routes);
router.use('/inventory', inventory_routes);

module.exports = router;