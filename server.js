const express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors');
const passport = require('passport');
const app = express();

app.use(cors());
app.use(passport.initialize());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const recipesRoutes = require('./routes/recipes');
const itemsRoutes = require('./routes/items');
const userRoutes = require('./routes/user.routes');
const logRoutes = require('./routes/logger');
require('./config/passport')(passport);

app.use('/user', userRoutes);
app.use('/recipes', recipesRoutes);
app.use('/items', itemsRoutes);
app.use('/logs', logRoutes);
//connect to MongoDB
const { user, pass } = require('./db');
let uri = process.env.MONGODB_URI || `mongodb://${user}:${pass}@ds145921.mlab.com:45921/thethrust`;
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