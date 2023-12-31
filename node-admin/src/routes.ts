import express, {Router} from "express";
import {AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword} from "./contoller/auth.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {CreateUser, DeleteUser, GetUser, UpdateUser, Users} from "./contoller/user.controller";
import { Permissions } from "./contoller/permission.controller";
import {CreateRole, DeleteRole, GetRole, Roles, UpdateRole} from "./contoller/role.controller";

import {CreateProduct, DeleteProduct, GetProduct, Products, UpdateProduct} from "./contoller/product.controller";
import {UploadImg} from "./contoller/image.controller";
import {Chart, Export, Orders} from "./contoller/order.controller";
import {PermissionMiddleware} from "./middleware/permission.middleware";

export const routes = (router: Router) => {
    router.post("/api/register", Register);
    router.post("/api/login", Login);
    router.get("/api/user", AuthMiddleware, AuthenticatedUser);
    router.post("/api/logout", AuthMiddleware, Logout);
    router.put("/api/user/info", AuthMiddleware, UpdateInfo);
    router.put("/api/user/password", AuthMiddleware, UpdatePassword);

    router.get("/api/users", AuthMiddleware, PermissionMiddleware("users"), Users);
    router.post("/api/users", AuthMiddleware, PermissionMiddleware("users"), CreateUser);
    router.get("/api/users/:id", AuthMiddleware, PermissionMiddleware("users"), GetUser);
    router.put("/api/users/:id", AuthMiddleware, PermissionMiddleware("users"), UpdateUser);
    router.delete("/api/users/:id", AuthMiddleware, PermissionMiddleware("users"), DeleteUser);

    router.get("/api/permissions", AuthMiddleware, Permissions);

    router.get("/api/roles", AuthMiddleware, Roles);
    router.post("/api/roles", AuthMiddleware, CreateRole);
    router.get("/api/roles/:id", AuthMiddleware, GetRole);
    router.put("/api/roles/:id", AuthMiddleware, UpdateRole);
    router.delete("/api/roles/:id", AuthMiddleware, DeleteRole);

    router.get("/api/products", AuthMiddleware, PermissionMiddleware("products"), Products);
    router.post("/api/products", AuthMiddleware, PermissionMiddleware("products"), CreateProduct);
    router.get("/api/products/:id", AuthMiddleware, PermissionMiddleware("products"), GetProduct);
    router.put("/api/products/:id", AuthMiddleware, PermissionMiddleware("products"), UpdateProduct);
    router.delete("/api/products/:id", AuthMiddleware, PermissionMiddleware("products"), DeleteProduct);

    router.post("/api/upload", AuthMiddleware, UploadImg);
    router.use("/api/uploads", express.static("uploads"));

    router.get("/api/orders", AuthMiddleware, Orders);
    router.post("/api/export", AuthMiddleware, Export);
    router.get("/api/chart", AuthMiddleware, Chart);

};
