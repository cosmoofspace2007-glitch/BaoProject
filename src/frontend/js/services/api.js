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
};

const adminApi = {
  users: () => request("/users", { auth: true }),
  analytics: () => request("/analytics", { auth: true }),
  backup: () => request("/backup", { method: "POST", auth: true }),
};

export {
  getToken,
  setToken,
  clearToken,
  authApi,
  articleApi,
  commentApi,
  adminApi,
};
