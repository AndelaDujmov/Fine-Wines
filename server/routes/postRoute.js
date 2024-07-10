const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.use(express.static('public'));

const wineController = require('../controllers/wineController');
app.post('/create-wine', wineController);
module.exports = app;
