import React from 'react';
import './App.css';
import Dashboard from "./pages/Dashboard";
import Users from "./pages/users/Users";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";


function App() {

    return (
        <div className="App">
        <BrowserRouter basename="/">
            <Routes>
                <Route path={"/"} element={<Dashboard />} />
                <Route path={"/users"} element={<Users />} />
                <Route path={"/register"} element={<Register />} />
                <Route path={"/login"} element={<Login />} />
            </Routes>

        </BrowserRouter>
        </div>
  );
}

export default App;
