import { Router } from 'express';
import { STATUS } from '../errorsCode';
import { authRouter } from './authRouter';
import { postRouter } from './postRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/posts', postRouter);

// @ts-ignore
router.use('*', (err, req, res, next) => {
    res
        .status(err.status || STATUS.CODE_500)
        .json({
            message: err.message,
            data: err.data,
        });
});

export const apiRouter = router;
