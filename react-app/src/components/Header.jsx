import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../main';
import { useState } from 'react';
import axios from 'axios';
import { server } from '../main';
import toast from 'react-hot-toast';

const Header = () => {

  const {isAuthenticated,setIsAuthenticated,loading,setLoading} =useContext(Context);
  const logoutHandler=async ()=>{
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`,{
        withCredentials: true,
      });
      toast.success("Logged out successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } 
    catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  }
  //  if(isAuthenticated) return <Navigate to={"/"}/>

  return (
   <nav className="header">
    <div>
      <h2>Todo App.</h2>
    </div>
    <article>
      <Link to={"/"} >Home</Link>
      <Link to={"/profile"} >Profile</Link>
      {
        isAuthenticated? (<button disabled={loading} onClick={logoutHandler} className='btn'>Logout</button>)
        :
        (<Link to={"/login"} >Login</Link>)
      }
      {/* <Link to={"/login"} >Login</Link>
      <button className='btn'>Logout</button> */}
   
    </article>
   </nav>
  )
}

export default Header;