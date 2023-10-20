import React, {useEffect, useState} from "react";
import Wrapper from "../components/Wrapper";
import axios from "axios";

const Profile = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('/user');
                console.log(data)
                setFirstName(data[0].first_name);
                setLastName(data[0].last_name);
                setEmail(data[0].email);
            }
        )()
    }, []);

    const infoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.put('/user/info', {
            first_name,
            last_name,
            email
        });
    }

    const passwordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.put('/user/password', {
            password,
            password_confirm
        });
    }
    return(
        <Wrapper>
            <h3>Account Information</h3>
            <form onSubmit={infoSubmit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input type="text" className="form-control"
                        defaultValue={first_name}
                        onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input type="text" className="form-control"
                        defaultValue={last_name}
                           onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control"
                        defaultValue={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
            <h3>Change Password</h3>
            <form onSubmit={passwordSubmit}>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control"
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label>Password Confirm</label>
                    <input type="password" className="form-control"
                           onChange={(e) => setPasswordConfirm(e.target.value)}/>
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    )
}

export default Profile;