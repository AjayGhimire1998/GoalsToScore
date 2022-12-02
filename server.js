if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
} 

const express = require("express");
const app = express();
const expreesLayouts = require("express-ejs-layouts");

const indexRouter = require('./routes/index')

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expreesLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to mongoose'))


app.use('/', indexRouter);

app.listen(process.env.PORT || 5001, () => {
    console.log('Server running in Port: 5001')
})