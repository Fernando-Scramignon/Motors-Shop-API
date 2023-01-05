import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/products.entity";
import { AppError } from "../errors/appError";

const idOwnerProductVerifierMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({
        where: { id },
        relations: { user: true },
    });

    if (!product) {
        throw new AppError(404, "Product not found");
    }

    const idComparer = req.user.id;

    if (product.user.id !== idComparer) {
        throw new AppError(401, "Não autorizado");
    } else {
        next();
    }
};

export default idOwnerProductVerifierMiddleware;
