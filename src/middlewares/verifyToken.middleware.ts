import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/appError";

const verifyTokenMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let token = req.headers.authorization;

    token = token!.split(" ")[1];

    if (!token)
        return res.status(401).json({ message: "Missing authorization token" });

    jwt.verify(
        token,
        process.env.SECRET_KEY as string,
        (error: any, decoded: any) => {
            if (error) {
                throw new AppError(401, "Token is either expired or invalid");
            }

            req.user = {
                id: decoded.id,
            };

            next();
        }
    );
};

export default verifyTokenMiddleware;
