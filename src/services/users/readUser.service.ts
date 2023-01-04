import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";

async function readUserService(id: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
        where: {
            id: id,
        },
        relations: {
            address: true,
            products: true,
        },
    });

    if (!user) {
        throw new AppError(404, "Usuário não encontrado");
    }

    return user;
}

export default readUserService;
