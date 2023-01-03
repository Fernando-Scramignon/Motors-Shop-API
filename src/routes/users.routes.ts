import { Router } from "express";
import deleteUserController from "../controllers/users/deleteUser.controller";


const usersRouter = Router();

usersRouter.delete("/:id",deleteUserController)