import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';

var ListUser = () => {
    const DEFAULT_PAGE = 0;
    const DEFAULT_NUMBER = 5;

    const [userList, setUserList] = useState([]);  
    const [page, setPage] = useState(DEFAULT_PAGE);
    const [num, setNum] = useState(DEFAULT_NUMBER);
    const [activate, setActivate] = useState(true);
    const TOKEN = localStorage.getItem('token');

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
            Authorization: 'Bearer ' + TOKEN
        }
        }).then(function (response) {
            setUserList(response.data.data);
            console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    
    }, [page, num, TOKEN]);    

    return (
    <div className="bg-white border-transparent rounded-lg shadow-lg">
    <div className="bg-gray-400 border-b-2 border-gray-500 rounded-tl-lg rounded-tr-lg p-2">
        <h5 className="font-bold uppercase text-gray-600">Users</h5>
    </div>
    <div className="">
        <table className="w-full text-gray-700 table-fixed">
            <thead className='border-b'>
                <tr>
                    <th className="px-4 py-2 text-left text-blue-900">Username</th>
                    <th className="px-4 py-2 text-left text-blue-900">Email</th>
                    <th className="px-4 py-2 text-left text-blue-900">Total record</th>
                    <th className="px-4 py-2 text-left text-blue-900"></th>
                </tr>
            </thead>

            <tbody>
            {
                 userList.map((user, index) => {
                    return (
                        <tr key={index} className="hover:bg-orange-100">    
                            <td className="px-4 py-2 border-gray-400 w-full">{user.username}</td>
                            <td className="px-4 py-2 border-gray-400 w-full">{user.email}</td>
                            <td className="px-4 py-2 border-gray-400 w-full">null</td>
                            <td className="px-4 py-2 border-gray-400 w-full text-center">
                                <button type="button" className="btn-width mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline opacity-50 cursor-not-allowed" disabled>Activate</button>
                                <button type="button" className="btn-width text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Deactivate</button>
                            </td>
                        </tr>
                        )
                })
            }
            </tbody>
        </table>

        <div className="inline-flex my-5 w-full justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l border-r"
                        onClick={() => previousClickEvent()}>
                    Prev
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r border-l"
                        onClick={() => setPage( Number(page)+1 )}>
                    Next
                </button>
                <input type='number' className='border w-20 bg-grey-300 hover:bg-gray-400 px-2 mr-2 ml-2 text-sm' placeholder='Page Number' 
                       min='0' value={page} onChange={ e => setPage(e.target.value)} />
                <input type='number' className='border w-20 bg-grey-300 hover:bg-gray-400 px-2 mr-2 text-sm' placeholder='User' 
                       min='0' onChange={(e) => setNum(e.target.value)}/>
            </div>

    </div>
</div>



        




    );

}


export default ListUser;