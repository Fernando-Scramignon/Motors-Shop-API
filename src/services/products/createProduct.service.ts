import { AppDataSource } from "../../data-source";
import { Image } from "../../entities/images.entity";
import { Product } from "../../entities/products.entity";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import { IProductRequest } from "../../interfaces/products";

async function createProductService(
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
    const imageRepository = AppDataSource.getRepository(Image);
    const userRepository= AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where: {
            id: id,
        },
    });

    if (!user) {
        throw new AppError(404, "O usuário associado ao token não foi encontrado");
    }

    const newProduct = new Product();
    newProduct.title = title;
    newProduct.year = year;
    newProduct.km = km;
    newProduct.price = price;
    newProduct.description = description;
    newProduct.vehicle_type = vehicle_type;
    newProduct.announcement_type = announcement_type;
    newProduct.published = published;
    newProduct.cover_image = cover_image;
    newProduct.user= user

    productRepository.create(newProduct);
    await productRepository.save(newProduct);

    await Promise.all(
        images.map(async (image) => {
            const newImage = new Image();
            newImage.product = newProduct;
            newImage.url = image;

            imageRepository.create(newImage);
            await imageRepository.save(newImage);
        })
    );

    return newProduct;
}

export default createProductService;
