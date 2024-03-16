
import {Route, RouterProvider,createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import Login from './component/Login'
import Layout from './component/Layout'
import Home from './component/Home'
import Register from './component/Register'
import { loginfn,logoutr } from './feature/authSlice'
import Like from './component/Like'
import Eventcreate from './component/Eventcreate'
import Myevent from './component/Myevent'

function App() {
  // in this app authentication is based on jwt authentication
  // when i login i have a access and refresh token in backend i set access token expiry time is 5minute
  // for that after 5 minute user is automatically logout
  // for continue login i hit another api take take refresh token and give access and refresh token
  // it also store in local storage and islogin is set to true
  // using dispatch(loginfn)
  const dispatch=useDispatch()
  const [refresh_token,setrefresh_token]=useState(()=>localStorage.getItem("refresh_token")?JSON.parse(localStorage.getItem("refresh_token")):null)
  const [loding,setloading]=useState(true)
  const updateToken=async()=>{
    if(refresh_token){ 
        
      try {
        const res=await axios.post('http://127.0.0.1:8000/api/login/refresh/',{refresh:refresh_token})
        if(res.status==200){  
          setrefresh_token(res.data.refresh)
          localStorage.setItem('access_token',JSON.stringify(res.data.access))
          localStorage.setItem('refresh_token',JSON.stringify(res.data.refresh))
          dispatch(loginfn())
          if(loding){
            setloading(false)
          }
        }
        else{
          localStorage.removeItem("access_token")
          localStorage.removeItem("refresh_token")
          dispatch(logoutr())
          
        }
      } catch (error) {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        dispatch(logoutr())
      }
  }
  }
  useEffect(()=>{
    if(loding){
      updateToken()
    }
    
    let interval=setInterval(() => {
      updateToken()
    },1000*4*60);

    return ()=>clearInterval(interval)
  },[refresh_token,loding])

//all the routes 
  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route path="" element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Register/>}/>
        <Route path="like" element={<Like/>}/>
        <Route path="createvent" element={<Eventcreate/>}/>
        <Route path="myevent" element={<Myevent/>}/>

      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router}/>
      
    </>
  )
}

export default App
