import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities/comments.entity";
import { AppError } from "../../errors/appError";

async function deleteCommentService(
    id: string
) {
    const commentRepository = AppDataSource.getRepository(Comment);
     
    const deleteComment= await commentRepository.findOne({
        where: {
          id: id,
        },
      })

      if(!deleteComment){
        throw new AppError(404,"Comentário não encontrado")
      }

      await commentRepository.delete(id)


}

export default deleteCommentService;
