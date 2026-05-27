const API_BASE_URL = "http://localhost:4000/api";

const getToken = () => localStorage.getItem("bao_token");
const setToken = (token) => localStorage.setItem("bao_token", token);
const clearToken = () => localStorage.removeItem("bao_token");

const request = async (path, { method = "GET", body, auth = false } = {}) => {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Yêu cầu thất bại.");
  }
  return response.json();
};

const authApi = {
  login: (credentials) =>
    request("/auth/login", { method: "POST", body: credentials }),
  register: (credentials) =>
    request("/auth/register", { method: "POST", body: credentials }),
  profile: () => request("/auth/profile", { auth: true }),
};

const articleApi = {
  list: () => request("/articles"),
  getById: (id) => request(`/articles/${id}`),
  create: (payload) =>
    request("/articles", { method: "POST", body: payload, auth: true }),
  update: (id, payload) =>
    request(`/articles/${id}`, { method: "PUT", body: payload, auth: true }),
  remove: (id) => request(`/articles/${id}`, { method: "DELETE", auth: true }),
  search: (q) => request(`/search?q=${encodeURIComponent(q)}`),
  trending: () => request("/articles/trending"),
  featured: () => request("/articles/featured"),
};

const categoryApi = {
  list: () => request("/categories"),
  getBySlug: (slug) => request(`/categories/${slug}`),
};

const videoApi = {
  list: () => request("/videos"),
};

const commentApi = {
  list: () => request("/comments"),
  create: (payload) =>
    request("/comments", { method: "POST", body: payload, auth: true }),
  reply: (id, payload) =>
    request(`/comments/${id}/reply`, {
      method: "POST",
      body: payload,
      auth: true,
    }),
  like: (id) => request(`/comments/${id}/like`, { method: "POST", auth: true }),
};

const bookmarkApi = {
  list: () => request("/bookmarks", { auth: true }),
  add: (articleId) =>
    request("/bookmarks", { method: "POST", body: { articleId }, auth: true }),
  remove: (articleId) =>
    request(`/bookmarks/${articleId}`, { method: "DELETE", auth: true }),
};

const profileApi = {
  update: (payload) =>
    request("/profile", { method: "PUT", body: payload, auth: true }),
};

const notificationApi = {
  list: () => request("/notifications", { auth: true }),
};

const writerApi = {
  drafts: () => request("/writer/drafts", { auth: true }),
  submit: (payload) =>
    request("/writer/submit", { method: "POST", body: payload, auth: true }),
  myArticles: () => request("/writer/articles", { auth: true }),
};

const editorApi = {
  review: () => request("/editor/review", { auth: true }),
  publish: (id) =>
    request(`/editor/publish/${id}`, { method: "PUT", auth: true }),
  reject: (id) =>
    request(`/editor/reject/${id}`, { method: "PUT", auth: true }),
  featured: (id) =>
    request(`/editor/featured/${id}`, { method: "PUT", auth: true }),
  comments: () => request("/editor/comments", { auth: true }),
};

const adminApi = {
  users: () => request("/users", { auth: true }),
  analytics: () => request("/analytics", { auth: true }),
  backup: () => request("/backup", { method: "POST", auth: true }),
  banUser: (id) => request(`/users/${id}/ban`, { method: "PUT", auth: true }),
};

export {
  getToken,
  setToken,
  clearToken,
  authApi,
  articleApi,
  categoryApi,
  videoApi,
  commentApi,
  bookmarkApi,
  profileApi,
  notificationApi,
  writerApi,
  editorApi,
  adminApi,
};
