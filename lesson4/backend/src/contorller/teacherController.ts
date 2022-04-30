import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { teacherModel } from '../models';

class TeacherController {
    public async createTeacher(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const createdTeacher = await teacherModel.create(req.body);

            res.json(createdTeacher);
        } catch (e) {
            next(e);
        }
    }

    public async getAllTeacher(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const teachers = await teacherModel.find();

            res.json(teachers);
        } catch (e) {
            next(e);
        }
    }
}

export const teacherController = new TeacherController();
