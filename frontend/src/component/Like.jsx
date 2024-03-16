import React,{useState,useEffect} from 'react'
import axios from 'axios'

// this is the red heard image and white heart image
const redheart='data:image/png;base64,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'
const whiteh='data:image/png;base64,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'

const Like = () => {
    // here i hit api for fetch current user like event
    // two api callone for fetch the event current user likechange
    // another for unlike the event 

    const [data,setdata]=useState([])
    const [likechange,setlikechange]=useState(true)
    const [token,settoken]=useState(()=>localStorage.getItem("access_token")?JSON.parse(localStorage.getItem("access_token")):null)       
    useEffect(()=>{
        const headers={
            Authorization: 'Bearer ' + token 
        }
        axios.get('http://127.0.0.1:8000/api/event/like/',{headers}).then((res)=>{
            console.log(data)
            setdata(res.data)
        })
    },[likechange])
    const clicklike=(eid)=>{
        const headers={
            Authorization: 'Bearer ' + token 
        }
        axios.post(`http://127.0.0.1:8000/api/event/like/${eid}/`,{},{headers}).then(()=>{
            setlikechange(!likechange)
        })
    }

  return (
    <div className='m-4 w-screen flex flex-col items-center'>
        <div className="mb-2 ">
            <h1 className="text-5xl font-bold mb-2">Likes</h1>
        </div>
        {data.length==0?<h1 className="text-3xl font-bold mt-16">please like some event😒😒</h1>:
        <div className='mt-4 w-4/5 h-60 '>
            {data?.map((obj)=>(
            <div className="bg-gray-100 shadow-md rounded-lg overflow-hidden m-4 w-full h-full">
                <div className="grid grid-cols-4 gap-4 h-full py-6 relative">
                    <div>
                        <img className='h-4/5 mt-1' src={`http://127.0.0.1:8000${obj.image}`}/>
                    </div>
                    <div className='px-6 '>
                        <div className="text-xl font-bold">{obj.event_name}</div>
                        <div className="text-gray-600">{obj.date}</div>
                        <div className="text-gray-600">{obj.location}</div>
                        <div className="text-gray-600 text-sm">Starts at {obj.time}</div>
                    </div>
                    <div></div>
                    <div></div>
                    <img onClick={()=>clicklike(obj.id)} className='h-10 w-10 rounded-full cursor-pointer absolute bottom-2 right-2' src={`${redheart}`}/>
                </div>
            </div>
            ))}
           
        </div>}
    </div>
  )
}

export default Like