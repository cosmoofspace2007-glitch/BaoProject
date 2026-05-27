const dbService = require("../services/dbService");

const list = (req, res) => {
  const items = dbService.bookmarks
    .filter((bookmark) => bookmark.userId === req.user.id)
    .map((bookmark) => {
      const article = dbService.articles.find(
        (a) => a.id === bookmark.articleId,
      );
      return { ...bookmark, article };
    });
  res.json(items);
};

const add = (req, res) => {
  const { articleId } = req.body;
  if (!articleId) {
    return res.status(400).json({ message: "articleId là bắt buộc." });
  }
  const article = dbService.articles.find((a) => a.id === Number(articleId));
  if (!article) {
    return res.status(404).json({ message: "Bài viết không tồn tại." });
  }
  const bookmark = dbService.createBookmark({
    userId: req.user.id,
    articleId: Number(articleId),
  });
  res.status(201).json(bookmark);
};

const remove = (req, res) => {
  const articleId = Number(req.params.articleId);
  dbService.removeBookmark({ userId: req.user.id, articleId });
  res.json({ message: "Đã xoá bookmark." });
};

module.exports = { list, add, remove };
