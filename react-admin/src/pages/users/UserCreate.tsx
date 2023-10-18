import Wrapper from "../../components/Wrapper";
import {useEffect, useState} from "react";
import axios from "axios";

const UserCreate = () => {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role_id, setRoleId] = useState("");
    const [roles, setRoles] = useState([]);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('/roles');
                console.log(data);
                setRoles(data);
            }
        )()
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post('/users', {
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
                    <input type="text" className="form-control" onChange={e=> setFirstName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input type="text" className="form-control" onChange={e=> setLastName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" onChange={e=> setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <select className="form-control" onChange={e=> setRoleId(e.target.value)}>
                        {
                            roles.map((role: any) => {
                                return(
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button className="btn btn-outline-secondary">save</button>
            </form>
        </Wrapper>
    )
}
export default UserCreate;