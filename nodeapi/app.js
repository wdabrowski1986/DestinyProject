const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

//db
mongoose.connect(process.env.MONGO_URI,
    {useNewUrlParser: true, useUnifiedTopology: true},
    )
    .then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB Connection error: ${err.message}`);
});


//bring in routes
const postRoutes = require("./routes/post");


//middleware
app.use(morgan('dev'));
app.use("/", postRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`);
});