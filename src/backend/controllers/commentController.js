const dbService = require("../services/dbService");

const list = (req, res) => {
  res.json(dbService.comments);
};

const create = (req, res) => {
  const { articleId, content } = req.body;
  if (!articleId || !content) {
    return res
      .status(400)
      .json({ message: "articleId và nội dung bình luận bắt buộc." });
  }
  const article = dbService.articles.find((a) => a.id === Number(articleId));
  if (!article)
    return res.status(404).json({ message: "Bài viết không tồn tại." });
  const comment = dbService.createComment({
    articleId: Number(articleId),
    authorId: req.user.id,
    content,
  });
  res.status(201).json(comment);
};

const reply = (req, res) => {
  const parentId = Number(req.params.id);
  const { content } = req.body;
  const parentComment = dbService.comments.find((c) => c.id === parentId);
  if (!parentComment)
    return res.status(404).json({ message: "Bình luận gốc không tìm thấy." });
  if (!content)
    return res.status(400).json({ message: "Nội dung trả lời là bắt buộc." });

  const reply = dbService.createComment({
    articleId: parentComment.articleId,
    authorId: req.user.id,
    content,
    parentId,
  });
  res.status(201).json(reply);
};

const like = (req, res) => {
  const commentId = Number(req.params.id);
  const comment = dbService.comments.find((c) => c.id === commentId);
  if (!comment) {
    return res.status(404).json({ message: "Bình luận không tồn tại." });
  }
  comment.likes = (comment.likes || 0) + 1;
  res.json(comment);
};

module.exports = { list, create, reply, like };
