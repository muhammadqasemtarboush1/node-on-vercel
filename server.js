require("dotenv").config({ path: "./env" });
require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
// middlewares
connectDB();

app.use(express.json());
app.use(helmet());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());


app.use((req, res, next) => {
    // console.log(req);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

    next();
});
// routes
app.use("/api/auth", require("./routes/auth"));



// connect server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
    console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});
