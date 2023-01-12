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

    if (!token)
        return res
            .status(401)
            .json({ message: "Token de autorização ausente" });

    token = token.includes("Bearer") ? token.split(" ")[1] : token;

    jwt.verify(
        token,
        process.env.SECRET_KEY as string,
        (error: any, decoded: any) => {
            if (error) {
                throw new AppError(401, "O token expirou ou é inválido");
            }

            req.user = {
                id: decoded.id,
            };

            next();
        }
    );
};

export default verifyTokenMiddleware;
