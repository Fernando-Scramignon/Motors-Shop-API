import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities/comments.entity";
import { AppError } from "../../errors/appError";

async function updateCommentService(id: string, comment: string) {
    const commentRepository = AppDataSource.getRepository(Comment);

    const updatedComment = await commentRepository.findOne({
        where: {
            id: id,
        },
    });

    if (!updatedComment) {
        throw new AppError(404, "Comentário não encontrado");
    }

    await commentRepository.update(id, { comment: comment });

    return true;
}

export default updateCommentService;
