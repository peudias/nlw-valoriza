import { classToPlain } from 'class-transformer';
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories";

class ListUserService{
    async execute(){
        const usersRepositoies = getCustomRepository(UsersRepositories);
        
        const users = await usersRepositoies.find();

        return classToPlain(users);
    }
}

export { ListUserService }