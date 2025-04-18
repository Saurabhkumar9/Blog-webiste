const express = require("express");
const cors = require("cors");
const dbConnection = require("./db/db");
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv");
const categoryRouter = require("./routes/categoryRoutes");
const blogRouter = require("./routes/blogRoutes");
const commmentRouter = require("./routes/commentRouter");
const likeRouter = require("./routes/likeRouter");
const followRouter = require("./routes/followRoute");
const reviewRouter = require("./routes/reviewRouter");
const { getAllReviews } = require("./controllers/reviewController");

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

dbConnection();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/user", userRouter);

app.use('/api/user', categoryRouter)

app.use('/api/user', blogRouter)

app.use('/api/user',commmentRouter)

app.use('/api/user',likeRouter)


app.use('/api/user', followRouter)
app.use('/api/user', reviewRouter)

app.get("/" ,getAllReviews)

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
