import { createConnection, getManager} from "typeorm";
import {Order} from "../entity/order.entity";
import {faker } from "@faker-js/faker";
import {randomInt} from "crypto";
import {OrderItem} from "../entity/order-item.entity";

createConnection().then(async connection => {
    const orderRepository = getManager().getRepository(Order);
    const orderItemRespository = getManager().getRepository(OrderItem);

    for(let i=0; i<30; i++){
        const order = await orderRepository.save({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
        })
        for(let j = 0; j < randomInt(1,5); j++){
            await orderItemRespository.save({
                product_title: faker.commerce.productName(),
                price: randomInt(10, 100),
                quantity: randomInt(1, 5),
                order
            });
        }
    }

    process.exit(0);
})