import { Router } from "express";
import deleteUserController from "../controllers/users/deleteUser.controller";
import updateUserController from "../controllers/users/updateUser.controller";
import idOwnerVerifierMiddleware from "../middlewares/idOwnerVerifier.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";


const usersRouter = Router();

usersRouter.delete("/:id",verifyTokenMiddleware,idOwnerVerifierMiddleware,deleteUserController)
usersRouter.patch("/:id",verifyTokenMiddleware,idOwnerVerifierMiddleware,updateUserController)


export default usersRouter