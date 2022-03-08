import { Router } from 'express';
import { userController } from '../contorller/userController';

const router = Router();

router.get('/:email', userController.getUserByEmail);
router.post('/', userController.createUser);

export const userRouter = router;
