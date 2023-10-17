import Wrapper from "../../components/Wrapper";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {User} from "../../models/user";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('/users');
                console.log(data.data);
                setUsers(data.data)
            }
        )()
    }, []);
    return(
        <Wrapper>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user: User) => {
                            return(
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role?.name}</td>
                                    <td></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </Wrapper>
    )
}

export default Users;