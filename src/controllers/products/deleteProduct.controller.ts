import { Request, Response } from "express";
import deleteProductService from "../../services/products/deleteProduct.service";

async function deleteProductController(req: Request, res: Response) {
    const { id } = req.params;

    await deleteProductService(id);

    return res.status(204).send();
}

export default deleteProductController;
