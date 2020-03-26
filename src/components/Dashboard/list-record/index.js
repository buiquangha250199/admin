import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';

var ListRecord = () => {
    const DEFAULT_PAGE = 0;
    const DEFAULT_NUMBER = 5;

    const [recordList, setRecordList] = useState([]); 
    const [totalRecord, setTotalRecord] = useState(0); 
    const [page, setPage] = useState(DEFAULT_PAGE);
    const [num, setNum] = useState(DEFAULT_NUMBER); 
    const TOKEN = localStorage.getItem('token');

    let previousClickEvent = () => {
        if(page > 0) setPage(page - 1);
        else setPage(0);
    }
    
    useEffect(() => {

        axios.get('https://api.gii.gl/api/admin/records', {
        params: {
            page: page,
            limit: num
        }, 
        headers: {
            Authorization: 'Bearer ' + TOKEN
        }
        }).then(function (response) {
            setRecordList(response.data.data);
            setTotalRecord(response.data.total);
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
        <h5 className="font-bold uppercase text-gray-600">Records</h5>
    </div>
    <div className="p-5">
        <table className="w-full p-5 text-gray-700">
            <thead>
                <tr>
                    <th className="text-left text-blue-900">Short Link</th>
                    <th className="text-left text-blue-900">Title</th>
                    <th className="text-left text-blue-900">Description</th>
                    <th className="text-left text-blue-900">Campaign</th>
                </tr>
            </thead>

            <tbody>
            {
                  recordList.map((record, index) => {
                    return (
                        <tr key={index}>    
                            <td className='border-b px-4 py-2 border-gray-400'>{record.shortLink}</td>
                            <td className='border-b px-4 py-2 border-gray-400'>{record.title}</td>
                            <td className='border-b px-4 py-2 border-gray-400'>{record.description}</td>
                            <td className='border-b px-4 py-2 border-gray-400'>{record.campaign}</td>
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


export default ListRecord;