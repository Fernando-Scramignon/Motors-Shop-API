import { AppDataSource } from "../../data-source";
import { IUserCreation } from "../../interfaces/users";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import { hash } from "bcryptjs";
import { instanceToPlain } from "class-transformer";

export async function createUserService(userInfo: IUserCreation) {
    const userRepository = AppDataSource.getRepository(User);

    const userAlreadyExists = await userRepository.findOne({
        where: [{ email: userInfo.email }, { cpf: userInfo.cpf }],
    });

    if (userAlreadyExists) throw new AppError(409, "User already exists");

    const hashedPassword = await hash(userInfo.password, 10);
    userInfo.password = hashedPassword;

    let newUser = userRepository.create(userInfo);
    return instanceToPlain(await userRepository.save(newUser));
}

export default createUserService;
