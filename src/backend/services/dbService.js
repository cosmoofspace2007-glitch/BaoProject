const users = [
  {
    id: 1,
    name: "Admin Hệ thống",
    email: "admin@vnexpress.local",
    password: "admin123",
    role: "admin",
    avatar: "https://via.placeholder.com/80x80.png?text=Admin",
  },
  {
    id: 2,
    name: "Phóng viên",
    email: "writer@vnexpress.local",
    password: "writer123",
    role: "writer",
    avatar: "https://via.placeholder.com/80x80.png?text=Writer",
  },
  {
    id: 3,
    name: "Biên tập viên",
    email: "editor@vnexpress.local",
    password: "editor123",
    role: "editor",
    avatar: "https://via.placeholder.com/80x80.png?text=Editor",
  },
];

const categories = [
  { slug: "thoi-su", name: "Thời sự" },
  { slug: "the-gioi", name: "Thế giới" },
  { slug: "kinh-doanh", name: "Kinh doanh" },
  { slug: "giai-tri", name: "Giải trí" },
  { slug: "the-thao", name: "Thể thao" },
];

const videos = [
  {
    id: 1,
    title: "Phóng sự nóng hổi hôm nay",
    description: "Video highlight các sự kiện thời sự nổi bật.",
    videoUrl: "https://www.example.com/video-1.mp4",
  },
  {
    id: 2,
    title: "Bản tin thể thao",
    description: "Tổng hợp các trận đấu và điểm nhấn thể thao hôm nay.",
    videoUrl: "https://www.example.com/video-2.mp4",
  },
];

const articles = [
  {
    id: 1,
    title: "Bản tin thời sự: Sự kiện nổi bật hôm nay",
    slug: "su-kien-noi-bat-hom-nay",
    summary: "Tóm tắt nhanh các sự kiện thời sự quan trọng trên khắp cả nước.",
    body: "Nội dung chi tiết bài viết mẫu được trình bày rõ ràng với đoạn văn, trích dẫn và số liệu.",
    category: "Thời sự",
    tags: ["thời sự", "chính trị", "kinh tế"],
    heroImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    authorId: 2,
    likes: 34,
    views: 620,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Đầu tư xanh: Cơ hội mới trên thị trường tài chính",
    slug: "dau-tu-xanh-co-hoi-moi",
    summary: "Các nhà đầu tư đang chuyển dịch sang các dự án xanh bền vững.",
    body: "Bài viết phân tích xu hướng đầu tư xanh và tác động của nó đến nền kinh tế.",
    category: "Kinh doanh",
    tags: ["đầu tư", "tài chính", "xanh"],
    heroImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    authorId: 2,
    likes: 18,
    views: 430,
    featured: false,
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
    likes: 5,
    createdAt: new Date().toISOString(),
  },
];

const bookmarks = [];
const notifications = [
  {
    id: 1,
    userId: 2,
    message: "Bài viết mới đã được đăng: Bản tin thời sự.",
    read: false,
    createdAt: new Date().toISOString(),
  },
];

const drafts = [
  {
    id: 1,
    title: "Nháp bài viết về kinh tế số",
    summary: "Nháp nội dung bài viết đang được hoàn thiện.",
    body: "Nội dung nháp...",
    category: "Kinh doanh",
    authorId: 2,
    status: "Draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let nextUserId = 4;
let nextArticleId = 3;
let nextCommentId = 2;
let nextNotificationId = 2;
let nextDraftId = 2;

const createUser = ({ name, email, password, role }) => {
  const user = {
    id: nextUserId++,
    name,
    email: email.toLowerCase(),
    password,
    role,
    avatar: "https://via.placeholder.com/80x80.png?text=User",
    isBanned: false,
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
    slug: title
      .toLowerCase()
      .replace(/đ/g, "d")
      .replace(
        /[áàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]/g,
        "",
      )
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
    summary: summary || "",
    body,
    category,
    tags: [],
    heroImage: heroImage || "",
    authorId,
    likes: 0,
    views: 0,
    featured: false,
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
    likes: 0,
    createdAt: new Date().toISOString(),
  };
  comments.push(comment);
  return comment;
};

const createBookmark = ({ userId, articleId }) => {
  const exists = bookmarks.find(
    (item) => item.userId === userId && item.articleId === articleId,
  );
  if (!exists) {
    const bookmark = { userId, articleId, createdAt: new Date().toISOString() };
    bookmarks.push(bookmark);
    return bookmark;
  }
  return exists;
};

const removeBookmark = ({ userId, articleId }) => {
  const index = bookmarks.findIndex(
    (item) => item.userId === userId && item.articleId === articleId,
  );
  if (index !== -1) bookmarks.splice(index, 1);
};

const createNotification = ({ userId, message }) => {
  const notification = {
    id: nextNotificationId++,
    userId,
    message,
    read: false,
    createdAt: new Date().toISOString(),
  };
  notifications.push(notification);
  return notification;
};

const createDraft = ({
  title,
  summary,
  body,
  category,
  authorId,
  status = "Draft",
}) => {
  const draft = {
    id: nextDraftId++,
    title,
    summary: summary || "",
    body,
    category,
    authorId,
    status,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  drafts.push(draft);
  return draft;
};

module.exports = {
  users,
  articles,
  comments,
  categories,
  videos,
  bookmarks,
  notifications,
  drafts,
  createUser,
  createArticle,
  createComment,
  createBookmark,
  removeBookmark,
  createNotification,
  createDraft,
};
