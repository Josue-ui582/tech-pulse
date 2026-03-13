import express from 'express';
import cors from 'cors';
import swaggerSpec from './config/swagger.config.js';
import swaggerUi from 'swagger-ui-express';
import newsRoute from '../src/routes/news.routes.js'

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/news", newsRoute);

app.listen(PORT, () => {
  console.log(`[server]: Server running on http://localhost:${PORT}`);
  console.log(`[swagger] : Swagger docs available at http://localhost:${PORT}/api-docs`);
});
