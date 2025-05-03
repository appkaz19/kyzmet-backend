const notificationService = require("./notifications.service");

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getUserNotifications(req.user.id);
    res.json(notifications);
  } catch (error) {
    console.error("🔥 Get notifications error:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    await notificationService.markAsRead(req.params.id);
    res.json({ message: "Marked as read" });
  } catch (error) {
    console.error("🔥 Mark as read error:", error);
    res.status(500).json({ error: "Failed to mark as read" });
  }
};
