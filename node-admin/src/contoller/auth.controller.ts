import {Request, Response} from "express";
import {RegisterValidation} from "../validation/register.validation";
import {getManager} from "typeorm";
import {User} from "../entity/user.entity";
import bcryptjs from "bcryptjs";
import {sign} from "jsonwebtoken";
import {verify} from "jsonwebtoken";

export const Register = async (req:Request, res: Response) => {
    const body = req.body;
    const {error} = RegisterValidation.validate(body);
    if(error){
        return res.status(400).send(error.details);
    }

    const respository = getManager().getRepository(User);

    const {password, ...user} = await respository.save({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: await bcryptjs.hash(body.password, 10)
    });

    res.send(user);
}

export const Login = async (req:Request, res: Response) => {
    const repository = getManager().getRepository(User);
    const user = await repository.findOneBy({
        email: req.body.email
    });

    if(!user){
        return res.status(400).send({error:"Invalid credentials"});
    }

    if(!await bcryptjs.compare(req.body.password, user.password)){
        return res.status(400).send({error:"Invalid credentials"});
    }


    const token = sign({
        id: user.id
    }, "secret");

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    // const {password, ...data} = user

    res.send({
        message: "success",
    });
}

export const AuthenticatedUser = async (req:Request, res: Response) => {
    try{
        const token = req.cookies['jwt'];
        const payload:any = verify(token, "secret");

        if(!payload){
            return res.status(401).send({error:"Unauthorized"});
        }

        const repository = getManager().getRepository(User);

        const {password, ...user} = await repository.findOneBy(payload.id)

        res.send(user);
    }catch(e){

        return res.status(401).send({error:"Unauthorized"});
    }
}

export const Logout = async (req:Request, res: Response) => {
    res.cookie('jwt', '', {maxAge: 0});
    res.send({
        message: "success"
    })
}