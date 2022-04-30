import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { studentModel } from '../models';
import { MESSAGE } from '../message';

class StudentController {
    public async createStudent(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const createdStudent = await studentModel.create(req.body);

            res.json(createdStudent);
        } catch (e) {
            next(e);
        }
    }

    public async getAllStudents(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const students = await studentModel.find()
                .populate('teacherId');

            res.json(students);
        } catch (e) {
            next(e);
        }
    }

    public async deleteStudentById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;
            await studentModel.findOneAndDelete({ _id: id });

            res.json(MESSAGE.STUDENT_DELETED);
        } catch (e) {
            next(e);
        }
    }

    public async updateStudentById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;
            const { classNumber } = req.body;
            await studentModel.findByIdAndUpdate({ _id: id }, {
                classNumber,
            });

            res.json(MESSAGE.STUDENT_UPDATED);
        } catch (e) {
            next(e);
        }
    }
}

export const studentController = new StudentController();
