import {Request, Response} from "express";
import {verify} from "jsonwebtoken";
import {getManager} from "typeorm";
import {User} from "../entity/user.entity";

export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {
    try{
        const jwt = req.cookies['jwt'];
        const payload:any = verify(jwt, process.env.SECRET_KEY);

        if(!payload){
            return res.status(401).send({
                message: 'Unauthenticated'
            })
        }
        const respository = getManager().getRepository(User);

        req["user"] = await respository.findOneBy(payload.id);

        next();
    }catch (e){
        return res.status(401).send({error:"Unauthorized"});
    }
}