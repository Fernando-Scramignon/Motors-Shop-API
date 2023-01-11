import * as yup from "yup";

function REQUIRED_MESSAGE(field: string) {
    return `${field}: campo obrigatório`;
}

const recoverPasswordSchema = yup.object().shape({
    token: yup.string().required(REQUIRED_MESSAGE("token")),
    newPassword: yup.string().required(REQUIRED_MESSAGE("newPassword")),
});

export default recoverPasswordSchema;
