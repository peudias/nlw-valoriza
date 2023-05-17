import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService{
    async execute(name: string){
        const tagsRepositories = getCustomRepository(TagsRepositories);

        console.log("Elogio:", name);

        if(!name){
            throw new Error("Incorrect name!");
        }

        const tagAlreadyExists = await tagsRepositories.findOne({
            name,
        });

        if(tagAlreadyExists){
            throw new Error("Tag already exists!");
        }

        const tag = tagsRepositories.create({
            name,
        });

        await tagsRepositories.save(tag);

        return tag;
    }
}

export { CreateTagService };


/**
 * [x] Não é permitido cadastrar tag sem nome
 * [x] Não é permitido cadastrar mais de uma tag com o mesmo nome
 * [x] Não é permitido o cadastro por usuários que não sejam administradores
 */