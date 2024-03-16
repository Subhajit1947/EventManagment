import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Eventcreate = () => {
  // here login user can create a event that take various parameter image,date,time,eventname,location

    const [event_name,setevent_name]=useState()
    const [location,setlocation]=useState()
    const [date,setdate]=useState()
    const [time,settime]=useState()
    const [image,setimage]=useState()
    const [token,settoken]=useState(()=>localStorage.getItem("access_token")?JSON.parse(localStorage.getItem("access_token")):null)
    const navigate=useNavigate()
    // when i click create button handleSubmit function is call
    // and hit a post api and create a event in database 
    //all the data including image file in formdata in the body of post api
    const handleSubmit=(e)=>{
        e.preventDefault()
        const headers={
            Authorization: 'Bearer ' + token 
        }
        console.log(event_name,date,time,location,image)
        const formDataToSend = new FormData();
        formDataToSend.append('event_name',event_name)
        formDataToSend.append('date',date)
        formDataToSend.append('location',location)
        formDataToSend.append('time',time)
        formDataToSend.append('image',image)
        axios.post('http://127.0.0.1:8000/api/event/',formDataToSend,{headers}).then(()=>{
            navigate('/')
        }).catch((err)=>{
            console.log(err.message)
        })
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Your Event</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="event" className="sr-only">Event Name</label>
              <input
                id="event"
               
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="enter event name"
                value={event_name}
                onChange={(e) => setevent_name(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="date" className="sr-only">Location</label>
              <input
                id="date"
                
                type="date"
                
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="enetr date"
                value={date}
                onChange={(e) => setdate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="time" className="sr-only">Location</label>
              <input
                id="time"
                
                type="time"
                
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="enter time"
                value={time}
                onChange={(e) => settime(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="thamnail" className="sr-only">Location</label>
              <input
                id="thamnail"
                
                type="file"
                
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="upload photo"
                
                onChange={(e) => setimage(e.target.files[0])}
              />
            </div>
            <div>
              <label htmlFor="location" className="sr-only">Location</label>
              <input
                id="location"
                
                type="text"
                
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="enter location"
                value={location}
                onChange={(e) => setlocation(e.target.value)}
              />
            </div>
          </div>

          

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Eventcreate