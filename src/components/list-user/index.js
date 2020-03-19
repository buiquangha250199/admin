import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';

var ListUser = () => {
    const DEFAULT_PAGE = 0;
    const DEFAULT_NUMBER = 5;

    const [userList, setUserList] = useState([]);  
    const [page, setPage] = useState(DEFAULT_PAGE);
    const [num, setNum] = useState(DEFAULT_NUMBER); 

    let previousClickEvent = () => {
        if(page > 0) setPage(page - 1);
        else setPage(0);
    }
    
    useEffect(() => {

        axios.get('https://api.gii.gl/api/admin/users', {
        params: {
            page: page,
            limit: num
        }, 
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyOCIsImV4cCI6MTU4NDYwMjQ2NSwiaWF0IjoxNTg0NTg0NDY1fQ.BNZuAAUm3KmiCeBvIWvg6ugYGcwuk9kDu4qgDSImu5yNGWqGmmGS5XOQZRaeNfZrFe8rUV2-yY1udKxHrGz1-A'
        }
        }).then(function (response) {
            setUserList(response.data.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    
    }, [page, num]);    

    console.log(userList);

    return (

        <div>
            <table className="table table-hover table-sm">
            <thead>
                <tr className="table-info">
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Default Campaign</th>
                </tr>
            </thead>
            <tbody>
                {
                    userList.map((user, index) => {
                        return (
                            <tr key={index}>    
                                <td>{user.id}</td>
                                <td className="email">{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.defaultCampaign}</td>
                            </tr>
                            )
                    })
                }
                
            </tbody>
        </table>

        <div className='control-table row'>
            <div className='col-md-6'>
                <div className="input-group mb-3">
                    <div className="input-group-prepend" >
                        <button className="btn btn-outline-primary" type="button" onClick={() => previousClickEvent()}>Previous</button>
                        <button className="btn btn-outline-primary" type="button" onClick={() => setPage(page+1)}>Next</button>
                    </div>
                    <div className="input-group-prepend">
                        <span className="input-group-text" >Page Number</span>
                    </div>
                    <input type="number" min='0' className="form-control" value={page} placeholder="0" onChange={ e => setPage(e.target.value)}/>
                    {console.log(page)}
                </div>
            </div>

            <div className='col-md-4 offset-md-2'>
            <div className="input-group mb-3">
                <input type="number" min='0' className="form-control user-per-page" value={num} onChange={(e) => setNum(e.target.value)} placeholder=" User per page"  />
                <div className="input-group-append">
                    <span className="input-group-text">User per page</span>
                </div>
                </div>
            </div>
        </div>

                
        

    </div>
    );

}


export default ListUser;