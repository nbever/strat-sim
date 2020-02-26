const express = require('express');
const expressql = require('express-graphql');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const {schema} = require('./schema');

const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/strat', {useNewUrlParser: true});

const db = mongoose.connection;

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

const upload = multer({
  dest: './logos'
});

app.post('/api/logos', upload.single('logoUpload'), async (req, resp) => {
  const suffix = req.file.originalname.split('.')[1];
  fs.renameSync(req.file.path, `${req.file.path}.${suffix}`);
  resp.json({logo: `${req.file.filename}.${suffix}`});
});

app.get('/api/logos', (req, resp) => {
  if (!fs.existsSync('logos')) {
    fs.mkdirSync('logos');
  }

  const logos = fs.readdirSync('logos');
  resp.setHeader('Content-Type', 'application/json');
  resp.send(JSON.stringify({logos}));
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
