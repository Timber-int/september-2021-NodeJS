import { Router } from 'express';
import { commentController } from '../contorller';

const router = Router();

router.get('/', commentController.getAllComments);
// router.get('/:authorId', commentController.getCommentByUserId);
router.get('/:id', commentController.getCommentById);
// router.post('/',commentController.createComment)
router.post('/action', commentController.standLikeOrDislikeComments);

export const commentRouter = router;
