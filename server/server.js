const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const multer = require('multer');

const app = express();
const upload = multer();
app.use(cors());
app.use(upload.any());

const CONNECTION_STRING = "mongodb+srv://andeladujmov3:WHC9AM6xCx0QovF1@cluster0.vgredfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DBNAME = "finewines";

let database;

MongoClient.connect(CONNECTION_STRING)
  .then(client => {
    database = client.db(DBNAME);
    console.log("Connected to MongoDB successfully!");

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

app.get('/', (req, res) => {
    if (!database) {
        res.status(500).json({ error: 'Database connection not established' });
        return;
    }
    res.status(200).json({ message: 'Server is running' });
});

app.get('/finewines/wines', async (req, res) => {
    if (!database) {
        res.status(500).json({ error: 'Database connection not established' });
        return;
    }

    try {
        const result = await database.collection('finewinescollection').find({}).toArray();
        res.status(200).json(result);
    } catch (err) {
        console.error('Error fetching finewines:', err);
        res.status(500).json({ error: 'Error fetching finewines' });
    }
});

app.post('/finewines/add', multer().none(), async(req, res) => {
    if (!database) {
        res.status(500).json({ error: 'Database connection not established' });
        return;
    }

    try{
        const result = await database.collection('finewinescollection').count({}, function(err, numOfDocs){
            database.collection('finewinescollection').insertOne({
                id: (numOfDocs + 1).toString(),
                name: req.body.name,
                price: parseInt(req.body.price, 10),
                alcoholPercentage: parseFloat(req.body.alcoholPercentage),
                color: req.body.color,
                type: req.body.type,
                manufacturer: req.body.manufacturer
            });
            response.json("Added successfully!");
        })
    } catch {

    }
});