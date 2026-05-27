const dbService = require("../services/dbService");
const jwtService = require("../services/jwtService");

const register = (req, res) => {
  const { name, email, password, role = "reader" } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Vui lòng cung cấp tên, email và mật khẩu." });
  }

  const existing = dbService.users.find(
    (user) => user.email === email.toLowerCase(),
  );
  if (existing) {
    return res.status(409).json({ message: "Email đã được sử dụng." });
  }

  const user = dbService.createUser({ name, email, password, role });
  const token = jwtService.createToken(user);
  res
    .status(201)
    .json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email và mật khẩu là bắt buộc." });
  }

  const user = dbService.users.find(
    (u) => u.email === email.toLowerCase() && u.password === password,
  );
  if (!user) {
    return res.status(401).json({ message: "Email hoặc mật khẩu không đúng." });
  }

  const token = jwtService.createToken(user);
  res.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token,
  });
};

const profile = (req, res) => {
  const user = dbService.users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: "Người dùng không tìm thấy." });
  }
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

module.exports = { register, login, profile };
