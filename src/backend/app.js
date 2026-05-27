const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send({ message: "Bao Project API is running", version: "1.0.0" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
