import { Request, Response } from 'express';
import { IUser } from '../entity';
import { userService } from '../services';

class UserController {
    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.status(201).json(createdUser);
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response<IUser>> {
        const { email } = req.params;

        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }

    public async getAllUsers(req: Request, res: Response): Promise<Response<IUser[]>> {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            return res.send(e);
        }
    }

    public async getUserById(req: Request, res: Response): Promise<Response<IUser>> {
        try {
            const { id } = req.params;

            const user = await userService.getUserById(Number(id));
            return res.json(user);
        } catch (e) {
            return res.send(e);
        }
    }

    public async deleteById(req: Request, res: Response): Promise<Response<object>> {
        try {
            const { id } = req.params;
            await userService.deleteById(Number(id));
            return res.json('User deleted successfully');
        } catch (e) {
            return res.send(e);
        }
    }

    public async updateById(req: Request, res: Response): Promise<object> {
        try {
            const { id } = req.params;
            await userService.updateById(Number(id), req.body);
            return res.status(201).json('User updated successfully');
        } catch (e) {
            return res.send(e);
        }
    }
}

export const userController = new UserController();
