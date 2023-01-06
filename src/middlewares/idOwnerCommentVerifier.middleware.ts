import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Comment } from "../entities/comments.entity";
import { AppError } from "../errors/appError";

const idOwnerCommentVerifierMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const { id } = req.params;

    const commentRepository = AppDataSource.getRepository(Comment);
    const comment= await commentRepository.findOne(
        {
            where: { id },
            relations: { user:true },  
        }
    )
 
    const idComparer = req.user.id;

    if (!comment) {
        throw new AppError(404, "Comentario não encontrado");
    }


    if (comment.user.id !== idComparer) {
        throw new AppError(401, "Não autorizado");
    } else {
        next();
    }
};

export default idOwnerCommentVerifierMiddleware;
