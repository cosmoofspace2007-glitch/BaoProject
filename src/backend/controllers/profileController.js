const dbService = require("../services/dbService");

const update = (req, res) => {
  const user = dbService.users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: "Người dùng không tìm thấy." });
  }

  const { name, email, avatar, password } = req.body;
  if (email && email.toLowerCase() !== user.email) {
    const exists = dbService.users.find(
      (u) => u.email === email.toLowerCase() && u.id !== user.id,
    );
    if (exists) {
      return res.status(409).json({ message: "Email đã được sử dụng." });
    }
    user.email = email.toLowerCase();
  }

  user.name = name || user.name;
  user.avatar = avatar || user.avatar;
  if (password) {
    user.password = password;
  }
  user.updatedAt = new Date().toISOString();

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  });
};

module.exports = { update };
