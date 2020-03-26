import React, {useState} from 'react';
import AppContext from './AppContext';
import {renderRoutes} from 'react-router-config';
import LoadingScreen from '../common/LoadingScreen';
import './App.css';


const App = ({route}) => {

  const TOKEN = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider value={{loading, setLoading}}>
      <div className="App">
        {renderRoutes(route.routes)}
      </div>
      {loading && <LoadingScreen/>}
    </AppContext.Provider> 
    
  );
}

export default App;
