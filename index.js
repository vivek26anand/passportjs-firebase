const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();
require('./middlewares/passport');


mongoose.connect("mongodb://127.0.0.1:27017/iic_auth", {
  useUnifiedTopology: true,
});
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.json());

const userRoute = require('./routes/user');
const profileRoute = require('./routes/profile');

app.use('/user', userRoute);
app.use('/secure',passport.authenticate('jwt', { session: false }),profileRoute);

app.listen(process.env.API_PORT, () => {
  console.log('Server started.')
});