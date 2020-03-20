import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';

function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    var onFormSubmit = (event) => {

        event.preventDefault();

        axios.post('https://api.gii.gl/auth/login', {
            username: username,
            password: password
        })
          .then((response) => {
            let token = response.data.token;
            localStorage.setItem('token', token);
            console.log(localStorage.getItem('token'));

            window.location.replace('/dashboard');
          })
          .catch(function (error) {
            
            console.log(error);
          });

    }

        return (
            <div className="login-form text-left col-md-4">
                <form onSubmit={onFormSubmit }>
                    <header className="title text-center"><strong>Log in</strong></header>  
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    
                    <button type="submit" className="btn btn-block btn-primary">Login</button>
                    <div className="create-account-link">Don't have an account? <a href='/'>Create your account</a> </div>
                </form>
            </div>
        );

}


export default LoginForm;