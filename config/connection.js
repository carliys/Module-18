//  const { connect, connection } = require('mongoose');
// //  mongoose.set('strictQuery', true);

// const mongoose = require("mongoose");

// connect(
//   process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-network",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

// // mongoose.set("debug", true);

// module.exports = connection;


const mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/18-social-network-api", { useNewUrlParser: true, useUnifiedTopology: true, } ); 

module.exports = mongoose.connection; 
