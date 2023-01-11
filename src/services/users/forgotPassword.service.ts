import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import jwt from "jsonwebtoken";
import transport from "../../modules/mailer";

async function forgotPasswordService(email: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
        where: {
            email,
        },
    });

    if (!user) {
        throw new AppError(404, "Usuário não encontrado");
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
        expiresIn: "1h",
    });

    transport.sendMail({
        to: email,
        from: "motorsshop@gmail.com",
        subject: "Recuperação de senha",
        text:
            "Esqueceu sua senha? Use o token a seguir para alterá-la\n" + token,
    });
}

export default forgotPasswordService;
