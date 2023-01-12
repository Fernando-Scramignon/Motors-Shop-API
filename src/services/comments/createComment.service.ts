import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities/comments.entity";
import { Product } from "../../entities/products.entity";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";

async function createCommentService(
    id: string,
    userId: string,
    comment: string
) {
    const commentRepository = AppDataSource.getRepository(Comment);
    const userRepository = AppDataSource.getRepository(User);
    const productRepository = AppDataSource.getRepository(Product);

    const nowDate = Date.now();
    const today = new Date(nowDate);

    const user = await userRepository.findOne({
        where: {
            id: userId,
        },
    });

    const product = await productRepository.findOne({
        where: {
            id: id,
        },
    });

    if (!user) {
        throw new AppError(
            404,
            "O usuário associado ao token não foi encontrado"
        );
    }

    if (!product) {
        throw new AppError(404, "O produto não foi encontrado");
    }

    const newComment = new Comment();
    newComment.comment = comment;
    newComment.user = user;
    newComment.product = product;
    newComment.created_at = today;

    commentRepository.create(newComment);
    await commentRepository.save(newComment);
    const newCommentReturn = {
        id: newComment.id,
        comment: newComment.comment,
        created_at: newComment.created_at,
    };
    return newCommentReturn;
}

export default createCommentService;
