import { Request, Response } from 'express';
import { COOKIE } from '../constants';
import { IRequestExtended, ITokenData } from '../interfaces';
import { authService, tokenService, userService } from '../services';
import { IUser } from '../entity';
import { tokenRepository } from '../repositories';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            {
                maxAge: COOKIE.maxAgeRefreshToken,
                httpOnly: true,
            },
        );

        return res.json(data);
    }

    public async login(req: IRequestExtended, res: Response) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;

            const { password } = req.body;

            await userService.compareUserPassword(password, hashPassword);

            const tokenPair = tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });

            const { accessToken, refreshToken } = tokenPair;

            await tokenRepository.saveTokensToDB({ refreshToken, accessToken, userId: Number(id) });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });

            return res.json('OK');
        } catch (e:any) {
            return res.status(400)
                .json(e.message);
        }
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        res.clearCookie(COOKIE.nameRefreshToken);

        await tokenService.deleteUserTokenPair(id);

        return res.json('OK');
    }
}

export const authController = new AuthController();
