import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/products.entity";
import { AppError } from "../../errors/appError";

async function deleteProductService(id: string) {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({ id });

    if (!product) {
        throw new AppError(404, "Product not found");
    }

    await productRepository.delete(id);

    return;
}

export default deleteProductService;
