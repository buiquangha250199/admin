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


        <div className="list-record">
            <div className="title">
                <h2>List Record</h2>
                <p>Total: {totalRecord}</p>
            </div>
            
            <table className="table table-hover table-sm">
            <thead>
                <tr className="table-info">
                    <th scope="col-2">Short link</th>
                    <th scope="col-4">Title</th>
                    <th scope="col-4">Description</th>
                    <th scope="col-2">Campaign</th>
                </tr>
            </thead>
            <tbody>
                {
                    recordList.map((record, index) => {
                        return (
                            <tr key={index}>    
                                <td >{record.shortLink}</td>
                                <td >{record.title}</td>
                                <td>{record.description}</td>
                                <td>{record.campaign}</td>
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
                    <input type="number" min='0' className="form-control input-number" value={page} placeholder="0" onChange={ e => setPage(e.target.value)}/>
                    {console.log(page)}
                </div>
            </div>

            <div className='col-md-4 offset-md-2'>
            <div className="input-group mb-3">
                <input type="number" min='0' className="form-control user-per-page" value={num} onChange={(e) => setNum(e.target.value)} placeholder=" User per page"  />
                <div className="input-group-append">
                    <span className="input-group-text">Record per page</span>
                </div>
                </div>
            </div>
        </div>

                
        

    </div>
    );

}


export default ListRecord;