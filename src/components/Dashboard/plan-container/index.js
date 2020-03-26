import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import axios from 'axios';
import AppContext from '../../AppContext';

var PlanContainer = (props) => {

    const {setLoading} = useContext(AppContext);
    console.log(setLoading);

    const [planList, setPlanList] = useState({}); 
    const [planArr, setPlanArr] = useState([]);

    const [newPlanName, setNewPlanName] = useState('');
    const [newT1, setNewT1] = useState(0);
    const [newT2, setNewT2] = useState(0);

    const [prePlanName, setPrePlanName] = useState('');
    const [editPlanName, setEditPlanName]= useState('');
    const [editT1, setEditT1] = useState(0);
    const [editT2, setEditT2] = useState(0);
    
    const TOKEN = localStorage.getItem('token');

    var handleCreateNewPlan = (event) => {
        event.preventDefault();

        //setLoading(true);
        let temp = planList;

        temp[newPlanName] = {T1: Number(newT1), T2: Number(newT2)};

        let pl = {};
        pl.plans = temp;

        axios.post('https://api.gii.gl/api/admin/plan/setting', pl, {
            headers: {
                Authorization: 'Bearer ' + TOKEN
            }
            }).then(function (response) {
                if(response.data) window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                setLoading(false);
            })
        
        console.log(pl);
         
    } 

    var handleEditPlan = (namePlan) => {
        
        setPrePlanName(namePlan);
        setEditPlanName(namePlan);
        setEditT1(planList[namePlan].T1);
        setEditT2(planList[namePlan].T2);
    }

    var handleEditPlanOnSubmit = (event) => {
        event.preventDefault();

        //setLoading(true);
        let temp = planList;

        temp[prePlanName] = {T1: Number(editT1), T2: Number(editT2)};

        let pl = {};
        pl.plans = temp;

        axios.put('https://api.gii.gl/api/admin/plan/setting/update', pl, {
            headers: {
                Authorization: 'Bearer ' + TOKEN
            }
            }).then(function (response) {
                if(response.data) window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function(){
                setLoading(false);
            })
        
        console.log(pl);
    }
    
    useEffect(() => {

        axios.get('https://api.gii.gl/api/admin/plan/list', {
        headers: {
            Authorization: 'Bearer ' + TOKEN
        }
        }).then(function (response) {

            console.log(response.data);
            setPlanList(response.data.plans);
            setPlanArr(Object.entries(response.data.plans));

            //console.log(Object.entries(response.data.plans));
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    
    }, [TOKEN]); 


    return (

        <div className='flex flex-row flex-wrap flex-grow mt-2 justify-center'>

            <div className="w-full p-2 mb-10">
            <div className="bg-white border-transparent rounded-lg shadow-lg">
                <div className="bg-gray-400 border-b-2 border-gray-500 rounded-tl-lg rounded-tr-lg p-2">
                <h5 className="font-bold uppercase text-gray-600">Plans</h5>
                </div>
                <div className="p-5">
                <table className="w-full p-5 text-gray-700">
                    <thead>
                    <tr>
                        <th className="text-left text-blue-900">Name</th>
                        <th className="text-left text-blue-900">T1</th>
                        <th className="text-left text-blue-900">T2</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            planArr.map((plan, index) => {
                                return (
                                    <tr key={index}>    
                                        <td className='border-b py-2 border-gray-400'>{plan[0]}</td>
                                        <td className='border-b py-2 border-gray-400'>{plan[1].T1}</td>
                                        <td className='border-b py-2 border-gray-400'>{plan[1].T2}</td>
                                    </tr>
                                    )
                            })
                        }
                    </tbody>
                </table>
                
                </div>
            </div>
            </div>

            <div className="w-full md:w-1/2 xl:w-2/5 p-3 bg-green-200 rounded-lg px-2 mx-3 my-5">
                <h3 className='text-blue-600 text-xl font-bold text-center py-2'>New Plan</h3>
            <form className="w-full max-w-lg" onSubmit={handleCreateNewPlan}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Plan Name
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                     type="text" placeholder="Input name" onChange={(e) => setNewPlanName(e.target.value)} required/>
                    <p className="text-gray-600 text-xs italic">Create new plan and set your T1 and T2.</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                        T1
                    </label>
                    <input required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" 
                    type="number" onChange={(e) => setNewT1(e.target.value)} placeholder=" Your T1" />
                    </div>
                    
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                        T2
                    </label>
                    <input required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                     type="number" placeholder=' Your T2' onChange={(e) => setNewT2(e.target.value)}/>
                    </div>
                </div>
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 my-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Submit
                </button>
                </form>

            </div>

            <div className="w-full md:w-1/2 xl:w-2/5 p-3 px-2 bg-purple-200 rounded-lg mx-3 my-5">
                <h3 className='text-yellow-600 text-xl font-bold text-center py-2'>Edit Plan</h3>

                <div className="inline-block relative w-full">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Choose your plan
                </label>
                <select onChange={(event) => handleEditPlan(event.target.value)} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    <option>Select the plan here.</option>
                    {
                         planArr.map((plan, index) => {
                            return (
                                <option value={plan[0]} key={index}> {plan[0]}</option>
                                )
                        })
                    }
                    {/* {
                        console.log(editPlan)
                    } */}
                </select>
                <form className="w-full max-w-lg mt-5" onSubmit={handleEditPlanOnSubmit}>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full px-3">
                    <input value={editPlanName} disabled className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Plan Name" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <input value={editT1} onChange={(e) => setEditT1(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder=" T1" />
                    </div>
                    
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <input value={editT2} onChange={(e) => setEditT2(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder=' T2' />
                    </div>
                </div>
                <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 my-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Send
                </button>
                </form>
                
                </div>

            
                
            </div>


        </div>

    );

}


export default PlanContainer;