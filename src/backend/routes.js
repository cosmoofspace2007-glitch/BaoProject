const express = require("express");
const authController = require("./controllers/authController");
const articleController = require("./controllers/articleController");
const commentController = require("./controllers/commentController");
const userController = require("./controllers/userController");
const jwtService = require("./services/jwtService");
const notificationService = require("./services/notificationService");

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/profile", jwtService.authenticate, authController.profile);

router.get("/articles", articleController.list);
router.get("/articles/:id", articleController.getById);
router.post(
  "/articles",
  jwtService.authenticate,
  jwtService.authorize(["writer", "editor", "admin"]),
  articleController.create,
);
router.put(
  "/articles/:id",
  jwtService.authenticate,
  jwtService.authorize(["editor", "admin"]),
  articleController.update,
);
router.delete(
  "/articles/:id",
  jwtService.authenticate,
  jwtService.authorize(["admin"]),
  articleController.remove,
);

router.get("/comments", commentController.list);
router.post("/comments", jwtService.authenticate, commentController.create);
router.post(
  "/comments/:id/reply",
  jwtService.authenticate,
  commentController.reply,
);

router.get(
  "/users",
  jwtService.authenticate,
  jwtService.authorize(["admin"]),
  userController.list,
);
router.get("/search", articleController.search);

router.get(
  "/notifications/stream",
  jwtService.authenticate,
  notificationService.streamUpdates,
);
router.get(
  "/analytics",
  jwtService.authenticate,
  jwtService.authorize(["admin"]),
  userController.analytics,
);
router.post(
  "/backup",
  jwtService.authenticate,
  jwtService.authorize(["admin"]),
  userController.backup,
);

module.exports = router;
