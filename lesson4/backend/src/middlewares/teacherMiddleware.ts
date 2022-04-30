import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorsCode';
import { teacherModel } from '../models';

class TeacherMiddleware {
    public async checkIsTeacherExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { teacherId } = req.body;

            const teacherFromDB = await teacherModel.findById({ _id: teacherId });

            if (!teacherFromDB) {
                next(new ErrorHandler(MESSAGE.NOT_TEACHER, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const teacherMiddleware = new TeacherMiddleware();
