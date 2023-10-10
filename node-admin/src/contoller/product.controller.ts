import {Response, Request} from "express";
import {getManager} from "typeorm";
import {Product} from "../entity/product.entity";

export const Products = async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string) || 1;

    const repository = getManager().getRepository(Product);

    const [data, total] = await repository.findAndCount({
        take,
        skip: (page - 1) * take
    });

    res.send({
        data,
        meta: {
            total,
            page,
            last_page: Math.ceil(total / take)
        }
    });
}

export const CreateProduct = async (req: Request, res: Response) => {

    const repository = getManager().getRepository(Product);
    const product = await repository.save(req.body);
    res.status(201).send(product);
}

export const GetProduct = async (req: Request, res: Response) => {
    try{
        const repository = getManager().getRepository(Product);
        res.status(200).send(await repository.findOneBy({id: parseInt(req.params.id)}));
    }catch (e){
        return res.status(404).send({error:"product not found"});
    }
}

export const UpdateProduct = async (req: Request, res: Response) => {
    try{
        const {role_id, ...body } = req.body;
        const repository = getManager().getRepository(Product);
        await repository.update(req.params.id, req.body);

        res.status(202).send(await repository.findOneBy({id: parseInt(req.params.id)}));
    }catch (e){
        return res.status(404).send({error:"product not found"});
    }
}

export const DeleteProduct = async (req: Request, res: Response) => {
    const respository = getManager().getRepository(Product);
    await respository.delete(req.params.id);
    res.status(204).send({
        message: "product deleted"
    });
}