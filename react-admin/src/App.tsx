import React from 'react';
import './App.css';
import Nav from "./components/Nav";
import Menu from "./components/Menu";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/Register";


function App() {

    return (
        <div className="App">
        <BrowserRouter basename="/">
            <Routes>
                <Route path={"/"} element={<Dashboard />} />
                <Route path={"/users"} element={<Users />} />
                <Route path={"/register"} element={<Register />} />
            </Routes>

        </BrowserRouter>
        </div>
  );
}

export default App;
