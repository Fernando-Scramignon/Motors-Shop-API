import { Request, Response } from "express";

function createUserController(req: Request, res: Response) {
    return res.status(201).json("Usuário criado");
}

export default createUserController;
