const EventEmitter = require("events");

const notificationEmitter = new EventEmitter();

setInterval(() => {
  const event = {
    message: "Thông báo mới từ hệ thống",
    time: new Date().toISOString(),
  };
  notificationEmitter.emit("notification", event);
}, 15000);

const streamUpdates = (req, res) => {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
  });

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  const onNotification = (data) => sendEvent(data);
  notificationEmitter.on("notification", onNotification);

  req.on("close", () => {
    notificationEmitter.removeListener("notification", onNotification);
  });
};

module.exports = { streamUpdates };
