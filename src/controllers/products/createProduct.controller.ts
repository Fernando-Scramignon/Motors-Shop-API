import { Request, Response } from "express";

function createProductController(req: Request, res: Response) {
    return res.status(201).json("Produto criado");
}

export default createProductController;
