import { Request, Response } from 'express';
import { COOKIE } from '../constants';
import { IRequestExtended, ITokenData, IUsersDataWithTokensToReturn } from '../interfaces';
import { authService, tokenService, userService } from '../services';
import { IUser } from '../entity';

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

    public async login(req: IRequestExtended, res: Response)
        :Promise<Response<IUsersDataWithTokensToReturn>> {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;

            const { password } = req.body;

            await userService.compareUserPassword(password, hashPassword);

            const tokenPair = tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });

            const { accessToken, refreshToken } = tokenPair;

            await tokenService.saveToken(id, refreshToken, accessToken);

            return res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e:any) {
            return res.status(400)
                .json(e.message);
        }
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        res.clearCookie(COOKIE.nameRefreshToken);

        await tokenService.deleteUserTokenPair(id);

        return res.json('We will be waiting for you later');
    }

    public async refresh(req:IRequestExtended, res:Response)
        :Promise<Response<IUsersDataWithTokensToReturn>> {
        try {
            const user = req.user as IUser;

            const { id, email } = user;

            const tokenPair = await tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });

            const { accessToken, refreshToken } = tokenPair;

            await tokenService.saveToken(id, refreshToken, accessToken);

            return res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e:any) {
            return res.status(400)
                .json(e.message);
        }
    }
}

export const authController = new AuthController();
