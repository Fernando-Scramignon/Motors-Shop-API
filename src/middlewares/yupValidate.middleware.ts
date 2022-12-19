import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import { AppError } from "../errors/appError";

function yupValidateMiddleware(schema: AnySchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            await schema.validate(data, { abortEarly: false });

            next();
        } catch (err: any) {
            throw new AppError(
                400,
                err.errors.map((err: string) =>
                    err.includes("type,") ? err.slice(0, err.indexOf(",")) : err
                )
            );
        }
    };
}

export default yupValidateMiddleware;
