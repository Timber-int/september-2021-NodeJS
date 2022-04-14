import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import { userRouter } from './userRouter';
import { authRouter } from './authRouter';
import { postRouter } from './postRouter';
import { commentRouter } from './commentRouter';
import { STATUS } from '../errorsCode';
import { studentRouter } from './studentRouter';
import { teacherRouter } from './teacherRouter';
import docs from '../docs/swagger.json';

const router = Router();

router.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/auth', authRouter);
router.use('/students', studentRouter);
router.use('/teachers', teacherRouter);

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
