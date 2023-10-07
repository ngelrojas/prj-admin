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
    }, process.env.SECRET_KEY);

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
    const {password, ...user} = req["user"];
    res.send(user);
}

export const Logout = async (req:Request, res: Response) => {
    res.cookie('jwt', '', {maxAge: 0});
    res.send({
        message: "success"
    })
}

export const UpdateInfo = async (req:Request, res: Response) => {
    const user = req["user"];
    const repository = getManager().getRepository(User);
    await repository.update(user.id, req.body);
    const {password, ...data} = await repository.findOneBy(user.id);
    res.send(data);
}

export const UpdatePassword = async (req:Request, res: Response) => {
    const user = req["user"];
    if(req.body.passoword !== req.body.password_confirmation){
        return res.status(400).send({error:"Password confirmation does not match"});
    }

    const repository = getManager().getRepository(User);
    await repository.update(user.id, {
        password: await bcryptjs.hash(req.body.password, 10)
    })

    res.send({
        message: "password updated."
    });
}