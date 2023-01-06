import { Request, Response } from "express";
import deleteCommentService from "../../services/comments/deleteComment.service";


async function deleteCommentController(req: Request, res: Response) {
    const { id } = req.params;
    
     const deletedComment = await deleteCommentService(id); 
    return res.status(204).json();
}

export default deleteCommentController;
