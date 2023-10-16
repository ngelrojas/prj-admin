import React, {useEffect, useState} from "react";
import axios from "axios";

const Nav = () => {
    const [user, setUser] = useState({
        first_name: "",
    });

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get("http://localhost:8000/api/user", {withCredentials: true});
                console.log(data[0].first_name)
                setUser(data[0]);
            }
        )();
    }, []);

    return(
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">RedNodes</a>

            <ul className="my-2 my-md-0 mr-md-3">
                <a className="p-2 text-white text-decoration-none" href="#">{user?.first_name}</a>
                <a className="p-2 text-white text-decoration-none" href="#">Sign Out</a>
            </ul>
        </nav>
        )

}

export default Nav;