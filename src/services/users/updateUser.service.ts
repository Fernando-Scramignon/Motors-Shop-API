import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import { IUserUpdate } from "../../interfaces/users";

async function updateUserService(
    id: string,
    { name, email, cpf, phone, birthdate, description }: IUserUpdate
) {
    const userRepository = AppDataSource.getRepository(User);
    if (!name && !email && !cpf && !phone && !birthdate && !description) {
        throw new AppError(400, "Adicione um campo, pelo menos um campo é obrigatório");
    }
    const userupdate = await userRepository.findOne({
        where: {
            id: id,
        },
    });

    if (!userupdate) {
        throw new AppError(404, "Usuário não encontrado");
    }

    if (email) {
        const userEmailInUse = await userRepository.findOne({
            where: { email: email },
        });
        if (userEmailInUse) {
            throw new AppError(400, "Email já está em uso");
        }
    }

    const updatedUser = {
        name: name || userupdate.name,
        email: email || userupdate.email,
        cpf: cpf || userupdate.cpf,
        phone: phone || userupdate.phone,
        birthdate: birthdate || userupdate.birthdate,
        description: description || userupdate.description,
    };

    await userRepository.update(userupdate.id, updatedUser);

    return true;
}

export default updateUserService;
