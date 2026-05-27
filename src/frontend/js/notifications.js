const token = localStorage.getItem("bao_token");
const eventSourceUrl = token
  ? `http://localhost:4000/api/notifications/stream?token=${encodeURIComponent(token)}`
  : "http://localhost:4000/api/notifications/stream";
const eventSource = new EventSource(eventSourceUrl);
const notificationRoot = document.querySelector("#notification-list");

if (notificationRoot) {
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const item = document.createElement("li");
    item.className = "notification-item";
    item.textContent = `${data.message} — ${new Date(data.time).toLocaleTimeString()}`;
    notificationRoot.prepend(item);
  };
  eventSource.onerror = () => {
    const errorItem = document.createElement("li");
    errorItem.className = "notification-item";
    errorItem.textContent =
      "Kết nối thông báo bị gián đoạn. Vui lòng tải lại trang.";
    notificationRoot.prepend(errorItem);
    eventSource.close();
  };
}
