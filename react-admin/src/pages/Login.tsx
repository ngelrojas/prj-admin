import React, {Component} from "react";

class Login extends Component {
    email = "";
    password = "";

    submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email: this.email,
                password: this.password
            })
        });
        console.log(response.status);

    }
    render(){

        return(
            <main className="form-signin">
                <form onSubmit={this.submit}>

                    <h1 className="h3 mb-3 fw-normal">Please Login</h1>

                    <input type="email" className="form-control" placeholder="Email" required
                           onChange={e => this.email = e.target.value}
                    />


                    <input type="password" className="form-control" placeholder="Password" required
                           onChange={e => this.password = e.target.value}
                    />


                    <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button>

                </form>

            </main>
        )
    }
}

export default Login;