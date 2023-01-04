import { AppDataSource } from "../../data-source";

import { User } from "../../entities/users.entity";

import { IUserLogin } from "../../interfaces/users";

import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

import { AppError } from "../../errors/appError";
import "dotenv/config";

async function loginUserService(loginData: IUserLogin) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
        where: { email: loginData.email },
    });

    if (!user) throw new AppError(404, "Wrong email or password");

    const isPasswordEqual = await compare(loginData.password, user.password);
    if (!isPasswordEqual) throw new AppError(404, "Wrong email or password");

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
        expiresIn: "1d",
    });

    return { token, id: user.id };
}

export default loginUserService;
