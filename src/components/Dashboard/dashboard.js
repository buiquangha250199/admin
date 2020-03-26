import React, {useState, useContext} from 'react';
import ListUser from './list-user';
import ListRecord from './list-record';
import { withRouter } from 'react-router-dom';
import AppContext from '../AppContext';

import './Dashboard.css';
import PlanContainer from './plan-container';


var Dashboard = (props) => {

    // const {setLoading} = useContext(AppContext);

    const [toggle, setToggle] = useState('invisible');
    const [showUserTable, setShowUserTable] = useState('');
    const [showRecordTable, setShowRecordTable] = useState('hidden');
    const [showPlan, setShowPlan] = useState('hidden');

    const showListUser = () => {
        setShowRecordTable('hidden'); 
        setShowPlan('hidden');
        setShowUserTable('');
    }
    const showListRecord = () => {
        //setLoading(true);
        setShowPlan('hidden');
        setShowUserTable('hidden');
        setShowRecordTable(''); 
    }
    const showListPlan = () => {
        setShowRecordTable('hidden');
        setShowUserTable('hidden');
        setShowPlan('');
    }

    if(localStorage.getItem('token') === null) props.history.push('/');

    let handleClick = () => {
        localStorage.removeItem('token');
        console.log(localStorage.getItem('token'));

        window.location.replace('/');
    }

    window.onclick = function(event) {
        if (!event.target.matches('.drop-button') && !event.target.matches('.drop-search')) {
            setToggle('invisible');  
        }
    }


    return (
        <div className="Dashboard bg-gray-900 font-sans leading-normal tracking-normal mt-12">

        <div>
        <nav className="bg-gray-900 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
            <div className="flex flex-wrap items-center">
            <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
                <a href="#">
                <img className="w-1/2 h-12 pl-3" src="http://app.gii.gl/logo.png" alt="" />
                </a>
            </div>
            <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">

            </div>
            <div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
                <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                <li className="flex-1 md:flex-none md:mr-3">
                <div className="relative inline-block">
                    <button className="drop-button text-white focus:outline-none" onClick={() => setToggle('')}> <span className="pr-2"><i className="fas fa-robot text-blue-600"></i></span> Hi, User <svg className="h-3 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg></button>
                    <div id="myDropdown" className={'dropdownlist absolute bg-gray-900 text-white right-0 mt-3 p-3 overflow-auto z-30 ' + toggle}>
                    <a href="#" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i className="fa fa-user fa-fw" /> Profile</a>
                    <a href="#" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i className="fa fa-cog fa-fw" /> Settings</a>
                    <div className="border border-gray-800" />
                    <a href="#" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block" onClick={handleClick}><i className="fas fa-sign-out-alt fa-fw" /> Log Out</a>
                    </div>
                </div>
                </li>

                </ul>
            </div>
            </div>
        </nav>
        <div className="flex flex-col md:flex-row">
            <div className="bg-gray-900 shadow-lg h-16 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48">
            <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
                <ul className="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
                <li className="mr-3 flex-1" onClick={() => showListUser()}>
                    <a href="#user" className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                    <i className="icon ion-ios-person pr-0 md:pr-3" /><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">User</span>
                    </a>
                </li>
                <li className="mr-3 flex-1" onClick={() => showListRecord()}>
                    <a href="#record" className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500">
                    <i className="ion-ios-recording pr-0 md:pr-3" /><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Record</span>
                    </a>
                </li>
                <li className="mr-3 flex-1" onClick={() => showListPlan()}>
                    <a href="#plan" className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-blue-600">
                    <i className="icon ion-ios-paperplane pr-0 md:pr-3" /><span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">Plan</span>
                    </a>
                </li>
                <li className="mr-3 flex-1" >
                    <a href="#request" className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-blue-600">
                    <i class="icon ion-pull-request pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">Request</span>
                    </a>
                </li>
                </ul>
            </div>
            </div>
            <div className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-12">
            <div className='flex flex-row px-5 pt-2 items-center'>
                <i class="icon ion-ios-home-outline text-6xl"></i>
                <div className="p-2">
                    <h3 className="font-bold pl-2 black-title">Dashboard</h3>
                    <p className='pl-2 py-1 text-gray-600 font-bold '>Manage users, records, plans and requests. </p>
                </div>
                
            </div>
            
            <div className="flex flex-wrap mb-12">
                <div className="w-full md:w-1/2 xl:w-1/4 pt-6 px-5">
                
                    <div className="bg-info rounded shadow-lg p-5">
                        <div className="flex flex-row items-center">

                        <i class="icon ion-ios-person text-6xl text-white mr-5 "></i>
                        
                        <div className="flex flex-row flex-1 text-left">
                            
                            <div className='pt-1'>
                                <h5 className="font-bold uppercase text-gray-200 text-xs">Total Users</h5>
                                <h3 className="font-bold text-3xl text-white tx-lato">249</h3>
                            </div>
                            
                        </div>
                        
                        </div>
                    </div>
                
                </div>

                <div className="w-full md:w-1/2 xl:w-1/4 pt-6 px-5">
                
                    <div className="bg-purple rounded shadow-lg p-5">
                        <div className="flex flex-row items-center">
                        
                        <i class="icon ion-ios-recording text-6xl text-white mr-5 "></i>
                        <div className="flex flex-row flex-1 text-left">
                        
                            <div className='pt-1'>
                                <h5 className="font-bold uppercase text-gray-200 text-xs">Total records</h5>
                                <h3 className="font-bold text-3xl text-white tx-lato">1100</h3>
                            </div>
                            
                        </div>
                        
                        </div>
                    </div>
                
                </div>

                <div className="w-full md:w-1/2 xl:w-1/4 pt-6 px-5">
                
                    <div className="bg-teal rounded shadow-lg p-5">
                        <div className="flex flex-row items-center">
                        
                        <i class="icon ion-ios-paperplane text-6xl text-white mr-5 "></i>
                        <div className="flex flex-row flex-1 text-left">
                        
                            <div className='pt-1'>
                                <h5 className="font-bold uppercase text-gray-200 text-xs">Total Plans</h5>
                                <h3 className="font-bold text-3xl text-white tx-lato">3</h3>
                            </div>
                            
                        </div>
                        
                        </div>
                    </div>
                
                </div>

                <div className="w-full md:w-1/2 xl:w-1/4 pt-6 px-5">
                
                    <div className="bg-blue-500 rounded shadow-lg p-5">
                        <div className="flex flex-row items-center">
                        
                        <i class="icon ion-pull-request text-6xl text-white mr-5 "></i>
                        <div className="flex flex-row flex-1 text-left">
                        
                            <div className='pt-1'>
                                <h5 className="font-bold uppercase text-gray-200 text-xs">Total requests</h5>
                                <h3 className="font-bold text-3xl text-white tx-lato">45</h3>
                            </div>
                            
                        </div>
                        
                        </div>
                    </div>
                
                </div>
               
                   
            </div>

            <div className="flex flex-row flex-wrap flex-grow mt-2 justify-center -mx-6">
            <div className='w-full md:w-1/2 xl:w-1/2 px-5 py-2 my-3 bg-white mr-5'></div>
            <div className="w-full md:w-2/5 xl:w-2/5 px-5 py-2 my-3 bg-white">
                <h3 className='mb-4 font-bold text-orange-800 text-xl'>Statistics</h3>
                <div className="shadow w-1/2 bg-white">
                    <div className="bg-blue-500 text-xs leading-none py-1 text-center text-white" style={{width: '45%'}}>45%</div>
                </div>
                <div className="shadow w-1/2 bg-white mt-2">
                    <div className="bg-teal-500 text-xs leading-none py-1 text-center text-white" style={{width: '55%'}}>55%</div>
                </div>
                <div className="shadow w-1/2 bg-white mt-2">
                    <div className="bg-orange-500 text-xs leading-none py-1 text-center text-white" style={{width: '65%'}}>65%</div>
                </div>
                <div className="shadow w-1/2 bg-white mt-2">
                    <div className="bg-red-500 text-xs leading-none py-1 text-center text-white" style={{width: '75%'}}>75%</div>
                </div>
            </div>

            </div>

            <div className="flex flex-row flex-wrap flex-grow mt-2 justify-center">
               
                <div className={"w-full mx-5 mt-3 " + showUserTable}>
                {/*Table Card md:w-1/2 xl:w-1/3 p-3*/}
                    <ListUser />
                {/*/table Card*/}
                </div>
                

                <div className={"w-full mx-5 mt-3 " + showRecordTable}>
                {/*Table Card md:w-/31/2 xl:w-2/3 p-3*/}
                    <ListRecord />
                {/*/table Card*/}
                </div>

                <div className={"w-full mx-5 mt-3 " + showPlan}>
                {/*Table Card md:w-/31/2 xl:w-2/3 p-3*/}
                    <PlanContainer />
                {/*/table Card*/}
                </div>

            </div>
            </div>
        </div>
        </div>

            
            
        </div>
    );
}

export default withRouter(Dashboard);

