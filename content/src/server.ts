import express from 'express';
import cors from 'cors';
import swaggerSpec from './config/swagger.config.js';
import swaggerUi from 'swagger-ui-express';
import newsRoute from "./routes/news.routes.js"
import usersRoute from "./routes/users.routes.js"
import authRoute from "./routes/auth.route.js"
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import cookieParser from "cookie-parser";
import contactRoute from './routes/contact.route.js';
import doubleAuthRoute from './routes/2fa.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  // Autorise l'image à être chargée par un autre domaine (Next.js)
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/news", newsRoute);
app.use("/api/users", usersRoute);
app.use("/api/login", authRoute);
app.use("/api/auth", authRoute);
app.use("/api/contact", contactRoute);
app.use("/api/2fa", doubleAuthRoute);

app.listen(PORT, () => {
  console.log(`[server]: Server running on http://localhost:${PORT}`);
  console.log(`[swagger] : Swagger docs available at http://localhost:${PORT}/api-docs`);
});