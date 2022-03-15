import { Router } from 'express';
import { userController } from '../contorller';

const router = Router();

router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);
router.get('/:email', userController.getUserByEmail);
router.post('/', userController.createUser);
router.put('/:id', userController.updateById);
router.delete('/:id', userController.deleteById);

export const userRouter = router;
