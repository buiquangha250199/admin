import React, { useContext, useState, useEffect } from 'react';
import './style.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../AppContext';

function LoginForm(props) {

    const {setLoading} = useContext(AppContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    var onFormSubmit = (event) => {

        event.preventDefault();
        setLoading(true);

        axios.post('https://api.gii.gl/auth/login', {
            username: username,
            password: password
        })
          .then((response) => {
            let token = response.data.token;
            localStorage.setItem('token', token);
            console.log(localStorage.getItem('token'));

            props.history.push('/dashboard');
    
            return response.data.data;

            
          })
          .catch(function (error) {
            
            console.log(error);
          })
          .then(function () {
            setLoading(false);
          });
    }

        return (
            <div className="login">
                <div className="login-form w-full max-w-xs text-left">
                    <form className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4" onSubmit={onFormSubmit}>
                    <h3 className='text-blue-700 font-bold mb-2 text-center tracking-wider'>LOGIN</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Email address
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="username" type="email" placeholder="Enter email" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                id="password" type="password" placeholder="************" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="flex justify-center">
                            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Sign In
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                        ©2020 Giigle. All rights reserved.
                    </p>
                    </div>

            </div>
        );

}


export default withRouter(LoginForm);