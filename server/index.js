const express = require("express"),
        app = express(),
        cors = require("cors");

// middleware

app.use(express.json());
app.use(cors());

// routes //

// register and login

app.use("/auth", require("./routes/jwtAuth"));

// dashboard

app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () => {
    console.log("server is running on port 5000");
});