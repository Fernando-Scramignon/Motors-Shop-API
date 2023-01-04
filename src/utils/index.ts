import { validate } from "uuid";
import { AppError } from "../errors/appError";

export function uuidCheck(params: string) {
    if (!validate(params)) {
        throw new AppError(400, "O id passado não é um uuid válido");
    }

    return params;
}
