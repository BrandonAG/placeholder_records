const path = require('path');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.set('trust proxy', 1) // trust first proxy

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL || '*' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(routes);

app.get('*splat', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT ,function(req,res){
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});