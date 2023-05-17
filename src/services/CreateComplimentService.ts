import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRespositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest{
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService{
    async execute({tag_id, user_sender, user_receiver, message} : IComplimentRequest){
        const complimentsRepositores = getCustomRepository(ComplimentsRepositories);
        const usersRepositories = getCustomRepository(UsersRepositories);

        if(user_sender === user_receiver){
            throw new Error("Incorrect User Receiver");
        }

        const userReceiverExists = await usersRepositories.findOne(user_receiver);

        if(!userReceiverExists){
            throw new Error("User Receiver does not exists!");
        }

        const compliment = complimentsRepositores.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });

        await complimentsRepositores.save(compliment);

        return compliment;
    }
}

export { CreateComplimentService }

/** Cadastro de Elogios
 * [ ] Não é permitido um usuário cadastrar um elogio para si
 * [ ] Não é permitido cadastrar elogios para usuários inválidos
 * [ ] O usuário precisa estar autenticado na aplicação
 */