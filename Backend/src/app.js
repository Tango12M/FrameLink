import cookieParser from "cookie-parser";
// import { fileURLToPath } from "url";
import express from "express";
import morgan from "morgan";
import cors from "cors";
// import path from "path";

// Routes
import authRouter from "./routes/auth.routes.js";

// Middlewares 
import config from "./config/config.js";

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

// app.use("/{*path}", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "public", "index.html"));
// });

export default app;
