const jwt = require("jsonwebtoken");
const dbService = require("./dbService");

const secret = process.env.JWT_SECRET || "vnexpress-demo-secret";
const expiresIn = "6h";

const createToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, {
    expiresIn,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  let token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    token = req.query.token || "";
  }
  if (!token) {
    return res.status(401).json({ message: "Token không hợp lệ." });
  }
  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    res.status(401).json({ message: "Xác thực không thành công." });
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền thực hiện hành động này." });
    }
    next();
  };
};

module.exports = { createToken, verifyToken, authenticate, authorize };
