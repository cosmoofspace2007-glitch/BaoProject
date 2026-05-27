const dbService = require("../services/dbService");

const list = (req, res) => {
  res.json(dbService.articles);
};

const getById = (req, res) => {
  const article = dbService.articles.find(
    (a) => a.id === Number(req.params.id),
  );
  if (!article)
    return res.status(404).json({ message: "Bài viết không tồn tại." });
  res.json(article);
};

const create = (req, res) => {
  const { title, summary, body, category, heroImage } = req.body;
  if (!title || !body || !category) {
    return res
      .status(400)
      .json({ message: "Tiêu đề, thể loại và nội dung là bắt buộc." });
  }
  const article = dbService.createArticle({
    title,
    summary,
    body,
    category,
    heroImage,
    authorId: req.user.id,
  });
  res.status(201).json(article);
};

const update = (req, res) => {
  const article = dbService.articles.find(
    (a) => a.id === Number(req.params.id),
  );
  if (!article)
    return res.status(404).json({ message: "Bài viết không tồn tại." });
  const { title, summary, body, category, heroImage } = req.body;
  article.title = title || article.title;
  article.summary = summary || article.summary;
  article.body = body || article.body;
  article.category = category || article.category;
  article.heroImage = heroImage || article.heroImage;
  article.updatedAt = new Date().toISOString();
  res.json(article);
};

const remove = (req, res) => {
  const articleIndex = dbService.articles.findIndex(
    (a) => a.id === Number(req.params.id),
  );
  if (articleIndex === -1)
    return res.status(404).json({ message: "Bài viết không tồn tại." });
  dbService.articles.splice(articleIndex, 1);
  res.json({ message: "Bài viết đã được xóa." });
};

const search = (req, res) => {
  const q = String(req.query.q || "")
    .trim()
    .toLowerCase();
  if (!q) return res.json(dbService.articles);
  const results = dbService.articles.filter((article) => {
    return (
      article.title.toLowerCase().includes(q) ||
      article.summary.toLowerCase().includes(q) ||
      article.body.toLowerCase().includes(q)
    );
  });
  res.json(results);
};

module.exports = { list, getById, create, update, remove, search };
