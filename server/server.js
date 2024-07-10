
const mongoose = require('mongoose');


const CONNECTION_STRING = "mongodb+srv://andeladujmov3:WHC9AM6xCx0QovF1@cluster0.vgredfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DBNAME = "finewines";

let database;

mongoose.connect(CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
/*
const wineSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  percentage: Number,
  color: String,
  manufacturer: String
});

const Wine = mongoose.model('Wine', wineSchema);

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
});*/