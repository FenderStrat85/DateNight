const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();
const PORT = process.env.PORT;
const router = require('./router');

const app = express();

const corsConfig = {
  origin: 'http://192.168.1.66:3000',
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(
  session({
    name: 'sid',
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      someSite: true,
      httpOnly: false,
      secure: false,
    },
  }),
);

app.use(router);

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`);
  } else {
    console.log(`🚀 Server listenting on port ${PORT}`);
  }
});
