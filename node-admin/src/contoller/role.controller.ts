import { Request, Response } from "express";
import {getManager} from "typeorm";
import {Role} from "../entity/role.entity";

export const Roles = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Role);

    res.status(200).send(await repository.find());
}

export const CreateRole = async (req: Request, res: Response) => {
    const {name, permissions} = req.body;

    const repository = getManager().getRepository(Role);

    const role = await repository.save({
        name,
        permissions: permissions.map(id => ({id}))
    });

    res.status(201).send(role);
}

export const GetRole = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Role);


    res.status(200).send(await repository.findOne(
        {
            where: {id: parseInt(req.params.id)},
            relations: ["permissions"]
        })
    );
}

export const UpdateRole = async (req: Request, res: Response) => {
    const {name, permissions} = req.body;

    const repository = getManager().getRepository(Role);

    const role = await repository.save( {
        id: parseInt(req.params.id),
        name,
        permissions: permissions.map(id => ({id}))
    });

    res.status(202).send(role);
}

export const DeleteRole = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Role);

    await repository.delete(parseInt(req.params.id));

    res.status(204).send({message: "Role deleted successfully"});
}