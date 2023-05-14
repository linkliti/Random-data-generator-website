require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./authRoute");
const generatorRoute = require("./generatorRoute");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const app = express();

//const generator = require("./generator/generator");
//console.log(generator.getOptions());

app.use(
  cookieSession({
    name: "session",
    keys: ["rdg"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use("/auth", authRoute);
app.use("/generator", generatorRoute);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
