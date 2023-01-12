import { Request, Response } from "express";
import updateProductService from "../../services/products/updateProduct.service";

async function updateProductController(req: Request, res: Response) {
    const { id } = req.params;
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

    const product = await updateProductService(
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

    return res.status(200).json(product);
}

export default updateProductController;
