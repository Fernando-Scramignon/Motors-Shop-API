import { Express } from "express";
import productsRouter from "./products.routes";
import usersRouter from "./users.routes";

function appRoutes(app: Express) {
    app.use("/products", productsRouter);
    app.use("/users", usersRouter);
}

export default appRoutes;
