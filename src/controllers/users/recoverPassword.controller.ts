import { Request, Response } from "express";
import recoverPasswordService from "../../services/users/recoverPassword.service";

async function recoverPasswordController(req: Request, res: Response) {
    const update = await recoverPasswordService(req.body);
    return res.status(200).json(update);
}

export default recoverPasswordController;
