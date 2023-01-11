import * as yup from "yup";

function REQUIRED_MESSAGE(field: string) {
    return `${field}: campo obrigatório`;
}

const forgotPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .email("O email deve ser válido")
        .required(REQUIRED_MESSAGE("email")),
});

export default forgotPasswordSchema;
