import { Request, Response } from "express";
import forgotPasswordService from "../../services/users/forgotPassword.service";

async function forgotPasswordController(req: Request, res: Response) {
    const { email } = req.body;
    await forgotPasswordService(email);
    return res.status(204).send();
}

export default forgotPasswordController;
