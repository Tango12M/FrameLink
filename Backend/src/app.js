import cookieParser from "cookie-parser";
import config from "./config/config.js";
// import { fileURLToPath } from "url";
import express from "express";
import morgan from "morgan";
import cors from "cors";
// import path from "path";

// Routes
import authRouter from "./routes/auth.routes.js";
import projectRouter from "./routes/project.routes.js";
import sceneRouter from "./routes/scene.routes.js";
import commentRouter from "./routes/comment.routes.js";
import taskRouter from "./routes/task.routes.js";
import inviteRouter from "./routes/invite.routes.js";
import { authUser } from "./middlewares/auth.middleware.js";

// Middlewares

const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "..", "public")));
app.use(cookieParser());
app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/project", authUser, projectRouter);
app.use("/api/scene", authUser, sceneRouter);
app.use("/api/comment", authUser, commentRouter);
app.use("/api/task", authUser, taskRouter);
app.use("/api/invite", authUser, inviteRouter);

app.use("/api/test", (req, res) => {
  res.status(200).send("Hello");
});

// app.use("/{*path}", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "public", "index.html"));
// });

export default app;
