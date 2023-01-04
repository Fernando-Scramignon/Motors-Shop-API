import { Request, Response } from "express";
import readUserProfileService from "../../services/users/readUserProfile.service";

async function readUserProfileController(req: Request, res: Response) {
    const { id } = req.params;
    const user = await readUserProfileService(id);
    return res.status(200).json(user);
}

export default readUserProfileController;
