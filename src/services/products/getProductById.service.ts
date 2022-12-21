import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/products.entity";
import { AppError } from "../../errors/appError";

async function getProductByIdService(id: string) {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({
        where: {
            id: id,
        },
    });

    if (!product) {
        throw new AppError(404, "Product not found");
    }

    return product;
}

export default getProductByIdService;
