if (process.env.NODE_ENV != 'production')
  require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const wineRouter = require('./routes/wineRouter');
const manufacturerRouter = require('./routes/manufacturerRouter');
const authRouter = require('./routes/userManagementRouter');
const cartRouter = require('./routes/cartRouter');
const favoritesRouter = require('./routes/wishlistRouter');
const body_parser = require('body-parser');
const connectToDb = require('./config/connectToDb');

const app = express();
app.use(body_parser.json());
app.use(express.static('public'));

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

connectToDb();

app.get('/', (req, res) => {
  res.json({hello: 'world'});
});

app.use('/wines', wineRouter);
app.use('/manufacturers', manufacturerRouter);
app.use('/auth', authRouter);
app.use('/cart', cartRouter);
app.use('/wishlist', favoritesRouter);

app.listen(process.env.PORT);