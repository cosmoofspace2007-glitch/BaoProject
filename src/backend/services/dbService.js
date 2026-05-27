const users = [
  {
    id: 1,
    name: "Admin Hệ thống",
    email: "admin@vnexpress.local",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    name: "Phóng viên",
    email: "writer@vnexpress.local",
    password: "writer123",
    role: "writer",
  },
  {
    id: 3,
    name: "Biên tập viên",
    email: "editor@vnexpress.local",
    password: "editor123",
    role: "editor",
  },
];

const articles = [
  {
    id: 1,
    title: "Bản tin thời sự: Sự kiện nổi bật hôm nay",
    summary: "Tóm tắt nhanh các sự kiện thời sự quan trọng trên khắp cả nước.",
    body: "Nội dung chi tiết bài viết mẫu được trình bày rõ ràng với đoạn văn, trích dẫn và số liệu.",
    category: "Thời sự",
    heroImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    authorId: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const comments = [
  {
    id: 1,
    articleId: 1,
    authorId: 3,
    content: "Bài viết rất hữu ích, cảm ơn tác giả!",
    parentId: null,
    createdAt: new Date().toISOString(),
  },
];

let nextUserId = 4;
let nextArticleId = 2;
let nextCommentId = 2;

const createUser = ({ name, email, password, role }) => {
  const user = {
    id: nextUserId++,
    name,
    email: email.toLowerCase(),
    password,
    role,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
};

const createArticle = ({
  title,
  summary,
  body,
  category,
  heroImage,
  authorId,
}) => {
  const article = {
    id: nextArticleId++,
    title,
    summary: summary || "",
    body,
    category,
    heroImage: heroImage || "",
    authorId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  articles.push(article);
  return article;
};

const createComment = ({ articleId, authorId, content, parentId = null }) => {
  const comment = {
    id: nextCommentId++,
    articleId,
    authorId,
    content,
    parentId,
    createdAt: new Date().toISOString(),
  };
  comments.push(comment);
  return comment;
};

module.exports = {
  users,
  articles,
  comments,
  createUser,
  createArticle,
  createComment,
};
