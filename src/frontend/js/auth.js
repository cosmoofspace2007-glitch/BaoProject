import { authApi, setToken } from "./services/api.js";

const showMessage = (message, target) => {
  target.textContent = message;
  target.classList.add("alert");
};

const loginForm = document.querySelector("#login-form");
if (loginForm) {
  const feedback = document.querySelector("#login-feedback");
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.textContent = "";
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();
    try {
      const data = await authApi.login({ email, password });
      setToken(data.token);
      window.location.href = "../home/home.html";
    } catch (error) {
      showMessage(error.message, feedback);
    }
  });
}

const registerForm = document.querySelector("#register-form");
if (registerForm) {
  const feedback = document.querySelector("#register-feedback");
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.textContent = "";
    const name = registerForm.name.value.trim();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value.trim();
    try {
      const data = await authApi.register({ name, email, password });
      setToken(data.token);
      window.location.href = "../home/home.html";
    } catch (error) {
      showMessage(error.message, feedback);
    }
  });
}
