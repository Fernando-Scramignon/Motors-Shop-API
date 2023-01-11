import { instanceToPlain } from "class-transformer";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/products.entity";
import { AppError } from "../../errors/appError";

async function getProductByIdService(id: string) {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({
        where: {
            id: id,
        },
        relations: {
            user: true,
            comments: true,
        },
    });

    if (!product) {
        throw new AppError(404, "Produto não encontrado");
    }

    return instanceToPlain(product);
}

export default getProductByIdService;
