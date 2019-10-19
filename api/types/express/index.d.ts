declare namespace Express {
  interface IUser {
    _id: any
    firstName: string
    lastName: string
    email: string
    password: string
    info: string
    photoUrl: string

    telegramId?: number

    youtubeLink?: string
    instagramLink?: string
    telegramLink?: string
    facebookLink?: string
    twitterLink?: string
    whatsappLink?: string
    aparatLink?: string
  }
  interface User extends IUser {}
}
declare namespace Express {
  export interface Request {}
  export interface Response {
    echo(message: string, data: object, success: boolean, status: number): void
    success(data: object, message?: string): void
    noContent(): void
    error(message: string, status: number): void
    notFound(): void
    accessDenied(): void
    badRequest(invalidParam: string): void
    unauthorized(): void
    internalServerError(e: any): void
  }
}
