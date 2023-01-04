import { Router } from "express";

import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import readUserController from "../controllers/users/readUser.controller";
import readUserProfileController from "../controllers/users/readUserProfile.controller";
import updateUserController from "../controllers/users/updateUser.controller";
import idOwnerVerifierMiddleware from "../middlewares/idOwnerVerifier.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import yupValidateMiddleware from "../middlewares/yupValidate.middleware";

import usersSchema from "../schemas/users/users.schema";

const usersRouter: Router = Router();

usersRouter.get(
    "/:id",
    verifyTokenMiddleware,
    idOwnerVerifierMiddleware,
    readUserController
);
usersRouter.get("/:id", readUserProfileController);
usersRouter.post("", yupValidateMiddleware(usersSchema), createUserController);
usersRouter.delete(
    "/:id",
    verifyTokenMiddleware,
    idOwnerVerifierMiddleware,
    deleteUserController
);
usersRouter.patch(
    "/:id",
    verifyTokenMiddleware,
    idOwnerVerifierMiddleware,
    updateUserController
);

export default usersRouter;
