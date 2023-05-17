import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {
    async execute({ name, email, admin = false, password } : IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        console.log("Email", email);

        if(!email){
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const user = usersRepository.create({
            name, 
            email,
            admin,
            password: passwordHash,
        });

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService }

/**
 * [x] Não é permitido cadastrar mais de um usuário com o mesmo e-mail
 * [x] Não é permitido cadastrar usuário sem e-mail
 */