import { NextFunction, Response, Router } from 'express';
import { postController } from '../contorller';
import { authMiddleware, postMiddleware } from '../middlewares';
import { IRequestExtended } from '../interfaces';
import { checkIsPostBodyValidate } from '../validator';

const router = Router();

router.get('/', postController.getAllPosts);
router.get('/:userId', postController.postByUserId);
router.post('/', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = checkIsPostBodyValidate;
    next();
}, postMiddleware.checkIsUserByIdExist, postMiddleware.checkIsPostTitleUnique, authMiddleware.dataValidator, postController.createPost);
router.put('/:id', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = checkIsPostBodyValidate;
    next();
}, authMiddleware.dataValidator, postMiddleware.checkIsPostTitleUnique, postController.updatePostById);

export const postRouter = router;
