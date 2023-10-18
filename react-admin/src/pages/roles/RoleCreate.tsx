import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {Permission} from "../../models/permission";

const RoleCreate = () => {
    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [name, setName] = useState("New Role");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('/permissions');
                setPermissions(data);
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
        await axios.post('/roles', {
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
                        <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} />
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
                                            onChange={(e)=> checkPermission(parseInt(e.target.value))}
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

export default RoleCreate;