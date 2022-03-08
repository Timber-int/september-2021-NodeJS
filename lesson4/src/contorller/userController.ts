import { Request, Response } from 'express';
import { IUser } from '../entity/user';
import { userService } from '../services/userService';

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
            return res.status(200).json(users);
        } catch (e) {
            return res.send(e);
        }
    }

    public async getUserById(req: Request, res: Response): Promise<Response<IUser>> {
        try {
            const { id } = req.params;

            const user = await userService.getUserById(Number(id));
            return res.status(200).json(user);
        } catch (e) {
            return res.send(e);
        }
    }

    public async deleteById(req: Request, res: Response): Promise<Response<IUser>> {
        try {
            const { id } = req.params;
            const user = await userService.deleteById(Number(id));
            return res.status(200).json(user);
        } catch (e) {
            return res.send(e);
        }
    }

    public async updateById(req: Request, res: Response): Promise<Response<IUser>> {
        try {
            const { id } = req.params;

            const user = await userService.updateById(Number(id), req.body);
            return res.status(200).json(user);
        } catch (e) {
            return res.send(e);
        }
    }
}

export const userController = new UserController();
