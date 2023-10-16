import React, {useState, useEffect} from "react";
import axios from "axios";

function Login (){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await axios.post('/login',{
            email,
            password
        });

        if(response.status === 200){
            setRedirect(true);
        }
    }

    useEffect(() => {
        if(redirect){
            window.location.href = "/";
        }
    }, [redirect]);


    return (
        <main className="form-signin">
            <form onSubmit={submit}>

                <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>

                <input type="email" className="form-control" placeholder="Email" required
                       onChange={e => setEmail(e.target.value) }
                />

                <input type="password" className="form-control" placeholder="Password" required
                       onChange={e => setPassword(e.target.value)}
                />


                <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button>

            </form>
        </main>
    )
}

export default Login;