const dbService = require("../services/dbService");

const drafts = (req, res) => {
  const userDrafts = dbService.drafts.filter(
    (draft) => draft.authorId === req.user.id,
  );
  res.json(userDrafts);
};

const myArticles = (req, res) => {
  const articles = dbService.articles.filter(
    (article) => article.authorId === req.user.id,
  );
  res.json(articles);
};

const submit = (req, res) => {
  const { title, summary, body, category } = req.body;
  if (!title || !body || !category) {
    return res.status(400).json({
      message: "Tiêu đề, thể loại và nội dung là bắt buộc để gửi bài.",
    });
  }
  const draft = dbService.createDraft({
    title,
    summary,
    body,
    category,
    authorId: req.user.id,
    status: "Pending Review",
  });
  res.status(201).json(draft);
};

module.exports = { drafts, myArticles, submit };
