import { STATUS } from '../errorsCode';

export class ErrorHandler extends Error {
    message: string;

    code: number;

    constructor(message: string, code: number = STATUS.CODE_400) {
        super(message);
        this.code = code;

        Error.captureStackTrace(this, this.constructor);
    }
}
