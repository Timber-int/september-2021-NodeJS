import { NextFunction, Response, Router } from 'express';
import { studentController } from '../contorller';
import { IRequestExtended } from '../interfaces';
import { authMiddleware, teacherMiddleware } from '../middlewares';
import { studentBodyValidator, studentUpdateValidator } from '../validator';

const router = Router();

router.post('/', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = studentBodyValidator;
    next();
}, authMiddleware.dataValidator, teacherMiddleware.checkIsTeacherExist, studentController.createStudent);

router.get('/', studentController.getAllStudents);
router.delete('/:id', studentController.deleteStudentById);
router.patch('/:id', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = studentUpdateValidator;
    next();
}, authMiddleware.dataValidator, studentController.updateStudentById);

export const studentRouter = router;
