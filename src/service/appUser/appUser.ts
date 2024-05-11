import {CommonRequests} from '../../server/commonRequests'

export interface UserInterface {
    id?: number
    name: string
    bio: string
    image: string
    createdAt?: string
    updatedAt?: string
}

class AppUser implements UserInterface{

    id?: number
    name: string
    bio: string
    image: string
    createdAt?: string
    updatedAt?: string

    constructor({ id, name, bio, image, createdAt, updatedAt }: UserInterface) {
        this.id = id
        this.name = name
        this.bio = bio
        this.image = image
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    static makeAppUser(item: UserInterface) {
        const isValid = item?.name && item?.name;

        if (isValid) {
            return new AppUser({
                id: item.id,
                name: item.name,
                bio: item.bio,
                image: item.image,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            })
        }
    }

    static parseAppUserFromServer(item: UserInterface) {

        return new AppUser({
            id: item.id,
            name: item.name,
            bio: item.bio,
            image: item.image,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        })
    }
}

export class AppUserReq extends CommonRequests {

    constructor({baseUrl}: {baseUrl: string}) {
        super({baseUrl});
    }

    async getAll(query?: any): Promise<AppUser[]> {
        const response = await super.getAll(query);
        return response?.data?.result?.map((item: any) => new AppUser(item));
    }

    async getOneByPk(pk: number): Promise<AppUser> {
        const response = await super.getOneByPk(pk);
        return new AppUser(response?.data?.result)
    }

    async create(user: AppUser): Promise<AppUser> {
        return new AppUser(await super.create(user))
    }

    async update(user: AppUser): Promise<AppUser> {
        return new AppUser(await super.update(user.id, user))
    }

}

const domain = process.env.REACT_APP_SERVER_DOMAIN ?? '';

const baseUrl = domain + '/appUser'

export const appUserReq = new AppUserReq({baseUrl})

export default AppUser;
