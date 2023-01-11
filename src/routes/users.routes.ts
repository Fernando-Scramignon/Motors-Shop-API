import { Router } from "express";

import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import readUserController from "../controllers/users/readUser.controller";
import readUserProfileController from "../controllers/users/readUserProfile.controller";
import updateUserController from "../controllers/users/updateUser.controller";
import idOwnerVerifierMiddleware from "../middlewares/idOwnerVerifier.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import yupValidateMiddleware from "../middlewares/yupValidate.middleware";
import loginUserController from "../controllers/users/loginUser.controller";

import usersSchema from "../schemas/users/users.schema";
import userUpdateSchema from "../schemas/users/userUpdate.schema";
import forgotPasswordController from "../controllers/users/forgotPassword.controller";
import forgotPasswordSchema from "../schemas/users/forgotPassword.schema";
import recoverPasswordSchema from "../schemas/users/recoverPassword.schema";
import recoverPasswordController from "../controllers/users/recoverPassword.controller";

const usersRouter: Router = Router();

usersRouter.get(
    "/:id",
    verifyTokenMiddleware,
    idOwnerVerifierMiddleware,
    readUserController
);
usersRouter.get("/:id/profile", readUserProfileController);
usersRouter.post("", yupValidateMiddleware(usersSchema), createUserController);
usersRouter.post(
    "/forgot_password",
    yupValidateMiddleware(forgotPasswordSchema),
    forgotPasswordController
);
usersRouter.patch(
    "/recover_password",
    yupValidateMiddleware(recoverPasswordSchema),
    recoverPasswordController
);
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
    yupValidateMiddleware(userUpdateSchema),
    updateUserController
);
usersRouter.post("/login", loginUserController);

export default usersRouter;
