import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import appRoutes from "./routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

appRoutes(app);

app.use(handleErrorMiddleware);

export default app;
