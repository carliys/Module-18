const express = require('express');
const db = require('./config/connection');
// const routes = require('./routes');
const PORT = process.env.port || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('./routes'));
// app.use(routes);

// db.once('open', () => {
//   console.log('Succefully connected to MongoDB')
//   app.listen(PORT, () => {
//     console.log(`API server forrunning on port ${PORT}!`);
//   });
// }); 

// const express = require('express');
// const routes = require('./routes');
// const mongoose = require('mongoose');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, err => {
//     if (err) throw err;
//     console.log('Connected to MongoDb')
// });

// Use this to log mongo queries being executed!
//mongoose.set('debug', true);

// app.use(require('./routes'));
// app.use(routes);

db.once("open",() => {
  app.listen(PORT, () => { console.log(`Connected on localhost:${PORT}`)});
});


