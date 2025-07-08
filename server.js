const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cokieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cokieParser());

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.json({ msg: "this is Example" });
});

app.listen(PORT, () => {
  console.log("server is running");
});

app.use('/user',require('./routes/useRouter'))
app.use('/api',require('./routes/categoryRouter'))

const URI = process.env.MONGODB_URL;

mongoose.connect(URI, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  }).then(() => {
    console.log("MongoDB Conected");
  })
  .catch((err) => {
    console.log(err);
  });
