import { Router } from 'express';
import { userRouter } from './userRouter';
import { authRouter } from './authRouter';
import { postRouter } from './postRouter';
import { commentRouter } from './commentRouter';
import { STATUS } from '../errorsCode';

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/auth', authRouter);

// @ts-ignore
router.use('*', (err, req, res, next) => {
    res.status(err.code || STATUS.CODE_500)
        .json(err.message);
});

export const apiRouter = router;
