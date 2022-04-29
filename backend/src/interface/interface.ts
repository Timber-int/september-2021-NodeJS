export interface IUser {
    _id: string,
    firstName: string,
    lastName: string,
    password: string,
    age: number,
    email: string,
    role?: string | undefined,
    city?: string,
}

export interface ITokenData {
    accessToken: string,
    refreshToken: string,
    userEmail: string,
    userId: string,
}

export interface IUserPayload {
    userEmail: string,
    userId: string,
}

export interface ITokenPair {
    accessToken: string,
    refreshToken: string,
}

export interface IToken {
    accessToken: string,
    refreshToken: string,
    userId: string,
}

export interface IActionTokenPayload {
    actionToken: string,
    userId: string,
}

export interface IPost {
    title: string,
    text: string,
    userId: string,
    picture?: object,
}
