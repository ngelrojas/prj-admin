import {createConnection, getManager} from "typeorm";

createConnection().then(async connection => {
    const premissionRepository = connection.getRepository("Permission");

    const perm =[
        'view_users', 'edit_users',
        'view_roles', 'edit_roles',
        'view_products', 'edit_products',
        'view_orders', 'edit_orders'
    ];

    let permissions = [];

    for (let i = 0; i < perm.length; i++) {
        permissions.push(
            await premissionRepository.save({
                name: perm[i]
            })
        );
    }
    const roleRepository = getManager().getRepository("Role");

    await roleRepository.save({
        name: "admin",
        permissions
    });

    delete permissions[3];

    await roleRepository.save({
        name: "Editor",
        permissions
    });

    delete permissions[1];
    delete permissions[5];
    delete permissions[7];


    await roleRepository.save({
        name: "Viewer",
        permissions
    });

    process.exit(0);
});