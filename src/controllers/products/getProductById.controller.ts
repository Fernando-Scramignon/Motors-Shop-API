import { Request, Response } from "express";
import getProductByIdService from "../../services/products/getProductById.service";

async function getProductByIdController(req: Request, res: Response) {
    const { id } = req.params;

    const product = await getProductByIdService(id);

    return res.status(200).json(product);
}

export default getProductByIdController;
