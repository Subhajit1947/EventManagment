import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {logoutr} from '../feature/authSlice'


export default function Navbar() {
  // useSelector is for ftech the current state of the redux store
  const is_login=useSelector((state)=>state.islogin)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  // for logout delete the access and refresh token and islogin is set false uing 
  // dispatch(logoutr()) function and finally navigate to home page 
  const logoutfn=()=>{
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    dispatch(logoutr())
    navigate('/')
  }
  
  return (
    <div className='sticky top-0 h-16 w-full bg-black grid grid-cols-2'>
      <div className='h-full text-white flex  items-center grid grid-cols-4 '>
        <NavLink to='/' className={({isActive})=>{return isActive?'text-center text-blue-600':'text-white text-center'}} ><p className="text-lg font-medium">Home</p></NavLink>
        {is_login?
         <>
        <NavLink className={({isActive})=>{return isActive?'text-center text-blue-600':'text-white text-center'}} to='/like'><p className="text-lg font-medium">Likes Event</p></NavLink>
        <NavLink className={({isActive})=>{return isActive?'text-center text-blue-600':'text-white text-center'}} to='/myevent'><p className="text-lg font-medium">My Event</p> </NavLink>
        <NavLink className={({isActive})=>{return isActive?'text-center text-blue-600':'text-white text-center'}} to='/createvent'> <p className="text-lg font-medium">Create Event</p></NavLink>
        
        </> :<>
        <Link></Link>
        <Link></Link>
        <Link></Link></>}
        
      </div>
      <div className='h-full text-white flex items-center grid grid-cols-4 '>
        {is_login?
          <>
        <NavLink></NavLink>
        
        
        <NavLink className={({isActive})=>{return isActive?'text-center text-blue-600':'text-white text-center'}} to=''></NavLink>
        
        <NavLink className={({isActive})=>{return isActive?'text-center text-blue-600':'text-white text-center'}} to=''>
            <div className='h-5/6  w-full  flex  items-center'>
              <img className='h-full w-12 rounded-full' src={`https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=`}/>
            </div>
        </NavLink>
        <NavLink onClick={logoutfn}><p className="text-lg font-medium">Logout</p></NavLink>
        </>:<>
        <Link></Link>
        
        
        <NavLink></NavLink>
        <NavLink className={({isActive})=>{return isActive?'text-center text-blue-600':'text-white text-center'}} to='/signup' ><p className="text-lg font-medium">Rgister</p></NavLink>
        <NavLink className={({isActive})=>{return isActive?'text-center text-blue-600':'text-white text-center'}} to='/login'><p className="text-lg font-medium">Login</p></NavLink>
        </>}
      </div>

    </div>
  )
}
