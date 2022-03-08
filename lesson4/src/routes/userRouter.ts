import { Router } from 'express';
import { userController } from '../contorller/userController';

const router = Router();

router.post('/', userController.createUser);

export const userRouter = router;
