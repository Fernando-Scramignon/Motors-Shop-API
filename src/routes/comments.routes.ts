import { Router } from "express";
import createCommentController from "../controllers/comments/createComment.controller";
import deleteCommentController from "../controllers/comments/deleteComment.controller";
import updateCommentController from "../controllers/comments/updateComment.controller";
import idOwnerCommentVerifierMiddleware from "../middlewares/idOwnerCommentVerifier.middleware";
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

commentsRouter.patch(
    "/:id",
    verifyTokenMiddleware,
    idOwnerCommentVerifierMiddleware,
    yupValidateMiddleware(createCommentSchema),
    updateCommentController
);

commentsRouter.delete(
    "/:id",
    verifyTokenMiddleware,
    idOwnerCommentVerifierMiddleware,
    deleteCommentController
);

export default commentsRouter;
