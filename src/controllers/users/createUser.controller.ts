import { Request, Response } from "express";

function createUserController(req: Request, res: Response) {
  return res.status(201).json("User criado");
}

export default createUserController;
