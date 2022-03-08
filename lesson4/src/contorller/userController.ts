import { Request, Response } from 'express';
import { IUsers } from '../entity/users';
import { userService } from '../services/userService';

class UserController {
    public async createUser(req: Request, res: Response): Promise<Response<IUsers>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response<IUsers>> {
        const { email } = req.params;

        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }
}

export const userController = new UserController();
