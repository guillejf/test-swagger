import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Express API with Swagger",
      description:
        "A simple CRUD API application made with Express and documented with Swagger",
    },
  },
  apis: ["./src/docs/**/*.yaml"],
};
const specs = swaggerJsdoc(options);

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(`mongodb://127.0.0.1:27017/ecommerce`);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
