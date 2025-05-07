const router = require('express').Router();
const album_details_routes = require('./album_details_routes');
const artist_album_details_routes = require('./artist_album_details_routes');
const artists_routes = require('./artists_routes');
const conditions_routes = require('./conditions_routes');
const customers_routes = require('./customers_routes');
const genre_album_details_routes = require('./genre_album_details_routes');
const genres_routes = require('./genres_routes');
const inventory_routes = require('./inventory_routes');
const media_types_routes = require('./media_types_routes');
const order_items_routes = require('./order_items_routes');
const orders_routes = require('./orders_routes');

router.use('/album-details', album_details_routes);
router.use('/artist-album-details', artist_album_details_routes);
router.use('/artists', artists_routes);
router.use('/conditions', conditions_routes);
router.use('/customers', customers_routes);
router.use('/genre-album-details', genre_album_details_routes);
router.use('/genres', genres_routes);
router.use('/inventory', inventory_routes);
router.use('/media-types', media_types_routes);
router.use('/order-items', order_items_routes);
router.use('/orders', orders_routes);

module.exports = router;