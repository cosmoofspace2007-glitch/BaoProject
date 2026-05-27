const dbService = require("../services/dbService");

const review = (req, res) => {
  const drafts = dbService.drafts.filter(
    (draft) => draft.status === "Pending Review",
  );
  res.json(drafts);
};

const publish = (req, res) => {
  const draftId = Number(req.params.id);
  const draft = dbService.drafts.find((item) => item.id === draftId);
  if (!draft) {
    return res.status(404).json({ message: "Nháp không tồn tại." });
  }
  if (draft.status !== "Pending Review") {
    return res.status(400).json({ message: "Nháp không thể xuất bản." });
  }

  const article = dbService.createArticle({
    title: draft.title,
    summary: draft.summary,
    body: draft.body,
    category: draft.category,
    heroImage: draft.heroImage || "",
    authorId: draft.authorId,
  });
  draft.status = "Published";
  draft.publishedAt = new Date().toISOString();
  res.json({ draft, article });
};

const reject = (req, res) => {
  const draftId = Number(req.params.id);
  const draft = dbService.drafts.find((item) => item.id === draftId);
  if (!draft) {
    return res.status(404).json({ message: "Nháp không tồn tại." });
  }
  draft.status = "Rejected";
  draft.reviewedAt = new Date().toISOString();
  res.json(draft);
};

const featured = (req, res) => {
  const articleId = Number(req.params.id);
  const article = dbService.articles.find((item) => item.id === articleId);
  if (!article) {
    return res.status(404).json({ message: "Bài viết không tồn tại." });
  }
  article.featured = !article.featured;
  res.json(article);
};

const comments = (req, res) => {
  const commentList = dbService.comments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  res.json(commentList);
};

module.exports = { review, publish, reject, featured, comments };
