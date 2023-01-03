import { Router } from "express";

import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";

import idOwnerVerifierMiddleware from "../middlewares/idOwnerVerifier.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import yupValidateMiddleware from "../middlewares/yupValidate.middleware";

import usersSchema from "../schemas/users/users.schema";

const usersRouter: Router = Router();

usersRouter.post("", yupValidateMiddleware(usersSchema), createUserController);
usersRouter.delete(
    "/:id",
    verifyTokenMiddleware,
    idOwnerVerifierMiddleware,
    deleteUserController
);

export default usersRouter;
