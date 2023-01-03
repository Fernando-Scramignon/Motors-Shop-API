import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.service";


async function deleteUserController(req: Request, res: Response) {
    const {id}= req.params
    const deletedUser = await deleteUserService(id);
    return res.status(204).json({ message: "User deleted successfully" });
}

export default deleteUserController;
