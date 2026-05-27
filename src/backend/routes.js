const express = require("express");
const authController = require("./controllers/authController");
const articleController = require("./controllers/articleController");
const commentController = require("./controllers/commentController");
const userController = require("./controllers/userController");
const homepageController = require("./controllers/homepageController");
const categoryController = require("./controllers/categoryController");
const videoController = require("./controllers/videoController");
const bookmarkController = require("./controllers/bookmarkController");
const notificationController = require("./controllers/notificationController");
const profileController = require("./controllers/profileController");
const writerController = require("./controllers/writerController");
const editorController = require("./controllers/editorController");
const adminController = require("./controllers/adminController");
const jwtService = require("./services/jwtService");
const notificationService = require("./services/notificationService");

const router = express.Router();

router.get("/homepage", homepageController.homepage);
router.get("/articles", articleController.list);
router.get("/articles/trending", articleController.trending);
router.get("/articles/featured", articleController.featured);
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

router.get("/categories", categoryController.list);
router.get("/categories/:slug", categoryController.getBySlug);
router.get("/search", articleController.search);
router.get("/videos", videoController.list);

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/profile", jwtService.authenticate, authController.profile);

router.post("/comments", jwtService.authenticate, commentController.create);
router.post(
  "/comments/:id/reply",
  jwtService.authenticate,
  commentController.reply,
);
router.post(
  "/comments/:id/like",
  jwtService.authenticate,
  commentController.like,
);

router.get("/bookmarks", jwtService.authenticate, bookmarkController.list);
router.post("/bookmarks", jwtService.authenticate, bookmarkController.add);
router.delete(
  "/bookmarks/:articleId",
  jwtService.authenticate,
  bookmarkController.remove,
);

router.get(
  "/notifications",
  jwtService.authenticate,
  notificationController.list,
);
router.get(
  "/notifications/stream",
  jwtService.authenticate,
  notificationService.streamUpdates,
);

router.put("/profile", jwtService.authenticate, profileController.update);

router.get(
  "/writer/drafts",
  jwtService.authenticate,
  jwtService.authorize(["writer"]),
  writerController.drafts,
);
router.get(
  "/writer/articles",
  jwtService.authenticate,
  jwtService.authorize(["writer"]),
  writerController.myArticles,
);
router.post(
  "/writer/submit",
  jwtService.authenticate,
  jwtService.authorize(["writer"]),
  writerController.submit,
);

router.get(
  "/editor/review",
  jwtService.authenticate,
  jwtService.authorize(["editor"]),
  editorController.review,
);
router.put(
  "/editor/publish/:id",
  jwtService.authenticate,
  jwtService.authorize(["editor"]),
  editorController.publish,
);
router.put(
  "/editor/reject/:id",
  jwtService.authenticate,
  jwtService.authorize(["editor"]),
  editorController.reject,
);
router.put(
  "/editor/featured/:id",
  jwtService.authenticate,
  jwtService.authorize(["editor"]),
  editorController.featured,
);
router.get(
  "/editor/comments",
  jwtService.authenticate,
  jwtService.authorize(["editor"]),
  editorController.comments,
);

router.get(
  "/users",
  jwtService.authenticate,
  jwtService.authorize(["admin"]),
  adminController.users,
);
router.put(
  "/users/:id/ban",
  jwtService.authenticate,
  jwtService.authorize(["admin"]),
  adminController.banUser,
);
router.get(
  "/analytics",
  jwtService.authenticate,
  jwtService.authorize(["admin"]),
  adminController.analytics,
);
router.post(
  "/backup",
  jwtService.authenticate,
  jwtService.authorize(["admin"]),
  adminController.backup,
);

module.exports = router;
