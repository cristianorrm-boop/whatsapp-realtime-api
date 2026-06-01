require("dotenv").config();

const express = require("express");

const redisClient = require("./config/redis");
const connectDatabase = require("./config/database");

const contactRoutes = require("./routes/contactRoutes");

const errorHandler = require("./middlewares/errorHandler");

const logger = require("./utils/logger");

const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger");


const app = express();

app.use(express.json());

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(contactRoutes);

app.use(errorHandler);


redisClient.on("error", (err) => {
  logger(`Erro no Redis: ${err.message}`);
});

async function startServer() {
  await redisClient.connect();

  logger("Conectado ao Redis 🚀");

  await connectDatabase();

  app.listen(process.env.API_PORT, () => {
    logger(`Servidor rodando na porta ${process.env.API_PORT} 🚀`);
  });

}

startServer();


//http://localhost:3000/docs/

//docker compose up --build