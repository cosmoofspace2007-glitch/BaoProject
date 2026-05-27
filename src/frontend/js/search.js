import { articleApi } from "./services/api.js";

const searchForm = document.querySelector("#search-form");
const resultRoot = document.querySelector("#search-results");

const renderResults = (articles) => {
  if (!resultRoot) return;
  if (!articles.length) {
    resultRoot.innerHTML = "<p>Không tìm thấy kết quả nào.</p>";
    return;
  }
  resultRoot.innerHTML = articles
    .map(
      (article) => `
    <article class="card">
      <div class="card-body">
        <h3 class="card-title">${article.title}</h3>
        <p class="card-text">${article.summary || article.body.slice(0, 120)}...</p>
      </div>
    </article>
  `,
    )
    .join("");
};

if (searchForm) {
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const q = searchForm.query.value.trim();
    try {
      const results = await articleApi.search(q);
      renderResults(results);
    } catch (error) {
      resultRoot.innerHTML = `<div class="alert">${error.message}</div>`;
    }
  });
}
