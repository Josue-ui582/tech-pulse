import express from 'express';
import cors from 'cors';
import swaggerSpec from './config/swagger.config.js';
import swaggerUi from 'swagger-ui-express';
import newsRoute from "../src/routes/news.routes.js"
import usersRoute from "../src/routes/users.routes.js"
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { loginUserController } from './controllers/users.controllers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/news", newsRoute);
app.use("/api/users", usersRoute);
app.use("/api/auth", loginUserController);

app.listen(PORT, () => {
  console.log(`[server]: Server running on http://localhost:${PORT}`);
  console.log(`[swagger] : Swagger docs available at http://localhost:${PORT}/api-docs`);
});
