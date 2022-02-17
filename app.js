var express = require('express');
var app = express();
var connectToDB = require('./config/db');
require('dotenv').config();
// Routes
var usersRouter = require('./routes/users');
// /v1/
var aquariumsRouter = require('./routes/v1/aquariums');

connectToDB();

app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.json('Hi!'));
app.use('/users', usersRouter);
app.use('/v1/aquariums', aquariumsRouter);
module.exports = app;
