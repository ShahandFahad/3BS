const router = require("express").Router();
const Notification = require("../../models/Notification/Notification");

// Add a notification
router.post("/", async (req, res) => {
  const newNotification = new Notification(req.body);
  try {
    const savedNotification = await newNotification.save();
    res.status(200).json(savedNotification);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get all notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
// get all notifications of specific user
router.get("/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
// get unread notifications of specific user
router.get("/unread/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId,
      status: "unread",
    });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
// get single notification of specific user
router.get("/notification/:notificationId", async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// edit single notification of specific user
router.put("/notification/:notificationId", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.notificationId,
      {
        $set: {
          status: "read",
        },
      },
      { new: true }
    );
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
