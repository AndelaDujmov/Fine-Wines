if (process.env.NODE_ENV != 'production')
  require('dotenv').config();

const express = require('express');
const cors = require('cors');
const wineRouter = require('./routes/wineRouter');
const manufacturerRouter = require('./routes/manufacturerRouter');
const body_parser = require('body-parser');
const connectToDb = require('./config/connectToDb');

const app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cors());
// app.use(cors({
//   origin: "http://localhost:3000",
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type']
// }))

connectToDb();

app.get('/', (req, res) => {
  res.json({hello: 'world'});
});

app.use('/wines', wineRouter);

app.use('/manufacturers', manufacturerRouter);

app.listen(process.env.PORT);