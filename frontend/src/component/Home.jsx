import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Events from './Events'
import { useSelector } from 'react-redux'
const Home = () => {
    const [edata,setedata]=useState()
    const [loading,setloading]=useState(true)
    const is_login=useSelector((state)=>state.islogin)
    const [changelike,setchangelike]=useState(false)
    const [token,settoken]=useState(()=>localStorage.getItem("access_token")?JSON.parse(localStorage.getItem("access_token")):null)
    
    useEffect(()=>{
      // if a user is login then i send event that contain likebyuser that is true or false
      // else i send only event data and likebyuser is false 
      // when a user logout and click a like buton ten he navigate to login page
      // if login and click the like button then like button is red and also it add in db
      // here changelike variable is change a when a like button click
      // and it hit api that implemeted in Events.jsx
      // and this useeffect is re run
      
      if(is_login==true){
        const headers={
          Authorization: 'Bearer ' + token 
        }
        axios.get('http://127.0.0.1:8000/api/event/',{headers}).then((res)=>{
          setedata(res.data)
        })
      }
      else{
        axios.get('http://127.0.0.1:8000/api/event/allevent/').then((res)=>{
          setedata(res.data)
        })
      }
      setloading(false)
    },[is_login,loading,changelike])
  return (
    <div className=''>
      {/* <div className='w-full text-blue-500 text-3xl text-center'> Our Current Event</div> */}
      <div className='mt-12 flex flex-wrap justify-around'>
        {edata?.map((obj)=>(
          <Events key={obj.id} changelike={changelike} setchangelike={setchangelike} obj={obj}/>  
        ))}
          
            
      </div>
    </div>
  )
}

export default Home