import { Request, Response } from "express";
import createProductService from "../../services/products/createProduct.service";

async function createProductController(req: Request, res: Response) {
    const {
        title,
        year,
        km,
        price,
        description,
        vehicle_type,
        announcement_type,
        published,
        cover_image,
        images,
    } = req.body;

    const product = await createProductService({
        title,
        year,
        km,
        price,
        description,
        vehicle_type,
        announcement_type,
        published,
        cover_image,
        images,
    });
    return res.status(201).json(product);
}

export default createProductController;
