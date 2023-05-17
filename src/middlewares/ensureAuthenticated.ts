import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    // Receber token
    const authToken = request.headers.authorization;

    // Validar se token está preenchido
    if(!authToken){
        return response.status(401).json({message: "authToken missing"});
    }

    //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlZHJvLmRpYXNAY29yZW5tZy5nb3YuYnIiLCJpYXQiOjE2ODM5MjkwMjgsImV4cCI6MTY4NDAxNTQyOCwic3ViIjoiNDUxM2MwZDktZDk5Ny00N2RiLThkZGItYmFiMzdjMjhjYWVhIn0.YCaNpDYTq01L9n77mCA1TWhZi4nuxSY1_ypchWLu1AY
    const [,token] = authToken.split(" ");

    try{
        // Validar se token é válido
        const { sub } = verify(token, "019cb62eafdeb0bd6415c038674d516c") as IPayload;

        // Recuperar informações do usuário
        request.user_id = sub;
        
        return next();
    }catch(err){
        return response.status(401).json({message: "token missing"});
    }   
}