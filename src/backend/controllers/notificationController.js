const dbService = require("../services/dbService");

const list = (req, res) => {
  const notifications = dbService.notifications
    .filter((item) => item.userId === req.user.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  res.json(notifications);
};

module.exports = { list };
