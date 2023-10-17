import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {User} from "../models/user";

const Nav = () => {
    const [user, setUser] = useState(new User());

    const logout = async () => {
        await axios.post("/logout");
    };

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get("/user");

                setUser(new User(
                    data[0].id,
                    data[0].first_name,
                    data[0].last_name,
                    data[0].email,
                    data[0].role
                ));
            }
        )();
    }, []);

    return(
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">RedNodes</a>

            <ul className="my-2 my-md-0 mr-md-3">
                <Link to="/profile" className="p-2 text-white text-decoration-none">{user.fullName}</Link>
                <Link to="/login" className="p-2 text-white text-decoration-none" onClick={logout}>Sign Out</Link>
            </ul>
        </nav>
        )

}

export default Nav;