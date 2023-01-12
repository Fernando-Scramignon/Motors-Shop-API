import { AppDataSource } from "../../data-source";
import { Image } from "../../entities/images.entity";
import { Product } from "../../entities/products.entity";
import { AppError } from "../../errors/appError";
import { IProductRequest } from "../../interfaces/products";

async function updateProductService(
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
    }: IProductRequest,
    id: string
) {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({ id });

    if (!product) {
        throw new AppError(404, "Produto não encontrado");
    }

    if (
        !title &&
        !year &&
        !km &&
        !price &&
        !description &&
        !vehicle_type &&
        !announcement_type &&
        !!published &&
        !published &&
        !cover_image &&
        !images
    ) {
        throw new AppError(
            400,
            "adicione um campo, pelo menos um campo é obrigatório para atualização"
        );
    }

    const updatedProduct = {
        title: title || product.title,
        year: year || product.year,
        km: km || product.km,
        price: price || product.price,
        description: description || product.description,
        vehicle_type: vehicle_type || product.vehicle_type,
        announcement_type: announcement_type || product.announcement_type,
        published:
            product.published != published ? published : product.published,
        cover_image: cover_image || product.cover_image,
    };

    await productRepository.update(id, updatedProduct);

    if (images) {
        const imageRepository = AppDataSource.getRepository(Image);

        await Promise.all(
            product.images.map(async (image) => {
                await imageRepository.delete(image.id);
            })
        );

        await Promise.all(
            images.map(async (image, index) => {
                if (index < 6) {
                    const newImage = new Image();
                    newImage.product = product;
                    newImage.url = image;

                    await imageRepository.save(newImage);
                }
            })
        );
    }

    const returnedProduct = await productRepository.findOneBy({ id });

    return returnedProduct;
}

export default updateProductService;
