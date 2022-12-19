import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/products.entity";

async function getProductsService(id: string) {
    const productRepository = AppDataSource.getRepository(Product);
    const products = productRepository.find();
    return products;
}

export default getProductsService;
