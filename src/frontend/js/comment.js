import { commentApi } from "./services/api.js";

const replyButtons = document.querySelectorAll(".reply-button");
replyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const replyBox = document.querySelector(
      `#reply-box-${button.dataset.comment}`,
    );
    if (replyBox) replyBox.classList.toggle("hidden");
  });
});

const commentForm = document.querySelector("#comment-form");
if (commentForm) {
  const feedback = document.querySelector("#comment-feedback");
  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.textContent = "";
    try {
      const articleId = Number(commentForm.articleId.value);
      const content = commentForm.content.value.trim();
      await commentApi.create({ articleId, content });
      feedback.textContent = "Bình luận đã được gửi.";
      feedback.classList.add("alert");
      commentForm.reset();
    } catch (error) {
      feedback.textContent = error.message;
      feedback.classList.add("alert");
    }
  });
}

const replyForms = document.querySelectorAll(".reply-form");
replyForms.forEach((form) => {
  const feedback = form.querySelector(".reply-feedback");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.textContent = "";
    try {
      const commentId = form.dataset.comment;
      const content = form.querySelector("textarea").value.trim();
      await commentApi.reply(commentId, { content });
      feedback.textContent = "Trả lời đã gửi.";
      feedback.classList.add("alert");
      form.reset();
    } catch (error) {
      feedback.textContent = error.message;
      feedback.classList.add("alert");
    }
  });
});
