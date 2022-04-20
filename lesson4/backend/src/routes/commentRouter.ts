import { NextFunction, Response, Router } from 'express';
import { commentController } from '../contorller';
import { authMiddleware, commentMiddleware } from '../middlewares';
import { IRequestExtended } from '../interfaces';
import { checkIsCommentBodyValidator } from '../validator/commentValidator';

const router = Router();

router.get('/', commentController.getAllComments);
// router.get('/:authorId', commentController.getCommentByUserId);
router.get('/:id', commentController.getCommentById);
router.post('/', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = checkIsCommentBodyValidator;
    next();
}, authMiddleware.dataValidator, commentMiddleware.checkIsAuthorComment, commentMiddleware.checkIsPostComment, commentController.createComment);
router.post('/action', commentController.standLikeOrDislikeComments);

export const commentRouter = router;
