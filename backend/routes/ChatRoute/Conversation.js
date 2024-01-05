const router = require("express").Router();
const Conversation = require("../../models/Chat/Conversation");
const { verifyToken } = require("../UserRoute/verifyToken");

// Create new Conversation
router.post("/", verifyToken, async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.recieverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all the conversations from the database
router.get("/", verifyToken, async (req, res) => {
  try {
    const conversation = await Conversation.find();
    res.status(200).json(conversation);
  } catch (err) {
    console.log(err.message);
  }
});

// Get a conversation of a specific user with the help of id
router.get("/find/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    console.log(err.message);
  }
});
// Get a conversation of a user
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
