import * as yup from "yup";

const createCommentSchema = yup.object().shape({
    comment: yup.string().required("O campo comment é obrigatório").max(256, "Campo precisa ter no máximo 256 caracteres"),

});

export default createCommentSchema;
