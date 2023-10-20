import React, {Dispatch, ReactNode, useEffect, useState} from "react";
import Nav from "./Nav";
import Menu from "./Menu";
import axios from "axios";
import { connect } from "react-redux";
import {User} from "../models/user";
import {setUser} from "../redux/actions/setUserAction";

interface WrapperProps{
    children: ReactNode
    setUser(user: User): void;
}

const Wrapper = (props: WrapperProps) => {

    useEffect(() => {
        (
            async () => {
                try{
                    const {data} = await axios.get("/user");

                    props.setUser(
                        new User(
                            data[0].id,
                            data[0].first_name,
                            data[0].last_name,
                            data[0].email,
                            data[0].role
                        )
                    );
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

const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);