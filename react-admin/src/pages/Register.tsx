import React, {Component} from "react";
import '../Login.css';
import axios from "axios";
import {Link} from "react-router-dom";

class Register extends Component{
    first_name = "";
    last_name = "";
    email = "";
    password = "";
    password_confirm = "";
    state = {
        redirect: false
    }

    submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await axios.post('/register',{
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirm
        });

        if(response.status === 201){
            this.setState({
                redirect: true
            })
        }
    }


    render(){

        return(
            <main className="form-signin">
                <form onSubmit={this.submit}>

                        <h1 className="h3 mb-3 fw-normal">Please Register</h1>


                            <input  className="form-control" placeholder="First Name" required
                                onChange={e => this.first_name = e.target.value}
                            />
                            <input  className="form-control" placeholder="Last Name" required
                                onChange={e => this.last_name = e.target.value}
                            />
                            <input type="email" className="form-control" placeholder="Email" required
                                onChange={e => this.email = e.target.value}
                            />


                            <input type="password" className="form-control" placeholder="Password" required
                                onChange={e => this.password = e.target.value}
                            />
                            <input type="password" className="form-control" placeholder="Password Confirm" required
                                onChange={e => this.password_confirm = e.target.value}
                            />


                        <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>

                </form>
                {
                    this.state.redirect && <Link to={"/login"} >login</Link>
                }
            </main>
        )
    }
}
export default Register;