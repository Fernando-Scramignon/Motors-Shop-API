import { Router } from "express";

import yupValidateMiddleware from "../middlewares/yupValidate.middleware";
import usersSchema from "../schemas/users/users.schema";

import createUserController from "../controllers/users/createUser.controller";

const usersRouter: Router = Router();

usersRouter.post("", yupValidateMiddleware(usersSchema), createUserController);

export default usersRouter;
