import { Express } from "express";
import commentsRouter from "./comments.routes";

import productsRouter from "./products.routes";
import usersRouter from "./users.routes";

function appRoutes(app: Express) {
    app.use("/products", productsRouter);
    app.use("/users", usersRouter);
    app.use("/comments", commentsRouter)
}

export default appRoutes;
