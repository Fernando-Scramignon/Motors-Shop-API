import { Request, Response } from "express";
import updateUserService from "../../services/users/updateUser.service";

async function updateUserController(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, cpf, phone, birthdate, description, password } =
        req.body;
    const { cep, state, city, street, number, complement } = req.body;
    const updatedUser = await updateUserService(
        id,
        {
            name,
            email,
            cpf,
            phone,
            birthdate,
            description,
            password,
        },
        { cep, state, city, street, number, complement }
    );
    return res.status(200).json({ message: "Usuário atualizado com sucesso" });
}

export default updateUserController;
