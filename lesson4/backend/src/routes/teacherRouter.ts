import { NextFunction, Response, Router } from 'express';
import { teacherController } from '../contorller';
import { IRequestExtended } from '../interfaces';
import { teacherBodyValidator } from '../validator';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/', teacherController.getAllTeacher);
router.post('/', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = teacherBodyValidator;
    next();
}, authMiddleware.dataValidator, teacherController.createTeacher);

export const teacherRouter = router;
