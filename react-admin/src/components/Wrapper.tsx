import React, {ReactNode, useEffect, useState} from "react";
import Nav from "./Nav";
import Menu from "./Menu";
import axios from "axios";

interface WrapperProps{
    children: ReactNode
}

const Wrapper = (props: WrapperProps) => {

    useEffect(() => {
        (
            async () => {
                try{
                    const {data} = await axios.get("/user");
                }catch(e){
                    window.location.href = "/login";
                }

            }
        )();
    }, []);

    return(
        <>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <Menu />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Wrapper;