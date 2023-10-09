import {Response, Request} from "express";
import {getManager} from "typeorm";
import {User} from "../entity/user.entity";
import bcryptjs from "bcryptjs";

export const Users = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User);
    const users = await repository.find({
        relations: ["role"]
    });

    res.send(users.map(u => {
        const {password, ...data} = u;
        return data;
    }));
}

export const CreateUser = async (req: Request, res: Response) => {
    const {role_id, ...body } = req.body;
    const hashPassword = await bcryptjs.hash(body.password, 10);
    const repository = getManager().getRepository(User);
    const {password, ...user} = await repository.save({
        ...body,
        password: hashPassword,
        role: {
            id: role_id
        }
    });
    res.status(201).send(user);
}

export const GetUser = async (req: Request, res: Response) => {
    try{
        const repository = getManager().getRepository(User);

        const {password, ...data} = await repository.findOne({
            where: {id: parseInt(req.params.id)},
            relations: ["role"]
        });

        res.status(200).send(data);
    }catch (e){
        return res.status(404).send({error:"user not found"});
    }
}

export const UpdateUser = async (req: Request, res: Response) => {
    try{
        const {role_id, ...body } = req.body;
        const respository = getManager().getRepository(User);
        await respository.update(req.params.id, {
            ...body,
            role: {
                id: role_id
            }
        });
        const {password, ...user} = await respository.findOne({
        where:{ id: parseInt(req.params.id)},
            relations: ["role"]
        })
        res.status(202).send(user);
    }catch (e){
        return res.status(404).send({error:"user not found"});
    }
}

export const DeleteUser = async (req: Request, res: Response) => {
    const respository = getManager().getRepository(User);
    await respository.delete(req.params.id);
    res.status(204).send({
        message: "user deleted"
    });
}