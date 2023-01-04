import { Request, Response } from "express";
import { AppError } from "../../errors/appError";

import { IUserCreation } from "../../interfaces/users";
import createUserService from "../../services/users/createUser.service";

async function createUserController(req: Request, res: Response) {
    const userInfo: IUserCreation = req.body;
    const response = await createUserService(userInfo);

    return res.status(201).json(response);
}

export default createUserController;
