import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { CONSTANTS } from '../constants';
import { IRequestExtended } from '../interfaces';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';

class FileMiddleware {
    async checkUserAvatar(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            if (!req.files?.avatar) {
                next();
                return;
            }

            const {
                name,
                size,
                mimetype,
            } = req.files.avatar as UploadedFile;

            if (size > CONSTANTS.PHOTO_MAX_SIZE) {
                next(new ErrorHandler(`${MESSAGE.TO_BIG_PHOTO_FILE}: ${name}`));
                return;
            }

            if (!CONSTANTS.PHOTOS_MIMETYPES.includes(mimetype)) {
                next(new ErrorHandler(MESSAGE.WRONG_FILE_FORMAT));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const fileMiddleware = new FileMiddleware();
