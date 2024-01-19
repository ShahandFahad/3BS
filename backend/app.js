const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDatabase = require("./connection");

// Import all routers
const authRouter = require("./routes/UserRoute/user");
const sellProductRouter = require("./routes/SellProductRoute/SellProduct");
const exchangeProductRouter = require("./routes/ExchangeProductRoute/ExchangeProduct");
const conversationRouter = require("./routes/ChatRoute/Conversation");
const messageRouter = require("./routes/ChatRoute/Message");
const profileRouter = require("./routes/ProfileViewsRoute/ProfileViews");
const productViewsRouter = require("./routes/ProductViewsRoute/ProductViews");
const transactionRouter = require("./routes/TransactionRoute/Transaction");
const orderRouter = require("./routes/OrderRoute/Order");
const NotificationRouter = require("./routes/Notification/Notification");
const FeedbackRouter = require("./routes/Feedback/Feedback");

// dotEnv Configuration
dotenv.config();

// JSON Configuration
app.use(express.json());

// Cors Configuration
app.use(cors());

// Mongoose Connection
connectToDatabase();

// API's routes
app.use("/3bs/api/user", authRouter);
app.use("/3bs/api/product", sellProductRouter);
app.use("/3bs/api/exchangeproduct", exchangeProductRouter);
app.use("/3bs/api/conversation", conversationRouter);
app.use("/3bs/api/message", messageRouter);
app.use("/3bs/api/profileviews", profileRouter);
app.use("/3bs/api/productviews", productViewsRouter);
app.use("/3bs/api/transaction", transactionRouter);
app.use("/3bs/api/order", orderRouter);
app.use("/3bs/api/notifications", NotificationRouter);
app.use("/3bs/api/feedback", FeedbackRouter);

// Listening to a server
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
