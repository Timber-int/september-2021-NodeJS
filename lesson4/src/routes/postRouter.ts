import { Router } from 'express';
import { postController } from '../contorller';

const router = Router();

router.get('/', postController.getAllPosts);
router.get('/:userId', postController.postByUserId);
router.put('/:id', postController.updatePostByUserId);

export const postRouter = router;
