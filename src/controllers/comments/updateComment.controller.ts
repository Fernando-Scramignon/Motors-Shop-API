import { Request, Response } from "express";
import updateCommentService from "../../services/comments/updateComment.service";

async function updateCommentController(req: Request, res: Response) {
    const { id } = req.params;
    const { comment } = req.body;

    const postComment = await updateCommentService(id, comment);
    return res
        .status(200)
        .json({ message: "Comentário atualizado com sucesso" });
}

export default updateCommentController;
