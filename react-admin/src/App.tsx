import React from 'react';
import './App.css';
import Dashboard from "./pages/Dashboard";
import Users from "./pages/users/Users";
import Roles from "./pages/roles/Roles";
import UserCreate from "./pages/users/UserCreate";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserEdit from "./pages/users/UserEdit";


function App() {

    return (
        <div className="App">
        <BrowserRouter basename="/">
            <Routes>
                <Route path={"/"} element={<Dashboard />} />
                <Route path={"/users"} element={<Users />} />
                <Route path={"/roles"} element={<Roles />} />
                <Route path={"/users/create"} element={<UserCreate />} />
                <Route path={"/users/:id/edit"} element={<UserEdit />} />
                <Route path={"/register"} element={<Register />} />
                <Route path={"/login"} element={<Login />} />
            </Routes>

        </BrowserRouter>
        </div>
  );
}

export default App;
