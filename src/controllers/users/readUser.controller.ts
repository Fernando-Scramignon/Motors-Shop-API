import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import readUserService from "../../services/users/readUser.service";
import { uuidCheck } from "../../utils";

async function readUserController(req: Request, res: Response) {
    const id = uuidCheck(req.params.id);
    const user = await readUserService(id);
    return res.status(200).json(instanceToPlain(user));
}

export default readUserController;
