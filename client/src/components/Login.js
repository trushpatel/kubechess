import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";

export const Login = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    };

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = {email, password};
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();
            localStorage.setItem("token", parseRes.token);
            setAuth(true);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center my-5">Welcome to KubeChess!</h1>
            <h2 className="text-center my-5">Login</h2>
            <form onSubmit={onSubmitForm}>
                <input className="form-control my-3" type="email" name="email" placeholder="email" value={email} onChange={e => onChange(e)} />
                <input className="form-control my-3" type="password" name="password" placeholder="password" value={password} onChange={e => onChange(e)} />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/register">Register</Link>
        </Fragment>
    );
};