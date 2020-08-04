const express = require('express');
const connectDB = require('./config/db');
const { connect } = require('mongoose');

const app = express();
// connect database
connectDB();

app.get('/', (req, res) => res.send('api running'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started at ${PORT}`));
