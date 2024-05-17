const express = require("express");
const app = express();
const cors = require("cors");
const { dbConnect } = require("./db/dbConnect");
const { readdirSync } = require("fs");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

//routes
readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

const server = () => {
  dbConnect();
  app.listen(PORT, () => {
    console.log(`Server is listening to ${PORT}`);
  });
};

server();
