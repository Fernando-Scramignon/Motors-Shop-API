import { Request, Response } from "express";
import createCommentService from "../../services/comments/createComment.service";

async function createCommentController(req: Request, res: Response) {
    const { id } = req.params;
    const { comment } = req.body;
    const userId = req.user.id;
    const postComment = await  createCommentService(id, userId, comment);
    return res.status(201).json(postComment);
}

export default createCommentController;
