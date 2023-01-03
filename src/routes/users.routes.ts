import { Router } from "express";
import deleteUserController from "../controllers/users/deleteUser.controller";
import idOwnerVerifierMiddleware from "../middlewares/idOwnerVerifier.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";


const usersRouter = Router();

usersRouter.delete("/:id",verifyTokenMiddleware,idOwnerVerifierMiddleware,deleteUserController)