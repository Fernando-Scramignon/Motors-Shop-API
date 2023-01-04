import { Request, Response } from "express";
import readUserProfileService from "../../services/users/readUserProfile.service";
import { uuidCheck } from "../../utils";

async function readUserProfileController(req: Request, res: Response) {
    const id = uuidCheck(req.params.id);
    const user = await readUserProfileService(id);
    return res.status(200).json(user);
}

export default readUserProfileController;
