import {Router} from "express";
import {AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword} from "./contoller/auth.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {CreateUser, DeleteUser, GetUser, UpdateUser, Users} from "./contoller/user.controller";
import { Permissions } from "./contoller/permission.controller";
import {CreateRole, DeleteRole, GetRole, Roles, UpdateRole} from "./contoller/role.controller";

export const routes = (router: Router) => {
    router.post("/api/register", Register);
    router.post("/api/login", Login);
    router.get("/api/user", AuthMiddleware, AuthenticatedUser);
    router.post("/api/logout", AuthMiddleware, Logout);
    router.put("/api/user/info", AuthMiddleware, UpdateInfo);
    router.put("/api/user/password", AuthMiddleware, UpdatePassword);

    router.get("/api/users", AuthMiddleware, Users);
    router.post("/api/users", AuthMiddleware, CreateUser);
    router.get("/api/users/:id", AuthMiddleware, GetUser);
    router.put("/api/users/:id", AuthMiddleware, UpdateUser);
    router.delete("/api/users/:id", AuthMiddleware, DeleteUser);

    router.get("/api/permissions", AuthMiddleware, Permissions);

    router.get("/api/roles", AuthMiddleware, Roles);
    router.post("/api/roles", AuthMiddleware, CreateRole);
    router.get("/api/roles/:id", AuthMiddleware, GetRole);
    router.put("/api/roles/:id", AuthMiddleware, UpdateRole);
    router.delete("/api/roles/:id", AuthMiddleware, DeleteRole);
};