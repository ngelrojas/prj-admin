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
            </Routes>

        </BrowserRouter>
        </div>
  );
}

export default App;
