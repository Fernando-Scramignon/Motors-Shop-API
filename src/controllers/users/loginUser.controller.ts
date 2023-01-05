import { Response, Request } from "express";
import { AppError } from "../../errors/appError";

import loginUserService from "../../services/users/loginUser.service";

import { IUserLogin } from "../../interfaces/users";

async function loginUserController(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password)
        throw new AppError(400, "Missing email and/or password");

    const loginData: IUserLogin = { email, password };

    const token = await loginUserService(loginData);
    return res.status(200).json(token);
}

export default loginUserController;
