import { createConnection, getManager} from "typeorm";
import {Product} from "../entity/product.entity";
import {faker } from "@faker-js/faker";

createConnection().then(async connection => {
    const repository = getManager().getRepository(Product);
    for(let i=0; i<30; i++){
        await repository.save({
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            image: faker.image.imageUrl(),
            price: Math.floor(Math.random() * 1000)
        });
    }
})