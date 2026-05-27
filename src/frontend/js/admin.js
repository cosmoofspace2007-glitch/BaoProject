import { adminApi } from "./services/api.js";

const analyticsRoot = document.querySelector("#analytics-data");
const usersRoot = document.querySelector("#users-list");
const backupButton = document.querySelector("#backup-button");
const messageRoot = document.querySelector("#admin-message");

const showMessage = (text) => {
  if (!messageRoot) return;
  messageRoot.textContent = text;
  messageRoot.classList.add("alert");
};

const loadAnalytics = async () => {
  if (!analyticsRoot) return;
  try {
    const analytics = await adminApi.analytics();
    analyticsRoot.innerHTML = `
      <p>Tổng bài viết: <strong>${analytics.totalArticles}</strong></p>
      <p>Tổng bình luận: <strong>${analytics.totalComments}</strong></p>
      <p>Tổng người dùng: <strong>${analytics.totalUsers}</strong></p>
      <p>Người viết/biên tập: <strong>${analytics.activeWriters}</strong></p>
      <p>Thời điểm: ${new Date(analytics.timestamp).toLocaleString()}</p>
    `;
  } catch (error) {
    showMessage(error.message);
  }
};

const loadUsers = async () => {
  if (!usersRoot) return;
  try {
    const users = await adminApi.users();
    usersRoot.innerHTML = users
      .map(
        (user) =>
          `<li class="related-item"><strong>${user.name}</strong> — ${user.email} — ${user.role}</li>`,
      )
      .join("");
  } catch (error) {
    showMessage(error.message);
  }
};

if (backupButton) {
  backupButton.addEventListener("click", async () => {
    try {
      const response = await adminApi.backup();
      showMessage(response.message);
    } catch (error) {
      showMessage(error.message);
    }
  });
}

if (analyticsRoot) loadAnalytics();
if (usersRoot) loadUsers();
