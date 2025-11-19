const express = require("express");
const cors = require("cors");

const urlRoute = require("./routes/urlRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", urlRoute);

app.listen(5000, () => console.log("Server running on port 5000"));
