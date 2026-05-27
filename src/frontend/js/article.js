import { articleApi } from "./services/api.js";

const renderArticleList = async () => {
  const listRoot = document.querySelector("#article-list");
  if (!listRoot) return;

  try {
    const articles = await articleApi.list();
    listRoot.innerHTML = articles
      .map(
        (article) => `
      <article class="card">
        <div class="card-body">
          <h3 class="card-title">${article.title}</h3>
          <p class="card-text">${article.summary || article.body.slice(0, 120)}...</p>
          <p class="card-text"><strong>Chuyên mục:</strong> ${article.category}</p>
        </div>
      </article>
    `,
      )
      .join("\n");
  } catch (error) {
    listRoot.innerHTML = `<div class="alert">${error.message}</div>`;
  }
};

const createArticleForm = document.querySelector("#create-article-form");
if (createArticleForm) {
  const feedback = document.querySelector("#article-feedback");
  createArticleForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.textContent = "";
    try {
      const title = createArticleForm.title.value.trim();
      const summary = createArticleForm.summary.value.trim();
      const body = createArticleForm.body.value.trim();
      const category = createArticleForm.category.value;
      const heroImage = createArticleForm.heroImage.value.trim();
      await articleApi.create({ title, summary, body, category, heroImage });
      feedback.textContent = "Bài viết đã được tạo thành công.";
      feedback.classList.add("alert");
      createArticleForm.reset();
      if (document.querySelector("#article-list")) renderArticleList();
    } catch (error) {
      feedback.textContent = error.message;
      feedback.classList.add("alert");
    }
  });
}

if (document.querySelector("#article-list")) {
  renderArticleList();
}
