const dbService = require("../services/dbService");

const list = (req, res) => {
  res.json(dbService.videos);
};

module.exports = { list };
