require("dotenv").config();
const express = require("express");
const app = express();

const cookieSession = require("cookie-session");
const cors = require("cors");
const passport = require("passport");
const passportStrategy = require("./auth/passport"); // important

const authRoute = require("./auth/authRoute");
const saveRoute = require("./save/saveRoute");
const generatorRoute = require("./generator/generatorRoute");

//const generator = require("./generator/generator");
//console.log(generator.getOptions());
/*
require("./save/save").getData("752bfd145");
require("./save/save").saveData("752bfd145", {
  storeID: 4,
  category: 'monk',
  func: 'efe',
  lang: 'en',
  seed: '42134',
  count: '1',
  params: '{todo}',
  outNewLine: true,
  outCommas: false,
  outWrap: true
});
*/

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
app.use("/save", saveRoute);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
