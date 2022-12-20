import { Request, Response } from "express";
import getProductsService from "../../services/products/getProducts.service";

async function getProductsController(req: Request, res: Response) {
    const { id } = req.params;
    const products = await getProductsService(id);

    return res.status(200).json(products);
}

export default getProductsController;
