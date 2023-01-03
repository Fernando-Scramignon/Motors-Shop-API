import { Request, Response } from "express";
import DeleteUserService from "../../services/users/deleteUser.service";

async function deleteUserController(req: Request, res: Response) {
    const {id}= req.params
    const deletedUser = await DeleteUserService(id);
    return res.status(204).json(deletedUser);
}

export default deleteUserController;
