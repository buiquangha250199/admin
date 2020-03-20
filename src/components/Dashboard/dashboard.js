import React from 'react';
import ListUser from './list-user';
import ListRecord from './list-record';

var Dashboard = () => {

    let handleClick = () => {
        localStorage.removeItem('token');
        console.log(localStorage.getItem('token'));

        window.location.replace('/login');
    }


    return (
        <div>
            <button className="btn btn-primary" onClick={() => handleClick()}>Log out</button>
            <ListUser />
            <ListRecord />
        </div>
    );
}

export default Dashboard;

