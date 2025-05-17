import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import statisticsRoutes from "./routes/statisticsRoutes.js";

dotenv.config();

const app = express();

// 允许特定源，并设置 Access-Control-Allow-Credentials
const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        const msg =
          "这个网站的跨域资源共享 (CORS) 策略不允许从指定的来源进行访问。";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // 允许发送 Cookies
  })
);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/statistics", statisticsRoutes);

export default app;
