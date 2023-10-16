import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Nav = () => {
    const [user, setUser] = useState({
        first_name: "",
    });

    const logout = async () => {
        await axios.post("/logout");
    };

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get("/user");

                setUser(data[0]);
            }
        )();
    }, []);

    return(
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">RedNodes</a>

            <ul className="my-2 my-md-0 mr-md-3">
                <Link to="/profile" className="p-2 text-white text-decoration-none">{user?.first_name}</Link>
                <Link to="/login" className="p-2 text-white text-decoration-none" onClick={logout}>Sign Out</Link>
            </ul>
        </nav>
        )

}

export default Nav;