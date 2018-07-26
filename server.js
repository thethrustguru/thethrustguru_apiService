const express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors');

const app = express();

app.use(cors());

const { user, pass } = require('./db');

let uri = process.env.MONGODB_URI || `mongodb://${user}:${pass}@ds145921.mlab.com:45921/thethrust`;

console.log(uri);
mongoose.connect(uri).then(result => {
    console.log('Connected to MongoDB')
}).catch(err => {
    console.log(err);
    process.exit(0);
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
    console.log("Server listening on port: " + PORT)
})