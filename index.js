const express = require("express");
const app = express();
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const path = require("path");
const pool = require("./database/index");

// Middleware
const cors = require("cors");
const bodyParser = require("body-parser");
// app.use(express.json());
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
// Routers
const postsRouter = require("./routes/posts.router");
const authRouter = require("./routes/auth.router");
const infoRouter = require("./routes/info.router");
const skillRouter = require("./routes/skill.router");
const contactRouter = require("./routes/contact.router");
const educationRouter = require("./routes/education.router");
const introRouter = require("./routes/intro.router");

// Custom Middleware
const { verifyToken } = require("./middlewares/auth");
const introController = require("./controller/intro.controller");

// Enable CORS
app.use(cors());

// socket io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  console.log("A user connected");
  socket.on("requestDataCheck", async () => {
    try {
      const selectQuery = "SELECT * from contact WHERE type = 0";
      const [row] = await pool.query(selectQuery);
      const numberOfElements = row.length;
      if (numberOfElements) {
        socket.broadcast.emit("newNumber", { numberOfElements });
      } else if (numberOfElements === 0)
        socket.broadcast.emit("newNumber", "0");
    } catch (error) {
      console.log("có lỗi", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// API Endpoints
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/info", infoRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/education", educationRouter);
app.use("/api/v1/intro", introRouter);

app.get("/api/v1/private", verifyToken, (req, res) => {
  console.log("User:::", req.user);
  return res.json({
    data: [1, 2, 3],
  });
});

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));
server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
