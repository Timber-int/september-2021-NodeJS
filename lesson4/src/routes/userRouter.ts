import { NextFunction, Response, Router } from 'express';
import { userController } from '../contorller';
import { authMiddleware } from '../middlewares';
import { IRequestExtended } from '../interfaces';
import { userDataForUpdateValidator } from '../validator';

const router = Router();

router.get('/', userController.getUserPagination);
// router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);
router.get('/:email', userController.getUserByEmail);

router.put('/:id', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = userDataForUpdateValidator;
    next();
}, authMiddleware.dataValidator, userController.updateById);
router.delete('/:id', userController.deleteById);

export const userRouter = router;
