import { instanceToPlain } from "class-transformer";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";

async function readUserProfileService(id: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            description: true,
            isAdvertiser: true,
        },
        relations: {
            products: true,
        },
    });

    if (!user) {
        throw new AppError(404, "Usuário não encontrado");
    }

    return instanceToPlain(user);
}

export default readUserProfileService;
