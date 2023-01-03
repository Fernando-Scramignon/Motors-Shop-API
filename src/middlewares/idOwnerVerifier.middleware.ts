import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

const idOwnerVerifierMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const idComparer = req.user.id;

    if (id !== idComparer) {
        throw new AppError(401, "Unauthorized");
    } else {
        next();
    }
};

export default idOwnerVerifierMiddleware;
