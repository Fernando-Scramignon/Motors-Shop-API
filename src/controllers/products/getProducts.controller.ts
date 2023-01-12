import { Request, Response } from "express";
import getProductsService from "../../services/products/getProducts.service";
import { instanceToPlain } from "class-transformer";

async function getProductsController(req: Request, res: Response) {
    const { id } = req.params;
    const products = await getProductsService(id);

    return res.status(200).json(instanceToPlain(products));
}

export default getProductsController;
