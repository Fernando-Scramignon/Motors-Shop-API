import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/products.entity";

async function getProductByIdService(id: string) {
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne({
        where: {
            id: id,
        },
    });

    return product;
}

export default getProductByIdService;
