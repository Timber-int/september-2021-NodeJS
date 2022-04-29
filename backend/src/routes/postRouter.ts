import { Router } from 'express';
import { postController } from '../controllers';

const router = Router();

router.get('/', postController.getAllPost);
router.post('/', postController.createPost);

export const postRouter = router;
