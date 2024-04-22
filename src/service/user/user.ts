import {CommonRequests} from '../../server/commonRequests'

type NullString = {
    string: string,
    valid: boolean
}

export interface UserInterface {
    userId?: number
    userName: string
    userBio?: string | null | NullString
    userImage?: string | null | NullString
    createdAt?: string
    updatedAt?: string
}

export class User implements UserInterface{

    userId?: number
    userName: string
    userBio?: string | null
    userImage?: string | null
    createdAt?: string
    updatedAt?: string

    constructor({ userId, userName, userBio, userImage, createdAt, updatedAt }: UserInterface) {
        this.userId = userId
        this.userName = userName
        // if (userBio.hasOwnProperty("valid"))
        // this.userBio = userBio
        // this.userImage = userImage
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    static makeUser(item: UserInterface) {
        const isValid = item?.userName && item?.userName;

        if (isValid) {
            return new User({
                userId: item.userId,
                userName: item.userName,
                userBio: item.userBio,
                userImage: item.userImage,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            })
        }
    }

    static parseUserFromServer(item: UserInterface) {

        // const userBio =

        return new User({
            userId: item.userId,
            userName: item.userName,
            userBio: item.userBio,
            // userBio: item.userBio?.valid ? item.userBio?.string : ,
            userImage: item.userImage,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        })
    }
}

export class UserReq extends CommonRequests {

    constructor({baseUrl}: {baseUrl: string}) {
        super({baseUrl});
    }

    async getAll(): Promise<User[]> {
        const response = await super.getAll();
        return response?.data?.result?.map((item: any) => new User(item));
    }

    async getOneByPk(pk: number): Promise<User> {
        const response = await super.getOneByPk(pk);
        return new User(response?.data?.result)
    }

    async create(user: User): Promise<User> {
        return new User(await super.create(user))
    }

    async update(user: User): Promise<User> {
        return new User(await super.update(user.userId, user))
    }

}

const domain = process.env.REACT_APP_SERVER_DOMAIN ?? '';

const baseUrl = domain + '/user'

export const userReq = new UserReq({baseUrl})
