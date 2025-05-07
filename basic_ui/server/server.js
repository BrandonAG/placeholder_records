const express = require('express');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.set('trust proxy', 1) // trust first proxy

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('../client/public'))

app.use(routes);

app.listen(PORT ,function(req,res){
    console.log("Server Started!");
});