import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {Permission} from "../../models/permission";
import {useParams} from "react-router-dom";

const RoleEdit = () => {
    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [name, setName] = useState("");
    const [redirect, setRedirect] = useState(false);
    const id = useParams<{ id: string }>().id;

    useEffect(() => {
        (
            async () => {
                const response = await axios.get('/permissions');
                setPermissions(response.data);

                const {data} = await axios.get(`/roles/${id}`);

                setName(data.name);
                setSelected(data.permissions.map((p: Permission) => p.id));
            }
        )()
    }, []);

    const checkPermission = (id: number) => {
        if(selected.some(s => s === id)){
            setSelected(selected.filter(s => s !== id));
            return;
        }
        setSelected([...selected, id]);
    }
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.put(`/roles/${id}`, {
            name,
            permissions: selected
        });
        setRedirect(true);
    }

    if(redirect){
        window.location.href = "/roles";
    }

    return(
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3 mt-3 row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control"
                               defaultValue={name}
                               onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Permissions</label>
                    <div className="col-sm-10">
                        {
                            permissions.map((p: Permission) => {
                                return(
                                    <div className="form-check" key={p.id}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={p.id}
                                            checked={selected.some(s => s === p.id)}
                                            onChange={(e) => checkPermission(parseInt(e.target.value))}
                                        />
                                        <label className="form-check-label">{p.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <button className="btn btn-outline-secondary">Save</button>

            </form>
        </Wrapper>
    )
}

export default RoleEdit;