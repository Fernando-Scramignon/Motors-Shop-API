import * as yup from "yup";

function REQUIRED_MESSAGE(field: string) {
    return `${field}: Campo obrigatório`;
}
function MAX_MESSAGE(charNum: number): string {
    return `Campo precisa ter no máxio ${charNum} caracteres`;
}

const usersSchema = yup.object().shape({
    name: yup
        .string()
        .required(REQUIRED_MESSAGE("name"))
        .max(100, MAX_MESSAGE(100)),
    email: yup
        .string()
        .required(REQUIRED_MESSAGE("email"))
        .max(100, MAX_MESSAGE(100)),
    password: yup
        .string()
        .required(REQUIRED_MESSAGE("password"))
        .max(256, MAX_MESSAGE(256)),
    cpf: yup
        .string()
        .required(REQUIRED_MESSAGE("cpf"))
        .max(14, MAX_MESSAGE(14)),
    phone: yup
        .string()
        .required(REQUIRED_MESSAGE("phone"))
        .max(14, MAX_MESSAGE(14)),
    birthdate: yup.date().required(REQUIRED_MESSAGE("birthdate")),
    description: yup
        .string()
        .required(REQUIRED_MESSAGE("description"))
        .max(300, MAX_MESSAGE(300)),
    isAdvertiser: yup.boolean().required(REQUIRED_MESSAGE("isAdvertiser")),
});

export default usersSchema;
