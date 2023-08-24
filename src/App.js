
import React ,{ useEffect, useReducer, useState } from 'react';
import './App.css';
import axios from './axios';
import {  Route , Routes } from 'react-router-dom';
import HomePage from './routes/HomePage';
import Single_product from './routes/Single_product';
import Navbar from './components/Navbar';







function App() {

  
  const [isLoading , set_isLoading] = useState(true)

  setTimeout(()=>{
    set_isLoading(false)
  },2000)


  return (
    <React.Fragment>
    
      {/* <Router> */}
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path={`/products/:id`} element={<Single_product/>}/>
          
        </Routes>
      {/* </Router> */}
      {/* <HomePage/> */}
        
    </React.Fragment>
  );
}

export default App;
