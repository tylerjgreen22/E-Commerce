require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const productRoutes = require("./src/products/routes");

const app = express();

//logging middleware
app.use(morgan("dev"));

//json parsing middleware
app.use(express.json());

//static file serving from public folder middleware
app.use(express.static("public"));

//cors middleware
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
//cookie parsing middleware
app.use(cookieParser());

//body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));

//session creating middleware
app.use(
  session({
    key: "userId",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60 * 24,
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/products", productRoutes);

app.listen(process.env.PORT, () =>
  console.log(`app listening on port ${process.env.PORT}`)
);
