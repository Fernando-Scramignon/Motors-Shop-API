import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import jwt from "jsonwebtoken";
import { hash } from "bcryptjs";

interface RecoverPasswordServiceProps {
    token: string;
    newPassword: string;
}

async function recoverPasswordService({
    token,
    newPassword,
}: RecoverPasswordServiceProps) {
    const userRepository = AppDataSource.getRepository(User);
    let id: string = "";

    jwt.verify(
        token,
        process.env.SECRET_KEY as string,
        (error: any, decoded: any) => {
            if (error) {
                throw new AppError(401, "O token expirou ou é inválido");
            }

            id = decoded.id;
        }
    );

    const user = await userRepository.findOne({
        where: {
            id,
        },
    });

    if (!user) {
        throw new AppError(404, "Usuário não encontrado");
    }

    const password = await hash(newPassword, 10);

    await userRepository.update(id, {
        password,
    });

    return { message: "Senha atualizada com sucesso!" };
}

export default recoverPasswordService;
