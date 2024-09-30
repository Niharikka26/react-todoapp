import React from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Context } from '../main';
import { useContext,useState } from 'react';import axios from 'axios';
import { server } from '../main';
import toast from 'react-hot-toast';


const Login = () => {

  const[email, setEmail]=useState("");
  const[password, setPassword]=useState("");
  const {isAuthenticated, setIsAuthenticated,loading,setLoading} =useContext(Context);
  if(isAuthenticated) return <Navigate to={"/"}/>

  const submitHandler=async (e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const {data}= await axios.post(`${server}/users/login`,{email,password},{
        headers:{
         "Content-type":"application/json"
        },
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } 
    catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }

  return (
    <div className="login">
    <section>
      <form onSubmit={submitHandler}>
      <input
          type="email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
          required
          placeholder="Password"
        />
        <button disabled={loading} type="submit">
          Login
        </button>
        <h4>Or</h4>
        <Link to="/register">Sign Up</Link>
      </form>
    </section>
  </div>
  )
}

export default Login;