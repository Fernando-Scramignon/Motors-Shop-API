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

    const { id } = req.user;

    const product = await createProductService(
        {
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
        },
        id
    );
    return res.status(201).json(product);
}

export default createProductController;
