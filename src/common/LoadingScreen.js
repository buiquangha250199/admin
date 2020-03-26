import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = (props) => {
    return (
        <div id="loading-wrapper" className="w-full h-full opacity-75 bg-gray-600 flex items-center justify-center z-50 absolute top-0 left-0">
            <div className="loading"></div>
        </div>
    )
}

export default LoadingScreen;
