// Mô hình dữ liệu bình luận
module.exports = {
  id: "number",
  articleId: "number",
  authorId: "number",
  content: "string",
  parentId: "number|null",
  createdAt: "string",
};
