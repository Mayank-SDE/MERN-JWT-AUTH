const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");

const app = express();

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//database connection
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database Connected")
}).catch(error => {
    console.log("Databse not connected", error)
});


app.use("/", require("./routes/authRoutes"));

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

