import { Response } from 'express';
import { IUsers } from '../entity/users';
import { userService } from '../services/userService';

class UserController {
    public async createUser(req: Request, res: Response): Promise<Response<IUsers>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }
}
export const userController = new UserController();
