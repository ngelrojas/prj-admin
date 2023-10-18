import Wrapper from "../../components/Wrapper";
import {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const UserEdit = () => {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role_id, setRoleId] = useState("");
    const [roles, setRoles] = useState([]);
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        (
            async () => {
                const response = await axios.get('/roles');
                console.log(response);
                setRoles(response.data);

                const {data} = await axios.get(`/users/${id}`);
                
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setEmail(data.email);
                setRoleId(data.role.id);
            }
        )()
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.put(`/users/${id}`, {
            first_name,
            last_name,
            email,
            role_id
        });
        setRedirect(true);
    }

    if(redirect){
        window.location.href = "/users";
    }

    return(
        <Wrapper>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input type="text" className="form-control"
                           defaultValue={first_name}
                           onChange={e=> setFirstName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input type="text" className="form-control"
                           defaultValue={last_name}
                           onChange={e=> setLastName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control"
                           defaultValue={email}
                           onChange={e=> setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <select className="form-control"
                            value={role_id}
                            onChange={e=> setRoleId(e.target.value)}>
                        {
                            roles.map((role: any) => {
                                console.log(role.id, role_id)
                                    if(role.id === role_id){
                                        return(
                                            <option key={role.id} value={role.id}>{role.name}</option>
                                        )
                                    }else{
                                        return(
                                            <option key={role.id} value={role.id}>{role.name}</option>
                                        )
                                    }
                            })
                        }
                    </select>
                </div>
                {/*<div className="mb-3">*/}
                {/*    <label>Password</label>*/}
                {/*    <input type="password" className="form-control"*/}

                {/*           onChange={e=> setPassword(e.target.value)} />*/}
                {/*</div>*/}
                <button className="btn btn-outline-secondary">save</button>
            </form>
        </Wrapper>
    )
}
export default UserEdit;