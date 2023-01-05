import { Router } from "express";
import createCommentController from "../controllers/comments/createComment.controller";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import yupValidateMiddleware from "../middlewares/yupValidate.middleware";
import createCommentSchema from "../schemas/comments/comments.schema";

const commentsRouter = Router();

commentsRouter.post(
    "/:id",
    verifyTokenMiddleware,
    yupValidateMiddleware(createCommentSchema),
    createCommentController
);

export default commentsRouter;
