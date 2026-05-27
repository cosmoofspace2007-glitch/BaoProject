const dbService = require("../services/dbService");

const list = (req, res) => {
  const users = dbService.users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
  }));
  res.json(users);
};

const analytics = (req, res) => {
  const totalArticles = dbService.articles.length;
  const totalComments = dbService.comments.length;
  const totalUsers = dbService.users.length;
  const activeWriters = dbService.users.filter((u) =>
    ["writer", "editor"].includes(u.role),
  ).length;
  res.json({
    totalArticles,
    totalComments,
    totalUsers,
    activeWriters,
    timestamp: new Date().toISOString(),
  });
};

const backup = (req, res) => {
  res.json({
    message: "Backup đã được tạo thành công (mô phỏng).",
    data: {
      users: dbService.users.length,
      articles: dbService.articles.length,
      comments: dbService.comments.length,
    },
  });
};

module.exports = { list, analytics, backup };
