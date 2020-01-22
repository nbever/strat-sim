const express = require('express');
const expressql = require('express-graphql');
const mongoose = require('mongoose');

const {schema} = require('./schema');

var app = express();
mongoose.connect('mongodb://localhost:27017/strat', {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', () => {
  console.log('Error connecting');
});

db.on('connected', function() {
  console.log('DB connected');
});

app.use('/graphql', expressql({
  schema: schema,
  graphiql: true
}));

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
