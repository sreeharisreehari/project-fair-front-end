
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

import Project from './pages/Project';

import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Auth from './components/Auth';
import { useContext } from 'react';
import { isauthtokencontext } from './context/Contextshare';

function App() {
  const {isauthtoken,setisauthtoken}=useContext(isauthtokencontext)

  
  return (
   
 <div>
  
  <Routes>
    <Route path='/' element={<Home/>}></Route>
   
    <Route path='/project' element={<Project/>}></Route>
    <Route path='/login' element={<Auth/>}></Route>
    <Route path='/register' element={<Auth register/>}></Route>
   
    
    <Route path='/dashboard' element={isauthtoken? <Dashboard dashboard/>:<Home/>}></Route></Routes>
    <Footer/>
 
 
  
 

 </div>
  );
}

export default App;
