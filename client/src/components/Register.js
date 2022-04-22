import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";

export const Register = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    })

    const {email, password, name} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = {email, password, name};
            const response = await fetch("http://localhost:5000/auth/register", {
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
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" className="form-control my-3" name="email" placeholder="email" value={email} onChange={e=>onChange(e)} />
                <input type="password" className="form-control my-3" name="password" placeholder="password" value={password} onChange={e=>onChange(e)} />
                <input type="text" className="form-control my-3" name="name" placeholder="name" value={name} onChange={e=>onChange(e)} />
                <button className="btn btn-success btn-block">Submit</button>
                <Link to="/login">Login</Link>
            </form>
        </Fragment>
    );
};