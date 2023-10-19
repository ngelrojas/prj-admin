import React from 'react';
import './App.css';
import Dashboard from "./pages/Dashboard";
import Users from "./pages/users/Users";
import Roles from "./pages/roles/Roles";
import Products from "./pages/products/Products";

import UserCreate from "./pages/users/UserCreate";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserEdit from "./pages/users/UserEdit";
import RoleCreate from "./pages/roles/RoleCreate";
import RoleEdit from "./pages/roles/RoleEdit";
import ProductCreate from "./pages/products/ProductCreate";
import ProductEdit from "./pages/products/ProductEdit";
import Orders from "./pages/orders/Orders";


function App() {

    return (
        <div className="App">
        <BrowserRouter basename="/">
            <Routes>
                <Route path={"/"} element={<Dashboard />} />
                <Route path={"/register"} element={<Register />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/users"} element={<Users />} />
                <Route path={"/users/create"} element={<UserCreate />} />
                <Route path={"/users/:id/edit"} element={<UserEdit />} />
                <Route path={"/roles"} element={<Roles />} />
                <Route path={"/roles/create"} element={<RoleCreate />} />
                <Route path={"/roles/:id/edit"} element={<RoleEdit />} />
                <Route path={"/products"} element={<Products />} />
                <Route path={"/products/create"} element={<ProductCreate />} />
                <Route path={"/products/:id/edit"} element={<ProductEdit />} />
                <Route path={"/orders"} element={<Orders />} />
            </Routes>

        </BrowserRouter>
        </div>
  );
}

export default App;
