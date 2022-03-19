export interface ITokenDataToSave {
    refreshToken: string;
    accessToken: string;
    userId: number;
}
export interface ITokenPair {
    accessToken: string;
    refreshToken: string;
}

export interface IUserPayload {
    userId: number,
    userEmail: string,
}

export interface ITokenData {
    accessToken: string;
    refreshToken: string;
    userId: number,
    userEmail: string,
}
