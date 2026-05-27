const dbService = require("../services/dbService");

const users = (req, res) => {
  const userList = dbService.users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    isBanned: u.isBanned || false,
  }));
  res.json(userList);
};

const banUser = (req, res) => {
  const userId = Number(req.params.id);
  const user = dbService.users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "Người dùng không tồn tại." });
  }
  if (user.role === "admin") {
    return res.status(403).json({ message: "Không thể khóa tài khoản admin." });
  }
  user.isBanned = true;
  res.json({ message: "Người dùng đã bị khóa." });
};

const analytics = (req, res) => {
  const totalArticles = dbService.articles.length;
  const totalDrafts = dbService.drafts.length;
  const totalComments = dbService.comments.length;
  const totalUsers = dbService.users.length;
  const featuredArticles = dbService.articles.filter((a) => a.featured).length;

  res.json({
    totalArticles,
    totalDrafts,
    totalComments,
    totalUsers,
    featuredArticles,
    timestamp: new Date().toISOString(),
  });
};

const backup = (req, res) => {
  res.json({
    message: "Backup đã được tạo thành công (mô phỏng).",
    data: {
      users: dbService.users.length,
      articles: dbService.articles.length,
      drafts: dbService.drafts.length,
      comments: dbService.comments.length,
    },
  });
};

module.exports = { users, banUser, analytics, backup };
