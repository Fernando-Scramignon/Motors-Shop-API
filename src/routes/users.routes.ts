import { Router } from "express";
import deleteUserController from "../controllers/users/deleteUser.controller";
import readUserController from "../controllers/users/readUser.controller";
import idOwnerVerifierMiddleware from "../middlewares/idOwnerVerifier.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";

const usersRouter = Router();

usersRouter.get(
    "/:id",
    verifyTokenMiddleware,
    idOwnerVerifierMiddleware,
    readUserController
);

usersRouter.delete(
    "/:id",
    verifyTokenMiddleware,
    idOwnerVerifierMiddleware,
    deleteUserController
);

export default usersRouter;
