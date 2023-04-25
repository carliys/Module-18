const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const PORT = process.env.port || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  console.log('Succefully connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`API server forrunning on port ${PORT}!`);
  });
});
