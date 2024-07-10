const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const app = express();
const upload = multer();
app.use(cors());
app.use(upload.any());

const CONNECTION_STRING = "mongodb+srv://andeladujmov3:WHC9AM6xCx0QovF1@cluster0.vgredfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DBNAME = "finewines";

let database;

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define a schema
const wineSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  percentage: Number,
  color: String,
  manufacturer: String
});

// Create a model
const Wine = mongoose.model('Wine', wineSchema);

// Example: Create a new wine document
const newWine = new Wine({
  name: 'Cabernet Sauvignon',
  type: 'Red',
  price: 20,
  percentage: 13.5,
  color: 'Red',
  manufacturer: 'Napa Valley'
});

newWine.save()
  .then(() => console.log('New wine saved'))
  .catch(error => console.error('Error saving wine:', error));

app.get('/', (req, res) => {
    if (!database) {
        res.status(500).json({ error: 'Database connection not established' });
        return;
    }
    res.status(200).json({ message: 'Server is running' });
});